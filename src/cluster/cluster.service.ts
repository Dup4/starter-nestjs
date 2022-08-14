import os from "os";
import cluster from "cluster";

import { Injectable, Inject, forwardRef } from "@nestjs/common";

import { ConfigService } from "@/config/config.service";

interface IpcMessage {
  channel: string;
  data: unknown;
}

@Injectable()
export class ClusterService {
  readonly enabled: boolean;
  readonly isPrimary: boolean;
  readonly isWorker: boolean;

  private readonly messageListeners = new Map<
    string,
    Array<(data: unknown) => void>
  >();

  constructor(
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
  ) {
    this.enabled = this.configService.config.server.clusters != null;
    this.isPrimary = cluster.isPrimary;
    this.isWorker = cluster.isWorker || !this.enabled;
  }

  async initialization(workerCallback: () => Promise<void>) {
    if (this.isWorker) {
      await workerCallback();
      return;
    }

    // Primary -- create workers
    const count = this.configService.config.server.clusters || os.cpus().length;
    for (let i = 0; i < count; i++) {
      cluster.fork();
    }

    cluster.on("message", (worker, message: IpcMessage) =>
      this.callMessageListeners(message),
    );
  }

  private callMessageListeners(message: IpcMessage) {
    (this.messageListeners.get(message.channel) || []).forEach((callback) =>
      callback(message.data),
    );
  }

  /**
   * If cluster is not enabled, the channel's callback will be called directly.
   */
  postMessageToPrimary<T>(channel: string, data: T) {
    const message = {
      channel,
      data,
    };

    if (this.isPrimary) {
      this.callMessageListeners(message);
    } else {
      process.send?.(message);
    }
  }

  onMessageFromWorker<T>(channel: string, callback: (data: T) => void) {
    if (!this.messageListeners.has(channel)) {
      this.messageListeners.set(channel, []);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.messageListeners.get(channel)?.push(callback as any);
  }
}

import { Injectable } from "@nestjs/common";
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import { RedisService } from "./redis.service";

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = await this.redisService.ping();
    const result = super.getStatus(key, isHealthy, {
      message: "redis is healthy",
    });

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError("redis check failed", result);
  }
}

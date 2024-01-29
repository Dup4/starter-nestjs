import process from "node:process";

import { Module } from "@nestjs/common";
import { DevtoolsModule } from "@nestjs/devtools-integration";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ClusterModule } from "@/cluster/cluster.module";
import { ConfigModule } from "@/config/config.module";
import { HealthModule } from "@/health/health.module";

@Module({
  imports: [
    ConfigModule,
    ClusterModule,
    HealthModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
      port: 3013,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { RedisModule } from "@/redis/redis.module";

import { HealthController } from "./health.controller";

@Module({
  imports: [RedisModule, TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}

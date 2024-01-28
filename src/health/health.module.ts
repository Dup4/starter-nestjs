import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { HealthController } from "./health.controller";
import { RedisModule } from "@/redis/redis.module";

@Module({
  imports: [RedisModule, TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}

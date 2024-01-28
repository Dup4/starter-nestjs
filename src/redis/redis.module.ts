import { Module } from "@nestjs/common";

import { RedisService } from "./redis.service";
import { RedisHealthIndicator } from "./redis.health";
import { LockService } from "./lock.service";
import { ConfigModule } from "@/config/config.module";

@Module({
  imports: [ConfigModule],
  providers: [RedisService, LockService, RedisHealthIndicator],
  exports: [RedisService, LockService, RedisHealthIndicator],
})
export class RedisModule {}

import { Controller, Get } from "@nestjs/common";

import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { ApiTags } from "@nestjs/swagger";

import { RedisHealthIndicator } from "@/redis/redis.health";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private redisHealthIndicator: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.redisHealthIndicator.isHealthy("redis"),
    ]);
  }
}

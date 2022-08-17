import { Test, TestingModule } from "@nestjs/testing";
import { describe, beforeAll, expect, it } from "vitest";

import { ConfigService } from "@/config/config.service";

import { RedisService } from "./redis.service";

describe("RedisService", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [RedisService, ConfigService],
    }).compile();
  });

  describe("cache", () => {
    it('should return "Hello World!"', async () => {
      const key = "B676ADC1-3B1B-498B-99F8-FA4E72C7C99A";
      const value = "test";
      const redisService = app.get<RedisService>(RedisService);

      redisService.cacheSet(key, value);
      expect(await redisService.cacheGet(key)).toBe(value);
      redisService.cacheDelete(key);
    });
  });
});

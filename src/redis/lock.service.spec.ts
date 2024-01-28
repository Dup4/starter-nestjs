import { Test, TestingModule } from "@nestjs/testing";
import { beforeAll, describe, expect, it } from "vitest";

import { v4 as uuid } from "uuid";

import { RedisService } from "./redis.service";
import { LockService } from "./lock.service";
import { ConfigService } from "@/config/config.service";

describe("lockService", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [RedisService, ConfigService, LockService],
    }).compile();
  });

  describe("lock", () => {
    it("lock successful", async () => {
      const lockService = app.get<LockService>(LockService);
      const key = uuid();
      let value = "test";

      await lockService.lock(key, async () => {
        value = "test2";
      });

      expect(value).toBe("test2");
    });
  });
});

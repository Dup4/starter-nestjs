import { Test, TestingModule } from "@nestjs/testing";
import { beforeAll, describe, expect, it } from "vitest";

import { HealthController } from "./health.controller";
import { HealthModule } from "./health.module";

describe("healthController", () => {
  let controller: HealthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  describe("defined", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe("health check", () => {
    it("should be", async () => {
      expect(await controller.check()).toMatchInlineSnapshot(`
        {
          "details": {
            "redis": {
              "message": "redis is healthy",
              "status": "up",
            },
          },
          "error": {},
          "info": {
            "redis": {
              "message": "redis is healthy",
              "status": "up",
            },
          },
          "status": "ok",
        }
      `);
    });
  });
});

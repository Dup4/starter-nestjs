import { Test, TestingModule } from "@nestjs/testing";
import { beforeAll, describe, expect, it } from "vitest";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("appController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe("getHello", () => {
    it("should return \"Hello World!\"", () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});

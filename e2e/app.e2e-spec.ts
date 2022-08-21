import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "@/app/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/app/hello (GET)", () => {
    return request(app.getHttpServer())
      .get("/app/hello")
      .expect(200)
      .expect("Hello World!");
  });

  it("/app/version (GET)", () => {
    return request(app.getHttpServer()).get("/app/version").expect(200);
  });
});

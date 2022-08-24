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

  afterAll(async () => {
    await app.close();
  });

  it("/app/hello (GET)", async () => {
    return await request(app.getHttpServer())
      .get("/app/hello")
      .expect(200)
      .expect("Hello World!");
  });

  it("/app/version (GET)", async () => {
    return await request(app.getHttpServer()).get("/app/version").expect(200);
  });

  it("/app/health (GET)", async () => {
    return await request(app.getHttpServer()).get("/health").expect(200);
  });
});

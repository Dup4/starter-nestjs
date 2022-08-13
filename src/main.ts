import path from "path";

import { NestFactory } from "@nestjs/core";
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";

import { AppModule } from "./app.module";
import packageInfo from "../package.json";

const GlobalPrefix = "api";

async function initSwaggerDocument(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle(packageInfo.name)
    .setDescription(packageInfo.description)
    .setVersion(packageInfo.version)
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(path.join(GlobalPrefix, "docs"), app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwaggerDocument(app);
  await app.listen(3000);

  Logger.log(`${packageInfo.name} is listening on 3000`, "Bootstrap");
}

bootstrap().catch((err) => {
  console.error(err); // eslint-disable-line no-console
  console.error("Error bootstrapping the application, exiting..."); // eslint-disable-line no-console
  process.exit(1);
});

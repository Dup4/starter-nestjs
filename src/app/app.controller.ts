import {
  Controller,
  Get,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { GetVersionResponseDto } from "./dto/get-version-response.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @ApiTags("App")
  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("version")
  getVersion(): GetVersionResponseDto {
    return {
      version: this.appService.getVersion(),
      gitRepoVersion: this.appService.getGitRepoVersion(),
    };
  }
}

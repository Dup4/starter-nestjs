import { Injectable } from "@nestjs/common";

import getGitRepoInfo from "git-repo-info";

import packageInfo from "../package.json";

@Injectable()
export class AppService {
  appGitRepoInfo = getGitRepoInfo();

  getHello(): string {
    return "Hello World!";
  }

  getVersion(): string {
    return packageInfo.version;
  }

  getGitRepoVersion(): string {
    return this.appGitRepoInfo.abbreviatedSha;
  }
}

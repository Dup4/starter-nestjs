import { Module } from "@nestjs/common";

import { ConfigModule } from "./../config/config.module";

import { ClusterService } from "./cluster.service";

@Module({
  imports: [ConfigModule],
  providers: [ClusterService],
  exports: [ClusterService],
})
export class ClusterModule {}

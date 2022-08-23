import { Module } from "@nestjs/common";

import { ClusterModule } from "@/cluster/cluster.module";
import { ConfigModule } from "@/config/config.module";
import { HealthModule } from "@/health/health.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule, ClusterModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

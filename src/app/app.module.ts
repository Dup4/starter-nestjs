import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ClusterModule } from "@/cluster/cluster.module";
import { ConfigModule } from "@/config/config.module";
import { HealthModule } from "@/health/health.module";

@Module({
  imports: [ConfigModule, ClusterModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

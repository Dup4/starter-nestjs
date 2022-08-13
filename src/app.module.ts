import { Module } from "@nestjs/common";

import { ClusterModule } from "./cluster/cluster.module";
import { ConfigModule } from "./config/config.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule, ClusterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

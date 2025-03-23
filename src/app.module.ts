import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./infraestructure/modules/auth.module";
import {ConfigModule} from "@nestjs/config";
import {MunicipalityModule} from "@/infraestructure/modules/municipality.module";

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), MunicipalityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

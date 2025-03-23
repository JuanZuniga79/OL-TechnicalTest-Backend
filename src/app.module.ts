import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilenameModule } from './public/infraestructure/adapters/input/filename/filename.module';
import {AuthModule} from "./infraestructure/modules/auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [FilenameModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

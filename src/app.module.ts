import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./infraestructure/modules/auth.module";
import {ConfigModule} from "@nestjs/config";
import {MunicipalityModule} from "@/infraestructure/modules/municipality.module";
import {MerchantsModule} from "@/infraestructure/modules/merchants.module";
import {Module} from "@nestjs/common";

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), MunicipalityModule, MerchantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}

import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@/infraestructure/guards/auth.guard";
import {ApiSecurity} from "@nestjs/swagger";
import EncryptUtils from "@/infraestructure/utils/encrypt.utils";

@ApiSecurity('bearer')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHello(@Request() req): Promise<string> {
    return `hola`;
  }
}

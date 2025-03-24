import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "./infraestructure/guards/auth.guard";
import {ApiSecurity} from "@nestjs/swagger";

@ApiSecurity('bearer')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHello(): Promise<string> {
    return `hola`;
  }
}

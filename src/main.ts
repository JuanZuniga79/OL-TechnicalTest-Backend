import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"
import {HttpException, ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./infraestructure/config/error.filter";
import {ResponseMiddleware} from "./infraestructure/config/response.middleware"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('OL Technical Test Backend')
      .setDescription('the test api description')
      .setVersion('0.0.1')
      .addTag('API Documentation')
      .addBearerAuth()
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: false,
    transform: true,
  }));

  app.enableCors({
    origin: (origin: string, callback: Function) => {
      if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        throw new HttpException("Not allowed by CORS", 401);
      }
    },
  })

  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(new ResponseMiddleware().use)

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap().catch((error) => console.error(error));

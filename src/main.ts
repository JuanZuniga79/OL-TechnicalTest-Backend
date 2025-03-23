import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"
import {HttpException} from "@nestjs/common";

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

  app.enableCors({
    origin: (origin: string, callback: Function) => {
      if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
        callback(null, true);
      } else {
        throw new HttpException("Not allowed by CORS", 401);
      }
    },
  })

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap().catch((error) => console.error(error));

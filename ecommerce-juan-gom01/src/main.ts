import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middlewares/global/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  

  
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Trabajo_m4")
  .setDescription("documentación del proyecto de e commerce del proyecto del modulo 4 construida con nestJS, TypeORM, Express y PostgreSQL")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document)



  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(3000);
}
bootstrap();

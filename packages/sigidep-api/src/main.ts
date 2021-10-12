import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('SIGIDEP API')
      .setDescription('SIGIDEP APIs description')
      .setVersion('1.0')
      .addBearerAuth()
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();

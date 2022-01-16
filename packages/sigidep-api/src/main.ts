import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http-exceptions-filters';
import { QueryExceptionsFilters } from './exceptions/query-exceptions-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new QueryExceptionsFilters());

  if (process.env.ENABLE_SWAGGER === 'true') {
    console.log('Swagger API enabled');
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
    SwaggerModule.setup(process.env.SWAGGER_URL ?? 'docs', app, document);
  }

  await app.listen(process.env.PORT ?? process.env.API_PORT ?? 3000, '0.0.0.0');
}
bootstrap();

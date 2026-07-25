import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Billing Service API')
    .setDescription('Orçamento e Pagamento - FiapMecanica')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('budgets', 'Gerenciamento de orçamentos')
    .addTag('payments', 'Gerenciamento de pagamentos')
    .addTag('health', 'Health check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(
    `Billing Service running on: http://localhost:${port}/${apiPrefix}`,
  );
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();

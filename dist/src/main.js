"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const apiPrefix = process.env.API_PREFIX || 'api/v1';
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Billing Service API')
        .setDescription('Orçamento e Pagamento - FiapMecanica')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('budgets', 'Gerenciamento de orçamentos')
        .addTag('payments', 'Gerenciamento de pagamentos')
        .addTag('health', 'Health check')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Billing Service running on: http://localhost:${port}/${apiPrefix}`);
    console.log(`Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map
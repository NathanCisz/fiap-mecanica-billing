"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const prisma_service_1 = require("../infrastructure/database/prisma.service");
const budget_repository_1 = require("../infrastructure/repositories/budget.repository");
const payment_repository_1 = require("../infrastructure/repositories/payment.repository");
const rabbitmq_service_1 = require("../infrastructure/messaging/rabbitmq.service");
const billing_log_schema_1 = require("../infrastructure/mongodb/billing-log.schema");
const create_budget_use_case_1 = require("../application/use-cases/budget/create-budget.use-case");
const approve_budget_use_case_1 = require("../application/use-cases/budget/approve-budget.use-case");
const create_payment_use_case_1 = require("../application/use-cases/payment/create-payment.use-case");
const budget_controller_1 = require("../presentation/controllers/budget.controller");
const payment_controller_1 = require("../presentation/controllers/payment.controller");
const health_controller_1 = require("../presentation/controllers/health.controller");
const budget_repository_port_1 = require("../application/ports/budget.repository.port");
const payment_repository_port_1 = require("../application/ports/payment.repository.port");
const messaging_port_1 = require("../application/ports/messaging.port");
let BillingModule = class BillingModule {
};
exports.BillingModule = BillingModule;
exports.BillingModule = BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: billing_log_schema_1.BillingLog.name, schema: billing_log_schema_1.BillingLogSchema },
            ]),
        ],
        controllers: [budget_controller_1.BudgetController, payment_controller_1.PaymentController, health_controller_1.HealthController],
        providers: [
            prisma_service_1.PrismaService,
            rabbitmq_service_1.RabbitMQService,
            { provide: budget_repository_port_1.BUDGET_REPOSITORY, useClass: budget_repository_1.BudgetRepository },
            { provide: payment_repository_port_1.PAYMENT_REPOSITORY, useClass: payment_repository_1.PaymentRepository },
            { provide: messaging_port_1.MESSAGING_PORT, useClass: rabbitmq_service_1.RabbitMQService },
            create_budget_use_case_1.CreateBudgetUseCase,
            approve_budget_use_case_1.ApproveBudgetUseCase,
            create_payment_use_case_1.CreatePaymentUseCase,
        ],
    })
], BillingModule);
//# sourceMappingURL=billing.module.js.map
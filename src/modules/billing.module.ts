import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { BudgetRepository } from '../infrastructure/repositories/budget.repository';
import { PaymentRepository } from '../infrastructure/repositories/payment.repository';
import { RabbitMQService } from '../infrastructure/messaging/rabbitmq.service';
import { MercadoPagoService } from '../infrastructure/mercadopago/mercadopago.service';
import {
  BillingLog,
  BillingLogSchema,
} from '../infrastructure/mongodb/billing-log.schema';
import { CreateBudgetUseCase } from '../application/use-cases/budget/create-budget.use-case';
import { ApproveBudgetUseCase } from '../application/use-cases/budget/approve-budget.use-case';
import { CreatePaymentUseCase } from '../application/use-cases/payment/create-payment.use-case';
import { BudgetController } from '../presentation/controllers/budget.controller';
import { PaymentController } from '../presentation/controllers/payment.controller';
import { HealthController } from '../presentation/controllers/health.controller';
import { BUDGET_REPOSITORY } from '../application/ports/budget.repository.port';
import { PAYMENT_REPOSITORY } from '../application/ports/payment.repository.port';
import { MESSAGING_PORT } from '../application/ports/messaging.port';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BillingLog.name, schema: BillingLogSchema },
    ]),
  ],
  controllers: [BudgetController, PaymentController, HealthController],
  providers: [
    PrismaService,
    RabbitMQService,
    MercadoPagoService,
    { provide: BUDGET_REPOSITORY, useClass: BudgetRepository },
    { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
    { provide: MESSAGING_PORT, useClass: RabbitMQService },
    CreateBudgetUseCase,
    ApproveBudgetUseCase,
    CreatePaymentUseCase,
  ],
})
export class BillingModule {}

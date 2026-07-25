import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Payment,
  PaymentStatus,
} from '../../../domain/entities/payment.entity';
import {
  type IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../ports/payment.repository.port';
import {
  type IBudgetRepository,
  BUDGET_REPOSITORY,
} from '../../ports/budget.repository.port';
import {
  type IMessagingPort,
  MESSAGING_PORT,
} from '../../ports/messaging.port';
import { v4 as uuidv4 } from 'uuid';

export interface CreatePaymentInput {
  budgetId: string;
  paymentMethod: string;
}

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
    @Inject(MESSAGING_PORT)
    private readonly messaging: IMessagingPort,
  ) {}

  async execute(input: CreatePaymentInput): Promise<Payment> {
    const budget = await this.budgetRepository.findById(input.budgetId);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    if (budget.status !== 'APPROVED') {
      throw new Error('Budget must be approved before payment');
    }

    const payment = new Payment({
      id: uuidv4(),
      budgetId: input.budgetId,
      amount: budget.totalAmount,
      status: PaymentStatus.PENDING,
      paymentMethod: input.paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const saved = await this.paymentRepository.create(payment);

    await this.messaging.publish('billing', 'payment.created', {
      paymentId: saved.id,
      budgetId: saved.budgetId,
      amount: saved.amount,
    });

    return saved;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  Budget,
  BudgetItem,
  BudgetStatus,
} from '../../../domain/entities/budget.entity';
import {
  type IBudgetRepository,
  BUDGET_REPOSITORY,
} from '../../ports/budget.repository.port';
import {
  type IMessagingPort,
  MESSAGING_PORT,
} from '../../ports/messaging.port';
import { v4 as uuidv4 } from 'uuid';

export interface CreateBudgetInput {
  serviceOrderId: string;
  items: BudgetItem[];
}

@Injectable()
export class CreateBudgetUseCase {
  constructor(
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
    @Inject(MESSAGING_PORT)
    private readonly messaging: IMessagingPort,
  ) {}

  async execute(input: CreateBudgetInput): Promise<Budget> {
    const existing = await this.budgetRepository.findByServiceOrderId(
      input.serviceOrderId,
    );
    if (existing) {
      throw new Error('Budget already exists for this service order');
    }

    const totalAmount = input.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    const budget = new Budget({
      id: uuidv4(),
      serviceOrderId: input.serviceOrderId,
      items: input.items,
      totalAmount,
      status: BudgetStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const saved = await this.budgetRepository.create(budget);

    await this.messaging.publish('billing', 'budget.created', {
      budgetId: saved.id,
      serviceOrderId: saved.serviceOrderId,
      totalAmount: saved.totalAmount,
    });

    return saved;
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Budget } from '../../../domain/entities/budget.entity';
import {
  type IBudgetRepository,
  BUDGET_REPOSITORY,
} from '../../ports/budget.repository.port';
import {
  type IMessagingPort,
  MESSAGING_PORT,
} from '../../ports/messaging.port';

@Injectable()
export class ApproveBudgetUseCase {
  constructor(
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
    @Inject(MESSAGING_PORT)
    private readonly messaging: IMessagingPort,
  ) {}

  async execute(id: string, approved: boolean): Promise<Budget> {
    const budget = await this.budgetRepository.findById(id);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    if (approved) {
      budget.approve();
    } else {
      budget.reject();
    }

    budget.updatedAt = new Date();
    const updated = await this.budgetRepository.update(budget);

    await this.messaging.publish(
      'billing',
      approved ? 'budget.approved' : 'budget.rejected',
      {
        budgetId: updated.id,
        serviceOrderId: updated.serviceOrderId,
        status: updated.status,
      },
    );

    return updated;
  }
}

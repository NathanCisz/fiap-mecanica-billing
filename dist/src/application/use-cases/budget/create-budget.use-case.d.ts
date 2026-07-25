import { Budget, BudgetItem } from '../../../domain/entities/budget.entity';
import { type IBudgetRepository } from '../../ports/budget.repository.port';
import { type IMessagingPort } from '../../ports/messaging.port';
export interface CreateBudgetInput {
    serviceOrderId: string;
    items: BudgetItem[];
}
export declare class CreateBudgetUseCase {
    private readonly budgetRepository;
    private readonly messaging;
    constructor(budgetRepository: IBudgetRepository, messaging: IMessagingPort);
    execute(input: CreateBudgetInput): Promise<Budget>;
}

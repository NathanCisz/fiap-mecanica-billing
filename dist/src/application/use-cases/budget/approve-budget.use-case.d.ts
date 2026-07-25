import { Budget } from '../../../domain/entities/budget.entity';
import { type IBudgetRepository } from '../../ports/budget.repository.port';
import { type IMessagingPort } from '../../ports/messaging.port';
export declare class ApproveBudgetUseCase {
    private readonly budgetRepository;
    private readonly messaging;
    constructor(budgetRepository: IBudgetRepository, messaging: IMessagingPort);
    execute(id: string, approved: boolean): Promise<Budget>;
}

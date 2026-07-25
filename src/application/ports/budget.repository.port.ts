import { Budget } from '../../domain/entities/budget.entity';

export interface IBudgetRepository {
  create(budget: Budget): Promise<Budget>;
  findById(id: string): Promise<Budget | null>;
  findByServiceOrderId(serviceOrderId: string): Promise<Budget | null>;
  update(budget: Budget): Promise<Budget>;
  findAll(): Promise<Budget[]>;
}

export const BUDGET_REPOSITORY = 'BUDGET_REPOSITORY';

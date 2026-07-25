import { CreateBudgetUseCase } from '../../application/use-cases/budget/create-budget.use-case';
import { ApproveBudgetUseCase } from '../../application/use-cases/budget/approve-budget.use-case';
import { CreateBudgetDto } from '../dtos/budget/create-budget.dto';
import { ApproveBudgetDto } from '../dtos/budget/approve-budget.dto';
import { type IBudgetRepository } from '../../application/ports/budget.repository.port';
export declare class BudgetController {
    private readonly createBudgetUseCase;
    private readonly approveBudgetUseCase;
    private readonly budgetRepository;
    constructor(createBudgetUseCase: CreateBudgetUseCase, approveBudgetUseCase: ApproveBudgetUseCase, budgetRepository: IBudgetRepository);
    create(dto: CreateBudgetDto): Promise<{
        id: string;
        serviceOrderId: string;
        items: import("../../domain/entities/budget.entity").BudgetItem[];
        totalAmount: number;
        status: import("../../domain/entities/budget.entity").BudgetStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        serviceOrderId: string;
        items: import("../../domain/entities/budget.entity").BudgetItem[];
        totalAmount: number;
        status: import("../../domain/entities/budget.entity").BudgetStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        serviceOrderId: string;
        items: import("../../domain/entities/budget.entity").BudgetItem[];
        totalAmount: number;
        status: import("../../domain/entities/budget.entity").BudgetStatus;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    approve(id: string, dto: ApproveBudgetDto): Promise<{
        id: string;
        serviceOrderId: string;
        items: import("../../domain/entities/budget.entity").BudgetItem[];
        totalAmount: number;
        status: import("../../domain/entities/budget.entity").BudgetStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

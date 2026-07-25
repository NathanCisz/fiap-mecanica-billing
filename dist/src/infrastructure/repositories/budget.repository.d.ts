import { PrismaService } from '../database/prisma.service';
import { IBudgetRepository } from '../../application/ports/budget.repository.port';
import { Budget } from '../../domain/entities/budget.entity';
export declare class BudgetRepository implements IBudgetRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toDomain;
    create(budget: Budget): Promise<Budget>;
    findById(id: string): Promise<Budget | null>;
    findByServiceOrderId(serviceOrderId: string): Promise<Budget | null>;
    update(budget: Budget): Promise<Budget>;
    findAll(): Promise<Budget[]>;
}

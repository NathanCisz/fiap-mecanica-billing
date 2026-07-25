import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IBudgetRepository } from '../../application/ports/budget.repository.port';
import {
  Budget,
  BudgetItem,
  BudgetStatus,
} from '../../domain/entities/budget.entity';

@Injectable()
export class BudgetRepository implements IBudgetRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: any): Budget {
    return new Budget({
      id: raw.id,
      serviceOrderId: raw.serviceOrderId,
      items: raw.items as BudgetItem[],
      totalAmount: raw.totalAmount,
      status: raw.status as BudgetStatus,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  async create(budget: Budget): Promise<Budget> {
    const raw = await this.prisma.budget.create({
      data: {
        id: budget.id,
        serviceOrderId: budget.serviceOrderId,
        items: budget.items as any,
        totalAmount: budget.totalAmount,
        status: budget.status,
        createdAt: budget.createdAt,
        updatedAt: budget.updatedAt,
      },
    });
    return this.toDomain(raw);
  }

  async findById(id: string): Promise<Budget | null> {
    const raw = await this.prisma.budget.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByServiceOrderId(serviceOrderId: string): Promise<Budget | null> {
    const raw = await this.prisma.budget.findUnique({
      where: { serviceOrderId },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async update(budget: Budget): Promise<Budget> {
    const raw = await this.prisma.budget.update({
      where: { id: budget.id },
      data: {
        items: budget.items as any,
        totalAmount: budget.totalAmount,
        status: budget.status,
        updatedAt: budget.updatedAt,
      },
    });
    return this.toDomain(raw);
  }

  async findAll(): Promise<Budget[]> {
    const raws = await this.prisma.budget.findMany();
    return raws.map((raw) => this.toDomain(raw));
  }
}

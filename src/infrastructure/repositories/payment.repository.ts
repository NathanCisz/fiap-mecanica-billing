import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPaymentRepository } from '../../application/ports/payment.repository.port';
import { Payment, PaymentStatus } from '../../domain/entities/payment.entity';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: any): Payment {
    return new Payment({
      id: raw.id,
      budgetId: raw.budgetId,
      mercadoPagoId: raw.mercadoPagoId,
      amount: raw.amount,
      status: raw.status as PaymentStatus,
      paymentMethod: raw.paymentMethod,
      paidAt: raw.paidAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  async create(payment: Payment): Promise<Payment> {
    const raw = await this.prisma.payment.create({
      data: {
        id: payment.id,
        budgetId: payment.budgetId,
        mercadoPagoId: payment.mercadoPagoId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        paidAt: payment.paidAt,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });
    return this.toDomain(raw);
  }

  async findById(id: string): Promise<Payment | null> {
    const raw = await this.prisma.payment.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByBudgetId(budgetId: string): Promise<Payment[]> {
    const raws = await this.prisma.payment.findMany({ where: { budgetId } });
    return raws.map((raw) => this.toDomain(raw));
  }

  async update(payment: Payment): Promise<Payment> {
    const raw = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        mercadoPagoId: payment.mercadoPagoId,
        status: payment.status,
        paidAt: payment.paidAt,
        updatedAt: payment.updatedAt,
      },
    });
    return this.toDomain(raw);
  }
}

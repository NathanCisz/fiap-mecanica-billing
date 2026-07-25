export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export class Payment {
  id: string;
  budgetId: string;
  mercadoPagoId?: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Partial<Payment>) {
    Object.assign(this, props);
  }

  approve(mercadoPagoId: string): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be approved');
    }
    this.status = PaymentStatus.APPROVED;
    this.mercadoPagoId = mercadoPagoId;
    this.paidAt = new Date();
  }

  reject(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Only pending payments can be rejected');
    }
    this.status = PaymentStatus.REJECTED;
  }

  toJSON() {
    return {
      id: this.id,
      budgetId: this.budgetId,
      mercadoPagoId: this.mercadoPagoId,
      amount: this.amount,
      status: this.status,
      paymentMethod: this.paymentMethod,
      paidAt: this.paidAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

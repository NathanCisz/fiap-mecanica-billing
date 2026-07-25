export enum BudgetStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface BudgetItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export class Budget {
  id: string;
  serviceOrderId: string;
  items: BudgetItem[];
  totalAmount: number;
  status: BudgetStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Partial<Budget>) {
    Object.assign(this, props);
  }

  approve(): void {
    if (this.status !== BudgetStatus.PENDING) {
      throw new Error('Only pending budgets can be approved');
    }
    this.status = BudgetStatus.APPROVED;
  }

  reject(): void {
    if (this.status !== BudgetStatus.PENDING) {
      throw new Error('Only pending budgets can be rejected');
    }
    this.status = BudgetStatus.REJECTED;
  }

  cancel(): void {
    if (this.status === BudgetStatus.CANCELLED) {
      throw new Error('Budget is already cancelled');
    }
    this.status = BudgetStatus.CANCELLED;
  }

  toJSON() {
    return {
      id: this.id,
      serviceOrderId: this.serviceOrderId,
      items: this.items,
      totalAmount: this.totalAmount,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

import { Budget, BudgetStatus } from './budget.entity';

describe('Budget Entity', () => {
  const makeBudget = (status = BudgetStatus.PENDING) =>
    new Budget({
      id: 'budget-id',
      serviceOrderId: 'order-id',
      items: [
        {
          description: 'Troca de óleo',
          quantity: 1,
          unitPrice: 50,
          totalPrice: 50,
        },
      ],
      totalAmount: 50,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  it('should create a budget', () => {
    const budget = makeBudget();
    expect(budget.status).toBe(BudgetStatus.PENDING);
  });

  it('should approve a pending budget', () => {
    const budget = makeBudget();
    budget.approve();
    expect(budget.status).toBe(BudgetStatus.APPROVED);
  });

  it('should reject a pending budget', () => {
    const budget = makeBudget();
    budget.reject();
    expect(budget.status).toBe(BudgetStatus.REJECTED);
  });

  it('should throw when approving non-pending budget', () => {
    const budget = makeBudget(BudgetStatus.APPROVED);
    expect(() => budget.approve()).toThrow(
      'Only pending budgets can be approved',
    );
  });

  it('should throw when rejecting non-pending budget', () => {
    const budget = makeBudget(BudgetStatus.REJECTED);
    expect(() => budget.reject()).toThrow(
      'Only pending budgets can be rejected',
    );
  });

  it('should cancel a budget', () => {
    const budget = makeBudget();
    budget.cancel();
    expect(budget.status).toBe(BudgetStatus.CANCELLED);
  });

  it('should return JSON representation', () => {
    const budget = makeBudget();
    const json = budget.toJSON();
    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('serviceOrderId');
    expect(json).toHaveProperty('totalAmount');
  });
});

import { Payment, PaymentStatus } from './payment.entity';

describe('Payment Entity', () => {
  const makePayment = (status = PaymentStatus.PENDING) =>
    new Payment({
      id: 'payment-id',
      budgetId: 'budget-id',
      amount: 50,
      status,
      paymentMethod: 'credit_card',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  it('should create a payment', () => {
    const payment = makePayment();
    expect(payment.status).toBe(PaymentStatus.PENDING);
  });

  it('should approve a pending payment', () => {
    const payment = makePayment();
    payment.approve('mp-id-123');
    expect(payment.status).toBe(PaymentStatus.APPROVED);
    expect(payment.mercadoPagoId).toBe('mp-id-123');
    expect(payment.paidAt).toBeDefined();
  });

  it('should reject a pending payment', () => {
    const payment = makePayment();
    payment.reject();
    expect(payment.status).toBe(PaymentStatus.REJECTED);
  });

  it('should throw when approving non-pending payment', () => {
    const payment = makePayment(PaymentStatus.APPROVED);
    expect(() => payment.approve('mp-id')).toThrow(
      'Only pending payments can be approved',
    );
  });

  it('should throw when rejecting non-pending payment', () => {
    const payment = makePayment(PaymentStatus.REJECTED);
    expect(() => payment.reject()).toThrow(
      'Only pending payments can be rejected',
    );
  });

  it('should return JSON representation', () => {
    const payment = makePayment();
    const json = payment.toJSON();
    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('budgetId');
    expect(json).toHaveProperty('amount');
  });
});

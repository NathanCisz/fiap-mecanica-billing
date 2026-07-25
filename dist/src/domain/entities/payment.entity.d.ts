export declare enum PaymentStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}
export declare class Payment {
    id: string;
    budgetId: string;
    mercadoPagoId?: string;
    amount: number;
    status: PaymentStatus;
    paymentMethod?: string;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: Partial<Payment>);
    approve(mercadoPagoId: string): void;
    reject(): void;
    toJSON(): {
        id: string;
        budgetId: string;
        mercadoPagoId: string | undefined;
        amount: number;
        status: PaymentStatus;
        paymentMethod: string | undefined;
        paidAt: Date | undefined;
        createdAt: Date;
        updatedAt: Date;
    };
}

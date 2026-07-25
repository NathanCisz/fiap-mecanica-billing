export declare enum BudgetStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}
export interface BudgetItem {
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export declare class Budget {
    id: string;
    serviceOrderId: string;
    items: BudgetItem[];
    totalAmount: number;
    status: BudgetStatus;
    createdAt: Date;
    updatedAt: Date;
    constructor(props: Partial<Budget>);
    approve(): void;
    reject(): void;
    cancel(): void;
    toJSON(): {
        id: string;
        serviceOrderId: string;
        items: BudgetItem[];
        totalAmount: number;
        status: BudgetStatus;
        createdAt: Date;
        updatedAt: Date;
    };
}

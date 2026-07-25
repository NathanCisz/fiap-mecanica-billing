export declare class BudgetItemDto {
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export declare class CreateBudgetDto {
    serviceOrderId: string;
    items: BudgetItemDto[];
}

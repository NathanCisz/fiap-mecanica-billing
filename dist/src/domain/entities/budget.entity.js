"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = exports.BudgetStatus = void 0;
var BudgetStatus;
(function (BudgetStatus) {
    BudgetStatus["PENDING"] = "PENDING";
    BudgetStatus["APPROVED"] = "APPROVED";
    BudgetStatus["REJECTED"] = "REJECTED";
    BudgetStatus["CANCELLED"] = "CANCELLED";
})(BudgetStatus || (exports.BudgetStatus = BudgetStatus = {}));
class Budget {
    id;
    serviceOrderId;
    items;
    totalAmount;
    status;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    approve() {
        if (this.status !== BudgetStatus.PENDING) {
            throw new Error('Only pending budgets can be approved');
        }
        this.status = BudgetStatus.APPROVED;
    }
    reject() {
        if (this.status !== BudgetStatus.PENDING) {
            throw new Error('Only pending budgets can be rejected');
        }
        this.status = BudgetStatus.REJECTED;
    }
    cancel() {
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
exports.Budget = Budget;
//# sourceMappingURL=budget.entity.js.map
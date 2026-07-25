"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["APPROVED"] = "APPROVED";
    PaymentStatus["REJECTED"] = "REJECTED";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
class Payment {
    id;
    budgetId;
    mercadoPagoId;
    amount;
    status;
    paymentMethod;
    paidAt;
    createdAt;
    updatedAt;
    constructor(props) {
        Object.assign(this, props);
    }
    approve(mercadoPagoId) {
        if (this.status !== PaymentStatus.PENDING) {
            throw new Error('Only pending payments can be approved');
        }
        this.status = PaymentStatus.APPROVED;
        this.mercadoPagoId = mercadoPagoId;
        this.paidAt = new Date();
    }
    reject() {
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
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map
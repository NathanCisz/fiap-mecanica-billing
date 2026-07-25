"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const payment_entity_1 = require("../../../domain/entities/payment.entity");
const payment_repository_port_1 = require("../../ports/payment.repository.port");
const budget_repository_port_1 = require("../../ports/budget.repository.port");
const messaging_port_1 = require("../../ports/messaging.port");
const uuid_1 = require("uuid");
let CreatePaymentUseCase = class CreatePaymentUseCase {
    paymentRepository;
    budgetRepository;
    messaging;
    constructor(paymentRepository, budgetRepository, messaging) {
        this.paymentRepository = paymentRepository;
        this.budgetRepository = budgetRepository;
        this.messaging = messaging;
    }
    async execute(input) {
        const budget = await this.budgetRepository.findById(input.budgetId);
        if (!budget) {
            throw new common_1.NotFoundException('Budget not found');
        }
        if (budget.status !== 'APPROVED') {
            throw new Error('Budget must be approved before payment');
        }
        const payment = new payment_entity_1.Payment({
            id: (0, uuid_1.v4)(),
            budgetId: input.budgetId,
            amount: budget.totalAmount,
            status: payment_entity_1.PaymentStatus.PENDING,
            paymentMethod: input.paymentMethod,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const saved = await this.paymentRepository.create(payment);
        await this.messaging.publish('billing', 'payment.created', {
            paymentId: saved.id,
            budgetId: saved.budgetId,
            amount: saved.amount,
        });
        return saved;
    }
};
exports.CreatePaymentUseCase = CreatePaymentUseCase;
exports.CreatePaymentUseCase = CreatePaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(payment_repository_port_1.PAYMENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(budget_repository_port_1.BUDGET_REPOSITORY)),
    __param(2, (0, common_1.Inject)(messaging_port_1.MESSAGING_PORT)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreatePaymentUseCase);
//# sourceMappingURL=create-payment.use-case.js.map
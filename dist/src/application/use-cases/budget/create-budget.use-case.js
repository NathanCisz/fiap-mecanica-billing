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
exports.CreateBudgetUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_entity_1 = require("../../../domain/entities/budget.entity");
const budget_repository_port_1 = require("../../ports/budget.repository.port");
const messaging_port_1 = require("../../ports/messaging.port");
const uuid_1 = require("uuid");
let CreateBudgetUseCase = class CreateBudgetUseCase {
    budgetRepository;
    messaging;
    constructor(budgetRepository, messaging) {
        this.budgetRepository = budgetRepository;
        this.messaging = messaging;
    }
    async execute(input) {
        const existing = await this.budgetRepository.findByServiceOrderId(input.serviceOrderId);
        if (existing) {
            throw new Error('Budget already exists for this service order');
        }
        const totalAmount = input.items.reduce((sum, item) => sum + item.totalPrice, 0);
        const budget = new budget_entity_1.Budget({
            id: (0, uuid_1.v4)(),
            serviceOrderId: input.serviceOrderId,
            items: input.items,
            totalAmount,
            status: budget_entity_1.BudgetStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const saved = await this.budgetRepository.create(budget);
        await this.messaging.publish('billing', 'budget.created', {
            budgetId: saved.id,
            serviceOrderId: saved.serviceOrderId,
            totalAmount: saved.totalAmount,
        });
        return saved;
    }
};
exports.CreateBudgetUseCase = CreateBudgetUseCase;
exports.CreateBudgetUseCase = CreateBudgetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(budget_repository_port_1.BUDGET_REPOSITORY)),
    __param(1, (0, common_1.Inject)(messaging_port_1.MESSAGING_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], CreateBudgetUseCase);
//# sourceMappingURL=create-budget.use-case.js.map
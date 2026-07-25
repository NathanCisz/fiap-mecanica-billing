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
exports.ApproveBudgetUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_repository_port_1 = require("../../ports/budget.repository.port");
const messaging_port_1 = require("../../ports/messaging.port");
let ApproveBudgetUseCase = class ApproveBudgetUseCase {
    budgetRepository;
    messaging;
    constructor(budgetRepository, messaging) {
        this.budgetRepository = budgetRepository;
        this.messaging = messaging;
    }
    async execute(id, approved) {
        const budget = await this.budgetRepository.findById(id);
        if (!budget) {
            throw new common_1.NotFoundException('Budget not found');
        }
        if (approved) {
            budget.approve();
        }
        else {
            budget.reject();
        }
        budget.updatedAt = new Date();
        const updated = await this.budgetRepository.update(budget);
        await this.messaging.publish('billing', approved ? 'budget.approved' : 'budget.rejected', {
            budgetId: updated.id,
            serviceOrderId: updated.serviceOrderId,
            status: updated.status,
        });
        return updated;
    }
};
exports.ApproveBudgetUseCase = ApproveBudgetUseCase;
exports.ApproveBudgetUseCase = ApproveBudgetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(budget_repository_port_1.BUDGET_REPOSITORY)),
    __param(1, (0, common_1.Inject)(messaging_port_1.MESSAGING_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], ApproveBudgetUseCase);
//# sourceMappingURL=approve-budget.use-case.js.map
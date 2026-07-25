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
exports.BudgetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_budget_use_case_1 = require("../../application/use-cases/budget/create-budget.use-case");
const approve_budget_use_case_1 = require("../../application/use-cases/budget/approve-budget.use-case");
const create_budget_dto_1 = require("../dtos/budget/create-budget.dto");
const approve_budget_dto_1 = require("../dtos/budget/approve-budget.dto");
const budget_repository_port_1 = require("../../application/ports/budget.repository.port");
let BudgetController = class BudgetController {
    createBudgetUseCase;
    approveBudgetUseCase;
    budgetRepository;
    constructor(createBudgetUseCase, approveBudgetUseCase, budgetRepository) {
        this.createBudgetUseCase = createBudgetUseCase;
        this.approveBudgetUseCase = approveBudgetUseCase;
        this.budgetRepository = budgetRepository;
    }
    async create(dto) {
        const budget = await this.createBudgetUseCase.execute(dto);
        return budget.toJSON();
    }
    async findAll() {
        const budgets = await this.budgetRepository.findAll();
        return budgets.map((b) => b.toJSON());
    }
    async findOne(id) {
        const budget = await this.budgetRepository.findById(id);
        return budget?.toJSON();
    }
    async approve(id, dto) {
        const budget = await this.approveBudgetUseCase.execute(id, dto.approved);
        return budget.toJSON();
    }
};
exports.BudgetController = BudgetController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar orçamento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Orçamento criado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_budget_dto_1.CreateBudgetDto]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar orçamentos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar orçamento por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Aprovar ou rejeitar orçamento' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_budget_dto_1.ApproveBudgetDto]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "approve", null);
exports.BudgetController = BudgetController = __decorate([
    (0, swagger_1.ApiTags)('budgets'),
    (0, common_1.Controller)('budgets'),
    __param(2, (0, common_1.Inject)(budget_repository_port_1.BUDGET_REPOSITORY)),
    __metadata("design:paramtypes", [create_budget_use_case_1.CreateBudgetUseCase,
        approve_budget_use_case_1.ApproveBudgetUseCase, Object])
], BudgetController);
//# sourceMappingURL=budget.controller.js.map
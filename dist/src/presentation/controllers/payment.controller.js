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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_payment_use_case_1 = require("../../application/use-cases/payment/create-payment.use-case");
const create_payment_dto_1 = require("../dtos/payment/create-payment.dto");
const payment_repository_port_1 = require("../../application/ports/payment.repository.port");
let PaymentController = class PaymentController {
    createPaymentUseCase;
    paymentRepository;
    constructor(createPaymentUseCase, paymentRepository) {
        this.createPaymentUseCase = createPaymentUseCase;
        this.paymentRepository = paymentRepository;
    }
    async create(dto) {
        const payment = await this.createPaymentUseCase.execute(dto);
        return payment.toJSON();
    }
    async findOne(id) {
        const payment = await this.paymentRepository.findById(id);
        return payment?.toJSON();
    }
    async findByBudget(budgetId) {
        const payments = await this.paymentRepository.findByBudgetId(budgetId);
        return payments.map((p) => p.toJSON());
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar pagamento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pagamento criado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pagamento por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('budget/:budgetId'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pagamentos por orçamento' }),
    __param(0, (0, common_1.Param)('budgetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findByBudget", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, common_1.Controller)('payments'),
    __param(1, (0, common_1.Inject)(payment_repository_port_1.PAYMENT_REPOSITORY)),
    __metadata("design:paramtypes", [create_payment_use_case_1.CreatePaymentUseCase, Object])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map
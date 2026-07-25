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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const payment_entity_1 = require("../../domain/entities/payment.entity");
let PaymentRepository = class PaymentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toDomain(raw) {
        return new payment_entity_1.Payment({
            id: raw.id,
            budgetId: raw.budgetId,
            mercadoPagoId: raw.mercadoPagoId,
            amount: raw.amount,
            status: raw.status,
            paymentMethod: raw.paymentMethod,
            paidAt: raw.paidAt,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
    async create(payment) {
        const raw = await this.prisma.payment.create({
            data: {
                id: payment.id,
                budgetId: payment.budgetId,
                mercadoPagoId: payment.mercadoPagoId,
                amount: payment.amount,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                paidAt: payment.paidAt,
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt,
            },
        });
        return this.toDomain(raw);
    }
    async findById(id) {
        const raw = await this.prisma.payment.findUnique({ where: { id } });
        return raw ? this.toDomain(raw) : null;
    }
    async findByBudgetId(budgetId) {
        const raws = await this.prisma.payment.findMany({ where: { budgetId } });
        return raws.map((raw) => this.toDomain(raw));
    }
    async update(payment) {
        const raw = await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                mercadoPagoId: payment.mercadoPagoId,
                status: payment.status,
                paidAt: payment.paidAt,
                updatedAt: payment.updatedAt,
            },
        });
        return this.toDomain(raw);
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map
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
exports.BudgetRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const budget_entity_1 = require("../../domain/entities/budget.entity");
let BudgetRepository = class BudgetRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toDomain(raw) {
        return new budget_entity_1.Budget({
            id: raw.id,
            serviceOrderId: raw.serviceOrderId,
            items: raw.items,
            totalAmount: raw.totalAmount,
            status: raw.status,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
    async create(budget) {
        const raw = await this.prisma.budget.create({
            data: {
                id: budget.id,
                serviceOrderId: budget.serviceOrderId,
                items: budget.items,
                totalAmount: budget.totalAmount,
                status: budget.status,
                createdAt: budget.createdAt,
                updatedAt: budget.updatedAt,
            },
        });
        return this.toDomain(raw);
    }
    async findById(id) {
        const raw = await this.prisma.budget.findUnique({ where: { id } });
        return raw ? this.toDomain(raw) : null;
    }
    async findByServiceOrderId(serviceOrderId) {
        const raw = await this.prisma.budget.findUnique({
            where: { serviceOrderId },
        });
        return raw ? this.toDomain(raw) : null;
    }
    async update(budget) {
        const raw = await this.prisma.budget.update({
            where: { id: budget.id },
            data: {
                items: budget.items,
                totalAmount: budget.totalAmount,
                status: budget.status,
                updatedAt: budget.updatedAt,
            },
        });
        return this.toDomain(raw);
    }
    async findAll() {
        const raws = await this.prisma.budget.findMany();
        return raws.map((raw) => this.toDomain(raw));
    }
};
exports.BudgetRepository = BudgetRepository;
exports.BudgetRepository = BudgetRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetRepository);
//# sourceMappingURL=budget.repository.js.map
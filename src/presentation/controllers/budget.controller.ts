import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBudgetUseCase } from '../../application/use-cases/budget/create-budget.use-case';
import { ApproveBudgetUseCase } from '../../application/use-cases/budget/approve-budget.use-case';
import { CreateBudgetDto } from '../dtos/budget/create-budget.dto';
import { ApproveBudgetDto } from '../dtos/budget/approve-budget.dto';
import {
  type IBudgetRepository,
  BUDGET_REPOSITORY,
} from '../../application/ports/budget.repository.port';

@ApiTags('budgets')
@Controller('budgets')
export class BudgetController {
  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly approveBudgetUseCase: ApproveBudgetUseCase,
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar orçamento' })
  @ApiResponse({ status: 201, description: 'Orçamento criado' })
  async create(@Body() dto: CreateBudgetDto) {
    const budget = await this.createBudgetUseCase.execute(dto);
    return budget.toJSON();
  }

  @Get()
  @ApiOperation({ summary: 'Listar orçamentos' })
  async findAll() {
    const budgets = await this.budgetRepository.findAll();
    return budgets.map((b) => b.toJSON());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar orçamento por ID' })
  async findOne(@Param('id') id: string) {
    const budget = await this.budgetRepository.findById(id);
    return budget?.toJSON();
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Aprovar ou rejeitar orçamento' })
  async approve(@Param('id') id: string, @Body() dto: ApproveBudgetDto) {
    const budget = await this.approveBudgetUseCase.execute(id, dto.approved);
    return budget.toJSON();
  }
}

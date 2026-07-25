import { Body, Controller, Get, Param, Post, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePaymentUseCase } from '../../application/use-cases/payment/create-payment.use-case';
import { CreatePaymentDto } from '../dtos/payment/create-payment.dto';
import {
  type IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../application/ports/payment.repository.port';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar pagamento' })
  @ApiResponse({ status: 201, description: 'Pagamento criado' })
  async create(@Body() dto: CreatePaymentDto) {
    const payment = await this.createPaymentUseCase.execute(dto);
    return payment.toJSON();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pagamento por ID' })
  async findOne(@Param('id') id: string) {
    const payment = await this.paymentRepository.findById(id);
    return payment?.toJSON();
  }

  @Get('budget/:budgetId')
  @ApiOperation({ summary: 'Buscar pagamentos por orçamento' })
  async findByBudget(@Param('budgetId') budgetId: string) {
    const payments = await this.paymentRepository.findByBudgetId(budgetId);
    return payments.map((p) => p.toJSON());
  }
}

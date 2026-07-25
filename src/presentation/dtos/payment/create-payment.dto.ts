import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-do-orcamento' })
  @IsString()
  budgetId!: string;

  @ApiProperty({ example: 'credit_card' })
  @IsString()
  paymentMethod!: string;
}

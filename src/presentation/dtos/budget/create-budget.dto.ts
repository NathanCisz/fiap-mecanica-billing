import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BudgetItemDto {
  @ApiProperty({ example: 'Troca de óleo' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  quantity!: number;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  @Min(0)
  unitPrice!: number;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  @Min(0)
  totalPrice!: number;
}

export class CreateBudgetDto {
  @ApiProperty({ example: 'uuid-da-ordem-de-servico' })
  @IsString()
  serviceOrderId!: string;

  @ApiProperty({ type: [BudgetItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetItemDto)
  items!: BudgetItemDto[];
}

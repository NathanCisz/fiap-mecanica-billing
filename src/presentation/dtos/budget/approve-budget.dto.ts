import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ApproveBudgetDto {
  @ApiProperty({
    example: true,
    description: 'true para aprovar, false para rejeitar',
  })
  @IsBoolean()
  approved!: boolean;
}

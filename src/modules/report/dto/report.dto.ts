import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

/**
 * Car select rules
 */
export class ReportDto {
  @ApiProperty({ description: 'Номер года' })
  @Transform((x) => parseInt(x, 10))
  @IsNumber()
  @IsNotEmpty()
  @Min(2000)
  @Max(3000)
  year: number;

  @ApiProperty({ description: 'Номер месяца' })
  @Transform((x) => parseInt(x, 10))
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  month: number;
}

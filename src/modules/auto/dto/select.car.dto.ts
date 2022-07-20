import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Car select rules
 */
export class SelectCarDto {
  @ApiProperty({ description: 'Номер автомобиля' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 9)
  number: string;
}

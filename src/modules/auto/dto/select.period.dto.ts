import { IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import moment from 'moment';

/**
 * Car select rules
 */
export class SelectPeriodDto {
  @ApiProperty({ description: 'Дата начала аренды автомобиля', example: '2022-01-01' })
  @Transform((x) => moment.utc(new Date(x)).startOf('day').toDate())
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({ description: 'Дата окончания аренды автомобиля', example: '2022-01-31' })
  @Transform((x) => moment.utc(new Date(x)).endOf('day').toDate())
  @IsDate()
  @IsNotEmpty()
  finish: Date;
}

import { ApiProperty } from '@nestjs/swagger';

/**
 * Car description
 */
export class Car {
  @ApiProperty({ example: 1, description: 'ID автомобиля' })
  id: number;

  @ApiProperty({ example: 'H555HH99', description: 'Гос. номер автомобиля' })
  number: string;

  @ApiProperty({ example: 'Красный', description: 'Цвет автомобиля' })
  color: string;
}

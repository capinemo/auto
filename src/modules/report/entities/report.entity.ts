import { ApiProperty } from '@nestjs/swagger';

/**
 * Car description
 */
export class Report {
  @ApiProperty({ example: '2022-11', description: 'Запрошенный месяц' })
  date: string;

  @ApiProperty({
    example: '{ car: "H555HH99", percent: 30.4 }',
    description: 'Месячная загрузка автомобилей + средняя по всем'
  })
  report: Array<
    { car: string; percent: number } | { car: 'Средняя загрузка'; percent: number }
  >;
}

import {
  Query,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AutoLogic } from './auto.logic';
import { SelectCarDto, SelectPeriodDto } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { Car } from './entities';
import httpStatus from 'http-status';

/**
 * Controller for actions with taking auto in auto
 */
@Controller('cars')
export class AutoController {
  constructor (private autoLogic: AutoLogic) {}

  /**
   * Get all existing cars
   */
  @Get()
  @ApiResponse({
    status: httpStatus.OK,
    description: 'Список всех автомобилей',
    isArray: true,
    type: Car
  })
  async loadAutos () {
    return this.autoLogic.getCars();
  }

  /**
   * Check that selected car is free for renting by given date
   */
  @Get(':number/check')
  @ApiResponse({
    status: httpStatus.OK,
    description: 'Стоимость аренды автомобиля на указанный период',
    type: Number
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Ошибка валидации'
  })
  @ApiResponse({
    status: httpStatus.CONFLICT,
    description: 'Указан некорректный интервал'
  })
  async checkFree (
    @Param() selectCarDto: SelectCarDto,
    @Query() selectPeriodDto: SelectPeriodDto
  ) {
    try {
      await this.autoLogic.checkAvailable(selectCarDto.number, selectPeriodDto);
    } catch (e) {
      throw new HttpException(
        {
          status: 'Conflict',
          error: e.message
        },
        HttpStatus.CONFLICT
      );
    }
    return this.autoLogic.countCost(selectPeriodDto.start, selectPeriodDto.finish);
  }

  /**
   * Creates auto session for given auto
   */
  @Post(':number/rent')
  @ApiResponse({
    status: httpStatus.CREATED,
    description: 'Запрос аренды успешно завершен'
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Ошибка валидации'
  })
  @ApiResponse({
    status: httpStatus.CONFLICT,
    description: 'Указан некорректный интервал'
  })
  @HttpCode(201)
  async rentAuto (
    @Param() selectCarDto: SelectCarDto,
    @Query() selectPeriodDto: SelectPeriodDto
  ) {
    try {
      await this.autoLogic.checkAvailable(selectCarDto.number, selectPeriodDto);
    } catch (e) {
      throw new HttpException(
        {
          status: 'Conflict',
          error: e.message
        },
        HttpStatus.CONFLICT
      );
    }
    return this.autoLogic.createRentSession(selectCarDto.number, selectPeriodDto);
  }
}

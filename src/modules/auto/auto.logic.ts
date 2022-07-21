import { Injectable } from '@nestjs/common';
import { DataAccessLayer } from '../../common/db/dal';
import { Car } from './entities';
import { SelectPeriodDto } from './dto';
import moment from 'moment';

/**
 * DB accessing layer
 */
@Injectable()
export class AutoLogic {
  /** Cost of auto rent for 1 day */
  public readonly dayCost = 1000;

  /** Bonus program by day */
  private readonly dailyCostForMonth = [
    ...new Array(4).fill(this.dayCost),
    ...new Array(5).fill((this.dayCost * (100 - 5)) / 100),
    ...new Array(8).fill((this.dayCost * (100 - 10)) / 100),
    ...new Array(13).fill((this.dayCost * (100 - 15)) / 100)
  ];
  constructor (private dal: DataAccessLayer) {}

  /**
   * Load list of cars for rent
   *
   * @returns             Cars list
   */
  async getCars (): Promise<Car[]> {
    return this.dal.loadCarList();
  }

  /**
   * Check that car available for rent and throw error If car is busy
   *
   * @param carNumber
   * @param period
   */
  async checkAvailable (carNumber: string, period: SelectPeriodDto): Promise<void | never> {
    const startWeekday = moment(period.start).weekday();
    const finishWeekday = moment(period.finish).weekday();

    if (period.start > period.finish) {
      throw new Error('Начало периодв не может быть больше даты окончания');
    }

    if (moment.utc(period.start).isSame(moment.utc(period.finish), 'day')) {
      throw new Error('Начало периодв не может быть той же датой, что и окончание');
    }

    if (startWeekday === 0 || startWeekday === 6) {
      throw new Error('Начало периодв не может попадать на выходные дни');
    }

    if (finishWeekday === 0 || finishWeekday === 6) {
      throw new Error('Окончание периодв не может попадать на выходные дни');
    }

    if (moment(period.start).add(30, 'days').toDate() < period.finish) {
      throw new Error('Период аренды не может быть больше 30 дней');
    }

    const periods = await this.dal.loadPeriodsForCar(carNumber, period.start, period.finish);
    if (periods) throw new Error('Период уже занят');
  }

  /**
   * Count rent cost by given period
   *
   * @param start
   * @param finish
   */
  async countCost (start: Date, finish: Date): Promise<number> {
    const diffs = moment(finish).diff(start, 'days') + 1;
    return this.dailyCostForMonth.slice(0, diffs).reduce((acc, i) => acc + i, 0);
  }

  /**
   * Creates rent session
   *
   * @param carNumber
   * @param period
   */
  async createRentSession (carNumber: string, period: SelectPeriodDto): Promise<void> {
    await this.dal.createPeriodsForCar(carNumber, period.start, period.finish);
  }
}

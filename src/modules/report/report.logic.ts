import { Injectable } from '@nestjs/common';
import { DataAccessLayer } from '../../common/db/dal';
import moment from 'moment';
import { Report } from './entities';

/**
 * DB accessing layer
 */
@Injectable()
export class ReportLogic {
  constructor (private dal: DataAccessLayer) {}

  /**
   * Generates cars using report by month
   *
   * @param year          Target year for report generation
   * @param month         Target month for report generation
   * @returns             Report object
   */
  async generateMonthReport (year: number, month: number): Promise<Report> {
    const dateStr = `${year}-${month}`;
    const time = new Date(dateStr);
    const startPeriod = moment(time);
    const endPeriod = moment(time).endOf('month');
    const start = startPeriod.format('YYYY-MM-DDTHH:mm:ss');
    const finish = endPeriod.format('YYYY-MM-DDTHH:mm:ss');
    const daysInMonth = moment(endPeriod).diff(startPeriod, 'days') + 1;

    const countOfCar = (await this.dal.loadCarList()).length;
    const usages = await this.dal.loadCarReport(start, finish);

    const report = new Map();
    let totalDaysRent = 0;
    usages.forEach((rent) => {
      const s = rent.start_session > startPeriod ? rent.start_session : startPeriod.toDate();
      const f = rent.end_session > endPeriod ? endPeriod.toDate() : rent.end_session;
      const delta = moment(f).diff(s, 'days') + 1;
      totalDaysRent += delta;

      if (report.has(rent.number)) report.set(rent.number, delta + report.get(rent.number));
      else report.set(rent.number, delta);
    });

    return {
      date: dateStr,
      report: [
        ...Array.from(report.entries()).map((i) => ({
          car: i[0],
          percent: Math.round((i[1] * 10000) / daysInMonth) / 100
        })),
        {
          car: 'Средняя загрузка',
          percent: Math.round((totalDaysRent * 10000) / (daysInMonth * countOfCar)) / 100
        }
      ]
    };
  }
}

import { Injectable } from '@nestjs/common';
import { DataAccessLayer } from '../../common/db/dal';

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
  async generateMonthReport (
    year: number,
    month: number
  ): Promise<{
    month: string;
    report: Array<{ car: string; percent: number }>;
  }> {
    return {
      month: `${year}/${month}`,
      report: [
        {
          car: '123',
          percent: 50
        }
      ]
    };
  }
}

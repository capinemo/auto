import { Controller, Get } from '@nestjs/common';
import { ReportLogic } from './report.logic';

/**
 * Controller for building reports
 */
@Controller('report')
export class RentReportController {
  constructor (private reportLogic: ReportLogic) {}
  /**
   * Calculates monthly report with all cars
   */
  @Get('month/:year/:month')
  getMonthReport () {
    return this.reportLogic.generateMonthReport(2022, 12);
  }
}

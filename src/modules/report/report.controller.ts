import { Controller, Get, Param } from '@nestjs/common';
import { ReportLogic } from './report.logic';
import { ApiResponse } from '@nestjs/swagger';
import httpStatus from 'http-status';
import { ReportDto } from './dto';
import { Report } from './entities';

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
  @ApiResponse({
    status: httpStatus.OK,
    description: 'Месячный отчет сформирован',
    type: Report
  })
  @ApiResponse({
    status: httpStatus.BAD_REQUEST,
    description: 'Ошибка валидации'
  })
  getMonthReport (@Param() reportDto: ReportDto) {
    return this.reportLogic.generateMonthReport(reportDto.year, reportDto.month);
  }
}

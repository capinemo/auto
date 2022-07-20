import { Module } from '@nestjs/common';
import { RentReportController } from './report.controller';
import { ReportLogic } from './report.logic';
import BaseModule from '../../common/db';

/**
 * Report module
 */
@Module({
  controllers: [RentReportController],
  providers: [ReportLogic],
  imports: [BaseModule]
})
export default class RentReportModule {}

import { Module } from '@nestjs/common';
import AutoRentModule from './auto';
import RentReportModule from './report';

/**
 * Application main module
 */
@Module({
  imports: [AutoRentModule, RentReportModule]
})
export default class MainModule {}

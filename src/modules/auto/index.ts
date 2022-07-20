import { Module } from '@nestjs/common';
import { AutoController } from './auto.controller';
import BaseModule from '../../common/db';
import { AutoLogic } from './auto.logic';

/**
 * Auto module
 */
@Module({
  controllers: [AutoController],
  providers: [AutoLogic],
  imports: [BaseModule]
})
export default class AutoRentModule {}

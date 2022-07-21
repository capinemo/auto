import { Module } from '@nestjs/common';
import { DataAccessLayer } from './dal';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../../config';
import DataBase from './drivers';

/**
 * Application main module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    })
  ],
  providers: [DataAccessLayer, DataBase],
  exports: [DataAccessLayer]
})
export default class BaseModule {}

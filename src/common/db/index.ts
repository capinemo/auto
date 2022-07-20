import { Global, Module } from '@nestjs/common';
import { DataAccessLayer } from './dal';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../../config';

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
  providers: [DataAccessLayer],
  exports: [DataAccessLayer]
})
export default class BaseModule {}

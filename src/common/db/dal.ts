import { Injectable, Logger } from '@nestjs/common';
import { Client, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';
import {
  _carCreate,
  _carLoad,
  carCreateInPeriod,
  carReportInPeriod,
  carSelectAll,
  carSelectInPeriod
} from './models/cars.model';
import { _sessionCreate } from './models/session.model';
import DataBase from './drivers';

/**
 * DB accessing layer
 */
@Injectable()
export class DataAccessLayer {
  private readonly logger: Logger = new Logger(DataAccessLayer.name);

  constructor (private configService: ConfigService, private db: DataBase) {}

  /**
   * Loads all cars
   */
  async loadCarList () {
    const { rows } = (await this.db.query(carSelectAll)) as QueryResult;
    return rows;
  }

  /**
   * Loads session for car
   *
   * @param carNumber         Target car number
   * @param start             Start of checking session interval
   * @param finish            End of checking session interval
   */
  async loadPeriodsForCar (carNumber: string, start: Date, finish: Date): Promise<number> {
    const { rows } = (await this.db.query({
      text: carSelectInPeriod,
      values: [carNumber, start, finish]
    })) as QueryResult;
    return rows.length;
  }

  /**
   * Loads list of rents included in given period
   *
   * @param start         Start of report interval
   * @param finish        End of report interval
   */
  async loadCarReport (start: string, finish: string) {
    const { rows } = (await this.db.query({
      text: carReportInPeriod,
      values: [start, finish]
    })) as QueryResult;
    return rows;
  }

  /**
   * Creates session for car
   *
   * @param carNumber         Target car number
   * @param start             Start of creation session interval
   * @param finish            End of creation session interval
   */
  async createPeriodsForCar (carNumber: string, start: Date, finish: Date): Promise<void> {
    await this.db.query({
      text: carCreateInPeriod,
      values: [carNumber, start, finish]
    });
  }

  /**
   * Connects to DB while module loads
   */
  async onApplicationBootstrap (): Promise<void> {
    this.initDataBase()
      .then(() => {
        this.logger.log('Table filled');
      })
      .catch((e) => this.logger.error(e.message));
  }

  /**
   * Creates tables in DB and fill them with data
   *
   * @private
   */
  private async initDataBase () {
    await this.db.query(_carCreate);
    await this.db.query(_sessionCreate);
    await this.db.query(_carLoad);
  }
}

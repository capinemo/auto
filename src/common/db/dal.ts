import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';
import {
  _carCreate,
  _carLoad,
  carCreateInPeriod,
  carSelectAll,
  carSelectInPeriod
} from './models/cars.model';
import { _sessionCreate } from './models/session.model';

/**
 * DB accessing layer
 */
@Injectable()
export class DataAccessLayer {
  private readonly logger: Logger = new Logger(DataAccessLayer.name);
  private db: Client;

  constructor (private configService: ConfigService) {}

  /**
   * Loads all cars
   */
  async loadCarList () {
    const { rows } = await this.db.query(carSelectAll);
    return rows;
  }

  /**
   * Loads session for car
   */
  async loadPeriodsForCar (carNumber: string, start: Date, finish: Date): Promise<number> {
    const { rows } = await this.db.query({
      text: carSelectInPeriod,
      values: [carNumber, start, finish]
    });
    return rows.length;
  }

  /**
   * Creates session for car
   */
  async createPeriodsForCar (carNumber: string, start: Date, finish: Date): Promise<number> {
    const { rows } = await this.db.query({
      text: carCreateInPeriod,
      values: [carNumber, start, finish]
    });
    return rows.length;
  }

  /**
   * Connects to DB while module loads
   */
  async onModuleInit (): Promise<void> {
    this.db = new Client({
      connectionString: this.configService.get<string>('database.url')
    });
    await this.db.connect().catch((e) => this.logger.error(e));
    this.logger.log('DB connected');
    this.initDataBase()
      .then(() => {
        this.logger.log('Table filled');
      })
      .catch((e) => this.logger.error(e));
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

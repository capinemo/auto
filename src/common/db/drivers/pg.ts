import { Injectable, Logger } from '@nestjs/common';
import { Client, QueryConfig, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';
import { Driver } from './abstract';

/**
 * Postgres connector
 */
@Injectable()
export class PostgresDriver extends Driver {
  protected readonly logger: Logger = new Logger(PostgresDriver.name);
  protected db: Client;

  constructor (protected configService: ConfigService) {
    super(configService);
  }

  /**
   * Tasks for doing while module load
   */
  async onModuleInit (): Promise<void> {
    await this.connect();
  }

  /**
   * Connects to postgres DB while module loads
   */
  async connect (): Promise<void> {
    this.db = new Client({
      connectionString: this.configService.get<string>('database.url')
    });
    await this.db.connect().catch((e) => this.logger.error(e.message));
    this.logger.log('DB connected');
  }

  /**
   * Runs query in postgres
   * @param args
   */
  async query (args: string | QueryConfig): Promise<QueryResult | void> {
    return this.db.query(args);
  }
}

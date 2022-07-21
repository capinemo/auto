import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Abstract description class for storage driver
 */
@Injectable()
export abstract class Driver {
  protected readonly logger: Logger;

  /** Db connector */
  protected db: any;

  protected constructor (protected configService: ConfigService) {}

  /**
   * Connects to postgres DB while module loads
   */
  abstract connect (): void;

  /**
   * Row query to DB
   */
  abstract query (args: unknown): any;
}

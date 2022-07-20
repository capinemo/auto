import * as helmet from 'fastify-helmet';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import MainModule from './modules';
import { HttpExceptionFilter } from './common/error/http-exception.filter';

/**
 * Application initialization
 */
export async function initApplication (): Promise<INestApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter()
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  await app.register(helmet.fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
      }
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false }
    })
  );

  return app;
}

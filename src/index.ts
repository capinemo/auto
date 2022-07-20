import { Logger } from '@nestjs/common';
import { initApplication } from './init';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Runs application
 * @async
 */
async function runApp () {
  const port = 8000;
  const app = await initApplication();

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Auto-auto')
      .setDescription('Description of auto-auto service')
      .setVersion('0.0.1')
      .addTag('Auto')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(port, '0.0.0.0');

  Logger.log(`Application is listening ${port} port on ${await app.getUrl()}`, 'AUTO');
}

runApp()
  .then(() => {})
  .catch((err) => Logger.error(err));

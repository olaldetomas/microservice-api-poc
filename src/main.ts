import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).port;
  await app.listen(port, () => {
    Logger.log(`App listen on port ${port}`);
  });
}
bootstrap();

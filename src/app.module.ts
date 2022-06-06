import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from './database/database.module';
import { AppService } from './services/app.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

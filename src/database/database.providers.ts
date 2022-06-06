import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DATABASE_CONNECTION } from '../constants';

const mongoProvider = {
  imports: [ConfigModule],
  provide: DATABASE_CONNECTION,
  useFactory: async (
    configService: ConfigService,
  ): Promise<typeof mongoose> => {
    const mongoDbConnection = await mongoose.connect(configService.mongoDbUri);
    if (mongoDbConnection.connection.readyState === 1) {
      Logger.log('Database connected [MongoDB]');
    }
    return mongoDbConnection;
  },
  inject: [ConfigService],
};

const typeOrmProvider = {
  imports: [ConfigModule],
  provide: DATABASE_CONNECTION,
  useFactory: async (configService: ConfigService) => {
    Logger.log('Database connected [TypeORM]');
    return {
      ...configService.ormConfig,
    };
  },
  inject: [ConfigService],
};

export const databaseProviders = [mongoProvider];

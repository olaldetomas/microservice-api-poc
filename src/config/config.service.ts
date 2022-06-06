import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
import { DEFAULT_PORT, DEVELOPMENT, PRODUCTION } from '../constants';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(DEVELOPMENT, PRODUCTION)
        .default(DEVELOPMENT),
      PORT: Joi.number().default(DEFAULT_PORT),
      MONGODB_URI: Joi.string(),
    });

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    Logger.log(`Config loaded`);
    return validatedEnvConfig;
  }

  get port(): number {
    return parseInt(this.envConfig.PORT, 10);
  }

  get mongoDbUri(): string {
    return this.envConfig.MONGODB_URI;
  }

  get ormConfig(): object {
    return {
      type: 'postgres',
      host: '127.0.0.1',
      port: '5432',
      username: 'postgres',
      password: 'postgres',
      database: 'target',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}

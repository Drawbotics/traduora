import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as process from 'process';

const env = process.env;

const getBoolOrDefault = (value: string, defaultValue: boolean) => (value ? value === 'true' : defaultValue);

export const config = {
  env: env.NODE_ENV || 'dev',
  port: parseInt(env.PORT, 10) || 8080,
  secret: env.TR_SECRET || 'secret',
  virtualHost: env.TR_VIRTUAL_HOST || 'http://localhost:8080',
  publicDir: env.TR_PUBLIC_DIR || join(__dirname, '../public'),
  templatesDir: env.TR_TEMPLATES_DIR || join(__dirname, '../src/templates'),
  corsEnabled: getBoolOrDefault(env.TR_CORS_ENABLED, false),
  accessLogsEnabled: getBoolOrDefault(env.TR_ACCESS_LOGS_ENABLED, true),
  authTokenExpires: parseInt(env.TR_AUTH_TOKEN_EXPIRES, 10) || 86400,
  signupsEnabled: getBoolOrDefault(env.TR_SIGNUPS_ENABLED, true),
  maxProjectsPerUser: parseInt(env.TR_MAX_PROJECTS_PER_USER, 10) || 100,
  defaultProjectPlan: env.TR_DEFAULT_PROJECT_PLAN || 'open-source',
  autoMigrate: getBoolOrDefault(env.TR_DB_AUTOMIGRATE, true),
  mail: {
    debug: getBoolOrDefault(env.TR_MAIL_DEBUG, false),
    sender: env.TR_MAIL_SENDER || 'no-reply@localhost.com',
    host: env.TR_MAIL_HOST || 'smtp.ethereal.email',
    port: parseInt(env.TR_MAIL_PORT, 10) || 587,
    secure: getBoolOrDefault(env.TR_MAIL_SECURE, false),
    auth: {
      user: env.TR_MAIL_USER || 'l4kzu3nw7o4x45wz@ethereal.email',
      pass: env.TR_MAIL_PASSWORD || '3mJgh1g9dpMf3uZaBM',
    },
  },
  db: {
    default: {
      type: 'mysql',
      host: env.TR_DB_HOST || '127.0.0.1',
      port: parseInt(env.TR_DB_PORT, 10) || 3306,
      username: env.TR_DB_USER || 'root',
      password: env.TR_DB_PASSWORD || '',
      database: env.TR_DB_DATABASE || 'tr_dev',
      charset: 'utf8mb4',
      synchronize: false,
      logging: false,
      entities: ['src/entity/*.entity*'],
      migrations: ['src/migrations/*'],
    } as TypeOrmModuleOptions,
  },
};

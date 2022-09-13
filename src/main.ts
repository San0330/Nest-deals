import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeormStore } from "connect-typeorm";
import * as session from 'express-session';
import * as passport from 'passport'
import { SessionEntity } from './typeorm';
import { getRepository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(SessionEntity);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // remove properties without any decorator in the validation class
  }));

  app.use(session({
    name: 'NEST-DEALS-SESSID',
    secret: 'A-SECRET-KEY',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
    store: new TypeormStore({
      cleanupLimit: 2,
      limitSubquery: false,
      ttl: 86400,
    }).connect(sessionRepository),
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000);
}
bootstrap();

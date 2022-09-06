import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000);
}
bootstrap();

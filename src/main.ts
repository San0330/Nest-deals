import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeormStore } from 'connect-typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionEntity } from './typeorm';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
    });

    const sessionRepository = app
        .get(AppModule)
        .getDataSource()
        .getRepository(SessionEntity);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove properties without any decorator in the validation class
        }),
    );

    app.enableCors({
        "origin": "http://localhost:3000",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "allowedHeaders": ['Content-Type', 'Authorization'],
        "credentials": true,
    });

    app.use(cookieParser())

    app.use(
        session({
            name: 'NEST-DEALS-SESSID',
            secret: 'A-SECRET-KEY',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 1000,
            },
            store: new TypeormStore({
                cleanupLimit: 2,
                limitSubquery: false,
                ttl: 86400,
            }).connect(sessionRepository),
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.setGlobalPrefix('api')

    await app.listen(3001);
}
bootstrap();

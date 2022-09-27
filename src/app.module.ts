import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities,
            synchronize: true,
        }),
        PassportModule.register({
            session: true,
        }),
        UsersModule,
        AuthModule,
        ProductModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    constructor(private dataSource: DataSource) { }

    getDataSource() {
        return this.dataSource;
    }
}

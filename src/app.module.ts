import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'san',
            password: 'password',
            database: 'nest_deals',
            entities,
            synchronize: true,
        }),
        PassportModule.register({
            session: true,
        }),
        AuthModule,
        ProductModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}

    getDataSource() {
        return this.dataSource;
    }
}

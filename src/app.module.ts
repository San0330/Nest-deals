import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'san',
      password: 'password',
      database: 'nest_deals',
      entities,
      synchronize: true,      
    })
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }

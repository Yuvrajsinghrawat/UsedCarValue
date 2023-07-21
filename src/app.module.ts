import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: `.env.${process.env.NODE_ENV}`,
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: 'hendersontestdevdb.cluster-cqcvjq64ncab.ap-south-1.rds.amazonaws.com',
    //       port: 5432,
    //       username: 'postgres',
    //       password: 'gKz2U5kdZYYg7STQJq4v',
    //       database: config.get<string>('DB_NAME'),
    //       entities: [User, Report],
    //       synchronize: true,
    //     };
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'rds.dev.thehendersonhk.com',
      port: 5432,
      username: 'root',
      password: '1qaz2wsx',
      database: 'hendersontestdevdb',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

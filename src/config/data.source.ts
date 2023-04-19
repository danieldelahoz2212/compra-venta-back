import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();
ConfigModule.forRoot({
    envFilePath: '.env'
})

const configService= new ConfigService();

export const DatasourceConfig: DataSourceOptions ={
    type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DATABESE_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,//false,
    //   autoLoadEntities: true,
      migrationsRun:true,
      logging:false,
      entities: [__dirname+'/../**/**/entities/*.entity.ts}'],
      migrations: [__dirname+'/../**/**/*.migrations{.ts,.js}'],
      //namingStrategy: new SnakeNamingStrategy(),
};

export const AppDs = new DataSource(DatasourceConfig);
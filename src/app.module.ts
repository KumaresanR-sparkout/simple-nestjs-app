import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { MONGODBURL, mongooseOptions } from "../configs/mongoose_config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(MONGODBURL, mongooseOptions),
    AdminModule
  ],
  controllers: [AppController],
  providers: [],
})


export class AppModule { }

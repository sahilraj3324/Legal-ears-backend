import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // env config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ DB connection module
    DatabaseModule,

    // Profile module
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

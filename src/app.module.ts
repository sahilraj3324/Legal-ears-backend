import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';

@Module({
  imports: [
        // env config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ DB connection module
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

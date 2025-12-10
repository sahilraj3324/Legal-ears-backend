import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupMongoListeners } from './Database/mongo.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupMongoListeners();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

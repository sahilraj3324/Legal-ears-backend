import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule, // uses global config

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const logger = new Logger('MongoDB');
                const uri = configService.get<string>('MONGO_URI');

                if (!uri) {
                    logger.error('❌ MONGO_URI is missing from environment');
                    throw new Error('MONGO_URI is missing');
                }

                logger.log('🔌 Connecting to MongoDB...');
                return {
                    uri,
                    connectionFactory: (connection) => {
                        logger.log('✅ MongoDB connected successfully');
                        return connection;
                    },
                };
            },
        }),
    ],
})
export class DatabaseModule { }

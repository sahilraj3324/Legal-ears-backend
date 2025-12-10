import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

export const setupMongoListeners = () => {
  const logger = new Logger('MongoDB');

  mongoose.connection.on('connected', () => {
    logger.log('✅ MongoDB connection established');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('❌ MongoDB connection error', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('⚠️ MongoDB disconnected');
  });
};

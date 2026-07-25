import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingModule } from './modules/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost:27017/billing_logs',
    ),
    BillingModule,
  ],
})
export class AppModule {}

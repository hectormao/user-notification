import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserConsumerService } from './user-consumer/user-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'createUserQ',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserConsumerService],
})
export class AppModule {}

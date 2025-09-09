import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagModule } from 'src/hashtag/hashtag.module';
import { UsersModule } from '../users/users.module';
import { TweetController } from './tweet.controller';
import { Tweet } from './tweet.entity';
import { TweetService } from './tweet.service';
import { PaginationModule } from 'src/common/pagination.module';
@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [PaginationModule,UsersModule, HashtagModule, TypeOrmModule.forFeature([Tweet])],
})
export class TweetModule {}

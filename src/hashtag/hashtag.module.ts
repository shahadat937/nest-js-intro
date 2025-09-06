import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagController } from './hashtag.controller';
import { Hashtag } from './hashtag.entity';
import { HashtagService } from './hashtag.service';
@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
  imports: [TypeOrmModule.forFeature([Hashtag])],
})
export class HashtagModule {}

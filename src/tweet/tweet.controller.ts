import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  Query
} from '@nestjs/common';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { TweetService } from './tweet.service';
import { UpdateTweetDTO } from './dtos/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get(':userid')
  public GetTweets
  (
    @Param('userid', ParseIntPipe) userid?: number,
    @Query() paginationQueryDto?: PaginationQueryDto
  ) {
    console.log(paginationQueryDto);
    return this.tweetService.getTweets(userid);
  }

  @Post()
  public CreateTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.CreateTweet(tweet);
  }
  @Patch()
  public UpdateTweet(@Body() tweet: UpdateTweetDTO){
        this.tweetService.updateTweet(tweet);
    }
    @Delete(':id')
    public DeleteTweet(@Param('id', ParseIntPipe) id: number){
        return this.tweetService.deleteTweet(id);
    }
}

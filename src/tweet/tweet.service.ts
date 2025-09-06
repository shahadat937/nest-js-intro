import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { Tweet } from './tweet.entity';
@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async CreateTweet(createTweetDto: CreateTweetDto) {
    //Find user with the given userid from user table
    let user = await this.userService.FindUserById(createTweetDto.userId);
    //Fetch all the hastags based on hastag array
    let hashtags = await this.hashtagService.findHashtags(
      createTweetDto.hashtags ?? [],
    );

    //Create a tweet
    let tweet = await this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });

    //Save the tweet
    return await this.tweetRepository.save(tweet);
  }
  public async getTweets(userId?: number) {
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });
  }
}

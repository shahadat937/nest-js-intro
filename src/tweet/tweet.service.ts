import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { Tweet } from './tweet.entity';
@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async CreateTweet(createTweetDto: CreateTweetDto) {
    //Find user with the given userid from user table
    let user = await this.userService.FindUserById(createTweetDto.userId);
    //Create a tweet
    let tweet = await this.tweetRepository.create({ ...createTweetDto, user });

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

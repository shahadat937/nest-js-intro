import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { Tweet } from './tweet.entity';
import { UpdateTweetDTO } from './dtos/update-tweet.dto';
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
      const user = await this.userService.FindUserById(userId);

        if(!user){
            throw new NotFoundException(`User with userId ${userId} is not found!`);
        }
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });
  }
   public async updateTweet(updateTweetDto: UpdateTweetDTO){
         //Find all hashtags
        let hashtags = await this.hashtagService.findHashtags(updateTweetDto.hashtags ?? []);
          //Find the tweet by Id
        let tweet = await this.tweetRepository.findOneBy({id: updateTweetDto.id});
  //Update properties of the tweet
      tweet!.text = updateTweetDto.text ?? tweet!.text;
      tweet!.image = updateTweetDto.image ?? tweet!.image;
      tweet!.hashtags = hashtags;
        //Save the tweet
        return await this.tweetRepository.save(tweet!);
   }

   public async deleteTweet(id: number){
        await this.tweetRepository.delete({
            id
        })

        return { deleted: true, id}
    }
}

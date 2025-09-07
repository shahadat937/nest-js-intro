import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';
import { Hashtag } from './hashtag.entity';
@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    let hashtag = this.hashtagRepository.create(createHashtagDto);

    return await this.hashtagRepository.save(hashtag);
  }

  public async findHashtags(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: { id: In(hashtags) },
    });
  }
   public async deleteHashtag(id: number){
        await this.hashtagRepository.delete({id: id});
        return {deleted: true, id }
    }
    public async softDeleteHashtag(id: number){
        await this.hashtagRepository.softDelete({id: id});
        return {deleted: true, id }
    }
}

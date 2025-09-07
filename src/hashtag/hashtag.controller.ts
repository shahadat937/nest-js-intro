import { Body, Controller, Post,Delete,ParseIntPipe,Param } from '@nestjs/common';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';
import { HashtagService } from './hashtag.service';
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}
  @Post()
  public CreateNewHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createHashtagDto);
  }
     @Delete(':id')
    public deleteHashtag(@Param('id', ParseIntPipe) id: number){
        return this.hashtagService.deleteHashtag(id);
    }
    @Delete('soft-delete/:id')
    public softDeleteHashtag(@Param('id', ParseIntPipe) id: number){
        return this.hashtagService.softDeleteHashtag(id);
    }
}

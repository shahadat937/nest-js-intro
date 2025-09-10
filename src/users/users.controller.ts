import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
 @Get() 
   getUsers(@Query() pageQueryDto: PaginationQueryDto)
   {
     return this.usersService.getAllUsers(pageQueryDto);
   }
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.deleteUser(id);
  }
}

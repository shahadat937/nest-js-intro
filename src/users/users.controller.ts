import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userservice: UsersService) {}
  @Get()
  getUsers() {
    return this.userservice.getAllUsers();
  }
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userservice.createUser(user);
  }
}

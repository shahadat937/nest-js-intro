import { Body, Controller, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Validator } from 'class-validator';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private  usersService: UsersService){
    }
   @Get() 
   getUsersAll()
   {
     return this.usersService.getUsers();
   }
   @Get(':isMarried') 
   getUsers(@Param() user:GetUserParamDto)
   {
    console.log(user);
     return this.usersService.getUsers();
   }
 @Post()
   createUser(@Body() user: CreateUserDto){
    return "User created successfully";
   }
@Patch()
 updateUser(@Body() user: UpdateUserDto){
    console.log(user);
    return "User created successfully";
   }
}

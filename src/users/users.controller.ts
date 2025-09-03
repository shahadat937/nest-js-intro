import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    @Get()
    getUsers(){
     const userService = new UsersService();
     return userService.getUsers();
    }
    @Post()
    createUser(){
        const userService = new UsersService();
        const user = {name: "John", age: 30, gender: "male", isMarried: true};
        return userService.createUser(user);
    }
}

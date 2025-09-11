import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor( 
    
        private readonly userService: UsersService,) {}

  login(email: string, pswd: string) {}
     public async signup(createUserDto: CreateUserDto){
        return await this.userService.createUser(createUserDto);
    }
}

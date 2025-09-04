import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
      @Inject(forwardRef(() => UsersService))      
      private userService:UsersService,

    ){

    }
    isAuthenticated: Boolean = false;

    login(email: string, pswd: string){
        const user = this.userService.users.find(user => user.email === email && user.password === pswd);
        if(user){
            this.isAuthenticated = true;
            return 'Login Successful!';
        }
        return 'User does not exist!';
    }
}

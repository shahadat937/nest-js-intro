import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))   
    private readonly authService:AuthService
  ){

  }
  users: {id:number,name:string,email:string,gender:string,isMarried:boolean,password:String}[] = [
    {id: 1, name: "John", email: "john@gmail.com", gender: "male", isMarried: true,password:'test123'},
    {id: 2, name: "Jane", email: "john1@gmail.com", gender: "female", isMarried: false,password:'test123'},
    {id: 3, name: "Doe", email: "john12@gmail.com", gender: "non-binary", isMarried: true,password:'test123'}
  ];

  getUsers() {
    if(this.authService.isAuthenticated){
   return this.users;
    }
     return "not login yet"
 
  }
  getUserByName(name: string) {
    return this.users.find(user => user.name === name);
  }
  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
  createUser(user: {name: string, email: string, gender: string, isMarried: boolean,password:string}) {
    const newUser = {
      id: this.users.length + 1,
      ...user 
    };
    this.users.push(newUser);
    return newUser;
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
    constructor(private usersService:UsersService){

    }
    tweets: { text: string; date: Date; userId: number }[] = [
  {
    text: "Excited to start learning NestJS today! 🚀",
    date: new Date("2025-09-01T10:15:00"),
    userId: 1,
  },
  {
    text: "Coffee + coding = perfect morning ☕💻",
    date: new Date("2025-09-02T08:45:00"),
    userId: 2,
  },
  {
    text: "Just deployed my first Angular app 🎉",
    date: new Date("2025-09-02T14:30:00"),
    userId: 1,
  },
  {
    text: "Debugging is like being a detective in a crime movie 🔍",
    date: new Date("2025-09-03T19:20:00"),
    userId: 3,
  },
  {
    text: "Working on a new project using .NET 8 Web API 💡",
    date: new Date("2025-09-04T12:00:00"),
    userId: 4,
  },
  {
    text: "When in doubt, console.log everything 😅",
    date: new Date("2025-09-04T16:45:00"),
    userId: 2,
  },
];
getTwees(userId:number){
   const user= this.usersService.getUserById(userId)
    const tweets= this.tweets.filter(tweet=>tweet.userId===userId);
        return tweets.map(t=>({text:t.text,date:t.date, name:user?.name}))
        
}

}


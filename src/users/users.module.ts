import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 MISSING in your code
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // (optional, only if other modules need UsersService)
})
export class UsersModule {}

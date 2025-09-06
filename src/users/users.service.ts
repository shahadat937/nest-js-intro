import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  public async createUser(userDto: CreateUserDto) {
    //Create a Profile & Save
    userDto.profile = userDto.profile ?? {};
    //Create User Object
    let user = this.userRepository.create(userDto);
    //Save the user object
    return await this.userRepository.save(user);
  }
  public async deleteUser(id: number) {
    //Delete user
    await this.userRepository.delete(id);

    //Send a response
    return { deleted: true };
  }
  public async FindUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}

import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { ConfigService } from "@nestjs/config";
import { UserAlreadyExistsException } from 'src/CustomExceptions/user-already-exists.exception';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/paginater.interface';
import { PaginationProvider } from 'src/common/pagination.provider';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
      private readonly configService: ConfigService,
       private readonly paginationProvider: PaginationProvider
  ) {}

    public async getAllUsers(paginationQueryDto: PaginationQueryDto): Promise<Paginated<User>> {
        try {
            return await this.paginationProvider.paginateQuery(
                paginationQueryDto,
                this.userRepository,
                undefined,
                ['profile']
            )
        } catch (error) {
            if(error.code === 'ECONNREFUSED'){
                throw new RequestTimeoutException('An error has occured. please try again later', {
                    description: 'Could not connect to the database.'
                })
            }
            console.log(error);
            throw error;
        }
    }

  public async createUser(userDto: CreateUserDto) {
   try {
            //Create a Profile & Save
            userDto.profile = userDto.profile ?? {};

            //CHeck if user with same username / email already exists
            const existingUserWithUsername = await this.userRepository.findOne({
                where: {username: userDto.username}
            })

            if(existingUserWithUsername){
                throw new UserAlreadyExistsException('username', userDto.username);
            }

            const existingUserWithEmail = await this.userRepository.findOne({
                where: {email: userDto.email}
            })

            if(existingUserWithEmail){
                throw new UserAlreadyExistsException('email', userDto.email);
            }

            //Create User Object
            let user = this.userRepository.create(userDto);

            //Save the user object
            return await this.userRepository.save(user);

        } catch (error) {
            if(error.code === 'ECONNREFUSED'){
                throw new RequestTimeoutException('An error has occured. please try again later', {
                    description: 'Could not connect to the database.'
                })
            }
            // if(error.code === '23505'){
            //     throw new BadRequestException('There is some dulicate value for the user in Database');
            // }
            throw error;
        }
  }
  public async deleteUser(id: number) {
    //Delete user
    await this.userRepository.delete(id);

    //Send a response
    return { deleted: true };
  }
  public async FindUserById(id?: number) {
    return await this.userRepository.findOneBy({ id });
  }
}

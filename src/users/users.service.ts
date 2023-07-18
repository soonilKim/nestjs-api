import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create0user.dto';

@Injectable()
export class UsersService {
  private users: any[] = [];

  async findByUser(user: string): Promise<any> {
    const userCheck = this.users.find((user) => user.user === user);
    return userCheck;
  }

  async findByUserAndPassword(user: string, password: string): Promise<any> {
    const userCheck = this.users.find(
      (users) => users.user === user && users.password === password,
    );
    return userCheck;
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    this.users.push(createUserDto);
  }

  async getUserList(): Promise<any[]> {
    return this.users;
  }
  // 실제 데이터베이스와 연동하는 경우 createUser, updateUser 등의 메서드를 구현해야 합니다.
}

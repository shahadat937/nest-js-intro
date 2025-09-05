import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  login(email: string, pswd: string) {}
}

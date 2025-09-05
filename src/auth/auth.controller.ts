import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}
  @Post()
  login(@Body() user: { email: string; password: string }) {}
}

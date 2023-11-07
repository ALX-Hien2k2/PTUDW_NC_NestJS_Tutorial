import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto, SignInDto, SignUpDto } from './dto';
import { JwtGuard, JwtRefreshGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req, @Body() dto: RefreshDto) {
    return await this.authService.refresh(req.user.sub, dto.refreshToken);
  }

  @UseGuards(JwtGuard)
  @Delete('sign-out')
  async signOut(@Req() req) {
    return await this.authService.logout(req.user.sub);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { AddFilmDto, GetFilmDto, UpdateFilmDto } from './dto';
import { SecretTokenGuard } from 'src/auth/guard/secret-token.guard';

@Controller('films')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @UseGuards(SecretTokenGuard)
  @Get()
  getFilm(@Query() params: GetFilmDto) {
    return this.filmService.getFilm(params);
  }

  @Get(':id')
  getFilmById(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.getFilmById(id);
  }

  @Post()
  createFilm(@Body() dto: AddFilmDto) {
    return this.filmService.addFilm(dto);
  }

  @Patch(':id')
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFilmDto,
  ) {
    return this.filmService.updateFilm(id, dto);
  }

  @Delete(':id')
  deleteFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.deleteFilm(id);
  }
}

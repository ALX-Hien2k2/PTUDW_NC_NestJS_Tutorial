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
} from '@nestjs/common';
import { FilmService } from './film.service';
import { AddFilmDto, GetFilmDto, UpdateFilmDto } from './dto';

@Controller('films')
export class FilmController {
  constructor(private filmService: FilmService) {}

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

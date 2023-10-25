import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FilmService } from './film.service';
import { GetFilmDto } from './dto/get_film.dto';

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
}

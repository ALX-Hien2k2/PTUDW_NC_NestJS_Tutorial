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
import { GetFilmDto } from './dto/get_film.dto';
// import { AddActorDto, EditActorDto } from './dto';

@Controller('films')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get()
  getFilm(@Query() params: GetFilmDto) {
    return this.filmService.getFilm(params);
  }
}

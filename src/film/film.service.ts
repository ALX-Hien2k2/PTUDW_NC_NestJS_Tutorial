import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetFilmDto } from './dto/get_film.dto';

@Injectable()
export class FilmService {
  constructor(private prisma: PrismaService) {}

  async getFilm(data: GetFilmDto) {
    const result = await this.prisma.film.findMany({
      take: data.limit,
    });

    return result;
  }
}


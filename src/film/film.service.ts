import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getFilmById(id: number) {
    try {
      const result = await this.prisma.film.findUnique({
        where: {
          film_id: id,
        },
      });

      // Check if actor is found
      if (!result) {
        throw new NotFoundException('Film not found!');
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddFilmDto, GetFilmDto, UpdateFilmDto } from './dto';

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

  async addFilm(dto: AddFilmDto) {
    try {
      const newFilm = await this.prisma.film.create({
        data: {
          title: dto.title,
          description: dto.description,
          release_year: dto.releaseYear,
          language_id: dto.languageId,
          rental_duration: dto.rentalDuration,
          rental_rate: dto.rentalRate,
          length: dto.length,
          replacement_cost: dto.replacementCost,
          rating: dto.rating,
          special_features: dto.specialFeatures,
        },
      });

      if (!newFilm) {
        console.log('Failed to add new Actor!');
        throw new ForbiddenException('Failed to add new Film!');
      }

      return newFilm;
    } catch (err) {
      throw new ForbiddenException('Something went wrong!');
    }
  }

  async updateFilm(id: number, dto: UpdateFilmDto) {
    try {
      const updatedFilm = await this.prisma.film.update({
        where: {
          film_id: id,
        },
        data: {
          title: dto.title,
          description: dto.description,
          release_year: dto.releaseYear,
          language_id: dto.languageId,
          rental_duration: dto.rentalDuration,
          rental_rate: dto.rentalRate,
          length: dto.length,
          replacement_cost: dto.replacementCost,
          rating: dto.rating,
          special_features: dto.specialFeatures,
        },
      });

      if (!updatedFilm) {
        return {
          message: 'Failed to update actor!',
        };
      }

      return updatedFilm;
    } catch (err) {
      throw err;
    }
  }

  async deleteFilm(id: number) {
    try {
      // Check if film exists
      const film = await this.prisma.film.findUnique({
        where: {
          film_id: id,
        },
      });

      // If film is not found, return not found message
      if (!film) {
        throw new NotFoundException('Film not found!');
      }

      // If found, delete film
      const deletedFilm = await this.prisma.film.delete({
        where: {
          film_id: id,
        },
      });

      return deletedFilm;
    } catch (err) {
      throw err;
    }
  }
}

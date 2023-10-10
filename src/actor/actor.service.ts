import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddActorDto, EditActorDto } from './dto';

@Injectable()
export class ActorService {
  constructor(private prisma: PrismaService) {}

  async getActorList() {
    try {
      // Get all actors
      const actorList = await this.prisma.actor.findMany();

      // Check if the list is empty
      if (actorList.length === 0) {
        return {
          message: 'List is empty!',
        };
      }

      return actorList;
    } catch (err) {
      throw err;
    }
  }

  async getActor(id: number) {
    try {
      // Find actor by id
      const actor = await this.prisma.actor.findUnique({
        where: {
          actor_id: id,
        },
      });

      // Check if actor is found
      if (!actor) {
        return {
          message: 'Actor not found!',
        };
      }

      return actor;
    } catch (err) {
      throw err;
    }
  }

  async addActor(dto: AddActorDto) {
    try {
      const newActor = await this.prisma.actor.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
        },
      });

      if (!newActor) {
        return {
          message: 'Failed to add new actor!',
        };
      }

      return newActor;
    } catch (err) {
      throw err;
    }
  }

  async updateActor(id: number, dto: EditActorDto) {
    try {
      // Check if actor exists
      const actor = await this.prisma.actor.findUnique({
        where: {
          actor_id: id,
        },
      });

      // If actor is not found, return not found message
      if (!actor) {
        return {
          message: 'Actor not found!',
        };
      }

      // If found, update actor
      const updatedActor = await this.prisma.actor.update({
        where: {
          actor_id: id,
        },
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
        },
      });

      if (!updatedActor) {
        return {
          message: 'Failed to update actor!',
        };
      }

      return updatedActor;
    } catch (err) {
      throw err;
    }
  }

  async deleteActor(id: number) {
    try {
      // Check if actor exists
      const actor = await this.prisma.actor.findUnique({
        where: {
          actor_id: id,
        },
      });

      // If actor is not found, return not found message
      if (!actor) {
        return {
          message: 'Actor not found!',
        };
      }

      // If found, delete actor
      const deletedActor = await this.prisma.actor.delete({
        where: {
          actor_id: id,
        },
      });

      return deletedActor;
    } catch (err) {
      throw err;
    }
  }
}

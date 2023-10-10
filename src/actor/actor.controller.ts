import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { AddActorDto, EditActorDto } from './dto';

@Controller('actor')
export class ActorController {
  constructor(private actorService: ActorService) {}

  @Get()
  async getActorList() {
    return await this.actorService.getActorList();
  }

  @Get(':id')
  async getActor(@Param('id', ParseIntPipe) id: number) {
    return await this.actorService.getActor(id);
  }

  @Post()
  async addActor(@Body() dto: AddActorDto) {
    return await this.actorService.addActor(dto);
  }

  @Patch(':id')
  async updateActor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditActorDto,
  ) {
    return await this.actorService.updateActor(id, dto);
  }

  @Delete(':id')
  async deleteActor(@Param('id', ParseIntPipe) id: number) {
    return await this.actorService.deleteActor(id);
  }
}

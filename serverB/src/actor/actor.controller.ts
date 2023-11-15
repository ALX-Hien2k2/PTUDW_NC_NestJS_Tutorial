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

@Controller('actors')
export class ActorController {
  constructor(private actorService: ActorService) {}

  // @UseGuards(JwtGuard)
  @Get()
  // @HttpCode(HttpStatus.OK)
  async getActorList() {
    return await this.actorService.getActorList();
  }

  @Get(':id')
  // @HttpCode(HttpStatus.OK)
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

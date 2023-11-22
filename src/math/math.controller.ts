import { Body, Controller, Post } from '@nestjs/common';
import { MathService } from './math.service';
import { Sum2IntReq } from 'src/proto/math.pb';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}
  @Post()
  async sum2Int(@Body() data: Sum2IntReq) {
    return this.mathService.sum(data);
  }
}

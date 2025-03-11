import { Body, Controller, DefaultValuePipe, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from 'src/is-positive/is-positive.pipe';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService, private configService: ConfigService) { }

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number,
  ) {
    console.log({ sort })
    return this.episodesService.findAll(sort)
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured()
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    console.log({ id })

    const episode = await this.episodesService.findOne(id)

    if (!episode) {
      throw new HttpException('Episode not found', HttpStatus.NOT_FOUND)
    }

    return episode
  }

  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    console.log({ input })
    return this.episodesService.create(input)
  }
}

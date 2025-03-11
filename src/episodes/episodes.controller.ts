import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService, private configService: ConfigService) { }

  @Get()
  findAll(@Query() sort: 'asc' | 'desc' = 'desc') {
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
  create(@Body() input: CreateEpisodeDto) {
    console.log({ input })
    return this.episodesService.create(input)
  }
}

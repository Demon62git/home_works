import { Controller, Get, Query } from '@nestjs/common';
import { GitApiService } from './gitApi.service';

@Controller('git')
export class GitApiController {
  constructor(private gitApiService: GitApiService) {}

  @Get('hub')
  async gethub(@Query('q') query: string, @Query('i') items: number) {
    return await this.gitApiService.getGithub(query, items);
  }

  @Get('lab')
  async getlab(@Query('q') query: string, @Query('i') items: number) {
    return await this.gitApiService.getGitlab(query, items);
  }
}

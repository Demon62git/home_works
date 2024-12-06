import { Module } from '@nestjs/common';
import { GitApiService } from './gitApi.service';
import { GitApiController } from './gitApi.controller';

@Module({
  imports: [],
  controllers: [GitApiController],
  providers: [GitApiService],
  exports: [GitApiService],
})
export class GitApiModule {}

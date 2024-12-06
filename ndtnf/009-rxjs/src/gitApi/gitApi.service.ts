import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, catchError, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GitApiService {
  private httpService = new HttpService();

  async getGithub(param: string, items: number = 1) {
    return firstValueFrom(
      this.httpService
        .get(`https://api.github.com/search/repositories?q=${param}`)
        .pipe(
          map((res) => res.data.items.slice(0, items)),

          catchError((error) => of({ error: `Ошибка: ${error.message}` })),
        ),
    );
  }

  async getGitlab(param: string, items: number = 1) {
    return firstValueFrom(
      this.httpService
        .get(`https://gitlab.com/api/v4/projects?search=${param}`)
        .pipe(
          map((res) => res.data.slice(0, items)),

          catchError((error) => of({ error: `Ошибка: ${error.message}` })),
        ),
    );
  }
}

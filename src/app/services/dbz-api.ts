import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbzInfo, DbzResponse } from '../models/dbz';

@Injectable({ providedIn: 'root' })
export class DbzApi {
  private http = inject(HttpClient);
  private url = 'https://dragonball-api.com/api/characters';

  getPage(page: number, limit: number) {
    return this.http.get<DbzResponse>(this.url, { params: { page, limit } });
  }

  getById(id: number | string) {
    return this.http.get<DbzInfo>(`${this.url}/${id}`);
  }
}
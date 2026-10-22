import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DemonSlayerDetailResponse, DemonSlayerResponse } from '../models/demon-slayer';

@Injectable({ providedIn: 'root' })
export class DemonSlayerApi {
  private http = inject(HttpClient);
  private url = 'https://www.demonslayer-api.com/api/v1/characters';

  getPage(page: number, limit: number) {
    return this.http.get<DemonSlayerResponse>(this.url, { params: { page, limit } });
  }

  // La API devuelve una lista con un solo personaje: nos quedamos con el primero
  getById(id: number | string) {
    return this.http
      .get<DemonSlayerDetailResponse>(this.url, { params: { id } })
      .pipe(map((res) => res.content[0] ?? null));
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DigimonInfo, DigimonResponse } from '../models/digimon';

@Injectable({ providedIn: 'root' })
export class DigimonApi {
  private http = inject(HttpClient);
  private url = 'https://digi-api.com/api/v1/digimon';

  getPage(page: number, pageSize: number) {
    return this.http.get<DigimonResponse>(this.url, { params: { page, pageSize } });
  }

  getById(id: number | string) {
    return this.http.get<DigimonInfo>(`${this.url}/${id}`);
  }
}
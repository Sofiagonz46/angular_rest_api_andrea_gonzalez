import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PokemonInfo, PokemonListResponse, PokemonSummary } from '../models/pokemon';

// "special-attack" -> "Special Attack"
export function formatName(text: string): string {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

@Injectable({ providedIn: 'root' })
export class PokemonApi {
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/pokemon';

  getPage(pageIndex: number, pageSize: number) {
    return this.http
      .get<PokemonListResponse>(this.url, {
        params: { limit: pageSize, offset: pageIndex * pageSize },
      })
      .pipe(
        map((res) => ({
          total: res.count,
          items: res.results.map((r): PokemonSummary => {
            const id = this.idFromUrl(r.url);
            return { id, name: formatName(r.name), image: this.artwork(id) };
          }),
        })),
      );
  }

  getById(id: number | string) {
    return this.http.get<PokemonInfo>(`${this.url}/${id}`);
  }

  // La URL termina así: https://pokeapi.co/api/v2/pokemon/25/
  private idFromUrl(url: string): number {
    const parts = url.split('/').filter((p) => p !== '');
    return Number(parts[parts.length - 1]);
  }

  private artwork(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
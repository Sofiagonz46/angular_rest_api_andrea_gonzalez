import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonApi, formatName } from '../../services/pokemon-api';
import { PokemonInfo } from '../../models/pokemon';
import { ImageDialog } from '../../shared/image-dialog/image-dialog';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss',
})
export class PokemonDetail {
  id = input<string>();

  private api = inject(PokemonApi);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  pokemon = signal<PokemonInfo | null>(null);
  loading = signal(true);

  name = computed(() => formatName(this.pokemon()?.name ?? ''));

  imageUrl = computed(() => {
    const p = this.pokemon();
    return p?.sprites.other?.['official-artwork']?.front_default ?? p?.sprites.front_default ?? undefined;
  });

  facts = computed(() => {
    const p = this.pokemon();
    if (!p) {
      return [];
    }
    return [
      { label: 'Altura', value: `${p.height / 10} m` },
      { label: 'Peso', value: `${p.weight / 10} kg` },
      { label: 'Experiencia base', value: p.base_experience === null ? '' : String(p.base_experience) },
      { label: 'Movimientos', value: p.moves.length > 0 ? String(p.moves.length) : '' },
    ].filter((f) => f.value);
  });

  types = computed(() => (this.pokemon()?.types ?? []).map((t) => formatName(t.type.name)));

  abilities = computed(() =>
    (this.pokemon()?.abilities ?? []).map((a) => ({
      name: formatName(a.ability.name),
      hidden: a.is_hidden,
    })),
  );

  // 255 es el valor máximo posible de una estadística base
  stats = computed(() =>
    (this.pokemon()?.stats ?? []).map((s) => ({
      name: formatName(s.stat.name),
      value: s.base_stat,
      percent: Math.min(100, Math.round((s.base_stat / 255) * 100)),
    })),
  );

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.load(id);
      }
    });
  }

  load(id: string): void {
    this.loading.set(true);
    this.api.getById(id).subscribe({
      next: (res) => {
        this.pokemon.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.pokemon.set(null);
        this.loading.set(false);
        this.snackBar.open('No se pudo cargar el Pokémon', 'Cerrar', { duration: 4000 });
      },
    });
  }

  openImage(src: string, name: string): void {
    this.dialog.open(ImageDialog, { data: { src, name }, maxWidth: '90vw' });
  }
}
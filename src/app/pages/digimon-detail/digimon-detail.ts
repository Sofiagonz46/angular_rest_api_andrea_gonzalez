import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DigimonApi } from '../../services/digimon-api';
import { DigimonInfo } from '../../models/digimon';
import { ImageDialog } from '../../shared/image-dialog/image-dialog';

@Component({
  selector: 'app-digimon-detail',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './digimon-detail.html',
  styleUrl: './digimon-detail.scss',
})
export class DigimonDetail {
  id = input<string>();

  private api = inject(DigimonApi);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  digimon = signal<DigimonInfo | null>(null);
  loading = signal(true);

  imageUrl = computed(() => this.digimon()?.images?.[0]?.href);

  description = computed(() => {
    const list = this.digimon()?.descriptions ?? [];
    return list.find((d) => d.language.startsWith('en'))?.description;
  });

  groups = computed(() => {
    const d = this.digimon();
    if (!d) {
      return [];
    }
    return [
      { title: 'Niveles', items: (d.levels ?? []).map((x) => x.level) },
      { title: 'Tipos', items: (d.types ?? []).map((x) => x.type) },
      { title: 'Atributos', items: (d.attributes ?? []).map((x) => x.attribute) },
      { title: 'Campos', items: (d.fields ?? []).map((x) => x.field) },
    ].filter((g) => g.items.length > 0);
  });

  evolutions = computed(() => {
    const d = this.digimon();
    if (!d) {
      return [];
    }
    return [
      { title: 'Evoluciona de', items: d.priorEvolutions ?? [] },
      { title: 'Evoluciona a', items: d.nextEvolutions ?? [] },
    ].filter((e) => e.items.length > 0);
  });

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
        this.digimon.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.digimon.set(null);
        this.loading.set(false);
        this.snackBar.open('No se pudo cargar el Digimon', 'Cerrar', { duration: 4000 });
      },
    });
  }

  openImage(src: string, name: string): void {
    this.dialog.open(ImageDialog, { data: { src, name }, maxWidth: '90vw' });
  }
}
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemonSlayerApi } from '../../services/demon-slayer-api';
import { DemonSlayerInfo } from '../../models/demon-slayer';
import { ImageDialog } from '../../shared/image-dialog/image-dialog';

@Component({
  selector: 'app-demon-slayer-detail',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './demon-slayer-detail.html',
  styleUrl: './demon-slayer-detail.scss',
})
export class DemonSlayerDetail {
  id = input<string>();

  private api = inject(DemonSlayerApi);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  character = signal<DemonSlayerInfo | null>(null);
  loading = signal(true);

  facts = computed(() => {
    const d = this.character();
    if (!d) {
      return [];
    }
    return [
      { label: 'Edad', value: d.age != null ? String(d.age) : '' },
      { label: 'Género', value: d.gender ?? '' },
      { label: 'Raza', value: d.race ?? '' },
    ].filter((f) => f.value);
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
        this.character.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.character.set(null);
        this.loading.set(false);
        this.snackBar.open('No se pudo cargar el personaje', 'Cerrar', { duration: 4000 });
      },
    });
  }

  openImage(src: string, name: string): void {
    this.dialog.open(ImageDialog, { data: { src, name }, maxWidth: '90vw' });
  }
}
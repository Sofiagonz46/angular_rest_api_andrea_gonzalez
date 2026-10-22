import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemonSlayerApi } from '../../services/demon-slayer-api';
import { DemonSlayerCharacter } from '../../models/demon-slayer';
import { CharacterCard } from '../../shared/character-card/character-card';
import { ImageDialog } from '../../shared/image-dialog/image-dialog';

@Component({
  selector: 'app-demon-slayer-list',
  imports: [MatPaginatorModule, MatProgressSpinnerModule, CharacterCard],
  templateUrl: './demon-slayer-list.html',
  styleUrl: './demon-slayer-list.scss',
})
export class DemonSlayerList implements OnInit {
  private api = inject(DemonSlayerApi);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  characters = signal<DemonSlayerCharacter[]>([]);
  total = signal(0);
  pageIndex = signal(0);
  pageSize = signal(12);
  loading = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    // La API empieza en la página 1; el paginador empieza en 0
    this.api.getPage(this.pageIndex() + 1, this.pageSize()).subscribe({
      next: (res) => {
        this.characters.set(res.content);
        this.total.set(res.pagination.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('No se pudieron cargar los personajes', 'Cerrar', { duration: 4000 });
      },
    });
  }

  onPage(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.load();
    window.scrollTo({ top: 0 });
  }

  openImage(character: DemonSlayerCharacter): void {
    this.dialog.open(ImageDialog, {
      data: { src: character.img, name: character.name },
      maxWidth: '90vw',
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/demon-slayer', id]);
  }
}
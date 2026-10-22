import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonApi } from '../../services/pokemon-api';
import { PokemonSummary } from '../../models/pokemon';
import { CharacterCard } from '../../shared/character-card/character-card';
import { ImageDialog } from '../../shared/image-dialog/image-dialog';

@Component({
  selector: 'app-pokemon-list',
  imports: [MatPaginatorModule, MatProgressSpinnerModule, CharacterCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  private api = inject(PokemonApi);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  pokemons = signal<PokemonSummary[]>([]);
  total = signal(0);
  pageIndex = signal(0);
  pageSize = signal(12);
  loading = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.api.getPage(this.pageIndex(), this.pageSize()).subscribe({
      next: (res) => {
        this.pokemons.set(res.items);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('No se pudieron cargar los Pokémon', 'Cerrar', { duration: 4000 });
      },
    });
  }

  onPage(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.load();
    window.scrollTo({ top: 0 });
  }

  openImage(pokemon: PokemonSummary): void {
    this.dialog.open(ImageDialog, {
      data: { src: pokemon.image, name: pokemon.name },
      maxWidth: '90vw',
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
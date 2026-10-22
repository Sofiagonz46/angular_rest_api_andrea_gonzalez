import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  theme = inject(Theme);

  links = [
    { label: 'Home', path: '/home' },
    { label: 'Digimon', path: '/digimon' },
    { label: 'Dragon Ball Z', path: '/dbz' },
    { label: 'Pokémon', path: '/pokemon' },
    { label: 'Demon Slayer', path: '/demon-slayer' },
  ];
}
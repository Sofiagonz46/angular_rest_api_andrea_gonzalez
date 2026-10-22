import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  universes = [
    {
      name: 'Digimon',
      path: '/digimon',
      image: 'images/digimon.png',
      description: 'Criaturas digitales que evolucionan y se alían con sus compañeros humanos.',
    },
    {
      name: 'Dragon Ball Z',
      path: '/dbz',
      image: 'images/dbz.png',
      description: 'Guerreros Saiyajin, transformaciones y batallas por proteger la Tierra.',
    },
    {
      name: 'Pokémon',
      path: '/pokemon',
      image: 'images/pokemon.png',
      description: 'Criaturas de todos los tipos que los entrenadores capturan y entrenan.',
    },
    {
      name: 'Demon Slayer',
      path: '/demon-slayer',
      image: 'images/demon-slayer.png',
      description: 'Cazadores de demonios y sus estilos de combate en el Japón de la era Taisho.',
    },
  ];
}
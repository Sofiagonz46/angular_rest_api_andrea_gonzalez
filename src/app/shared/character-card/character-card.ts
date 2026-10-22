import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-card',
  imports: [MatCardModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  id = input.required<number | string>();
  name = input.required<string>();
  image = input.required<string>();

  imageClick = output<void>();
  cardClick = output<void>();

  onImageClick(event: Event): void {
    event.stopPropagation();
    this.imageClick.emit();
  }
}
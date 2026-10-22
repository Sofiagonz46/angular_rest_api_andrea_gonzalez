import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ImageDialogData {
  src: string;
  name: string;
}

@Component({
  selector: 'app-image-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './image-dialog.html',
  styleUrl: './image-dialog.scss',
})
export class ImageDialog {
  data = inject<ImageDialogData>(MAT_DIALOG_DATA);
}
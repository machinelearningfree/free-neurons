import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [CommonModule, MatSnackBarModule],
})
export class SnackBarModule {}

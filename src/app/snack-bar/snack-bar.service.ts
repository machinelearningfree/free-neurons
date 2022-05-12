import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  open() {
    this.snackBar.openFromComponent(SnackBarComponent, { duration: 5000 });
  }
}

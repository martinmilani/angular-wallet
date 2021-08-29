import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}

  public openSnackBar(message: string, type: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type],
    });
  }
}

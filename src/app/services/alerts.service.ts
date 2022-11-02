import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../core/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) { }

  public popAlert(message: string, status: "good" | "warning" | "error"): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message, duration: this.seconds(8),
      panelClass: status
    })
  }

  public closeAlert() {
    this._snackBar.dismiss();
  }

  private seconds(seconds: number): number {
    return seconds * 1000;
  }

}

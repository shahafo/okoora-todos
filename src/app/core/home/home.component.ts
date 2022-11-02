import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AlertsService } from 'src/app/services/alerts.service';
import { loadUser } from '../state/core.actions';
import { allall } from '../state/core.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userNameInput: FormControl;

  constructor(private store: Store<AppState>, private _alerts: AlertsService) {
    this.userNameInput = new FormControl("", Validators.required);
   }

  ngOnInit(): void {
    this.store.select(allall).subscribe(data => {
      console.log(data);
    })
  }

  sendUsernameInput() {
    if (this.userNameInput.valid) {
      this.store.dispatch(loadUser({ username: this.userNameInput.value}));
      return;
    }
    this._alerts.popAlert("Username is required", "warning");
  }

}

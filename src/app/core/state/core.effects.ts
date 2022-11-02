import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UsersService } from 'src/app/services/users.service';
import * as coreActions from './core.actions';
import { getError, getUserInput } from './core.selectors';
import { IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private _userService: UsersService,
    private router: Router,
    private _alerts: AlertsService
  ) { }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActions.loadUser),
      withLatestFrom(this.store.select(getUserInput)),
      switchMap(([action, username]) => from(this._userService.getUser(username)).pipe(
        map((user: IUser) => {
          if (user) return coreActions.loadUserGood({ user: user });
          return coreActions.loadUserBad({ error: "User not found" });
        }),
        catchError((error) => of(coreActions.loadUserBad({ error: "Problem with loading user" })))
      )))
  );

  loadUserGood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActions.loadUserGood),
      tap(() => {
        this._alerts.popAlert("You are now logged in", "good");
        this.router.navigate(['/todos']);
      })
    ),
    { dispatch: false }
  );

  loadUserBad = createEffect(() =>
    this.actions$.pipe(
      ofType(coreActions.loadUserBad),
      withLatestFrom(this.store.select(getError)),
      tap(([action, error]) => this._alerts.popAlert(error, "warning"))
    ),
    { dispatch: false }
  )
}

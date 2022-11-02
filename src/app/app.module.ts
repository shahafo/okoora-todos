import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coreReducer } from './core/state/core.reducers';
import { todosReducer } from './todos/state/todos.reducers';
import { CoreEffects } from './core/state/core.effects';
import { TodosEffects } from './todos/state/todos.effects';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    MatDialogModule,
    StoreModule.forRoot({ core: coreReducer, todos: todosReducer }),
    EffectsModule.forRoot([CoreEffects, TodosEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

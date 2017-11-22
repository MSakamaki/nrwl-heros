import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HerosComponent } from './heros/heros.component';
import { Store } from '@ngrx/store';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


import { HeroListState } from '@nrwl-sample/hero-list/src/+state/hero-list.interfaces';
import { HeroListModule } from '@nrwl-sample/hero-list';

export const herosRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeroListModule,
    MatListModule,
    MatButtonModule
  ],
  declarations: [HerosComponent],
  exports: [HerosComponent]
})
export class HerosModule {
  constructor(private store: Store<HeroListState>) {
    this.store.dispatch({ type: 'LOAD_DATA' });
  }
}

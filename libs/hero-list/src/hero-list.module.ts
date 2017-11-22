import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { heroListReducer } from './+state/hero-list.reducer';
import { heroListInitialState } from './+state/hero-list.init';
import { HeroListEffects } from './+state/hero-list.effects';

import 'rxjs/add/operator/map';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('heroList', heroListReducer, { initialState: heroListInitialState }),
    EffectsModule.forFeature([HeroListEffects])
  ],
  providers: [HeroListEffects]
})
export class HeroListModule {}

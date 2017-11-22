import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { heroEditorReducer } from './+state/hero-editor.reducer';
import { heroEditorInitialState } from './+state/hero-editor.init';
import { HeroEditorEffects } from './+state/hero-editor.effects';
import { HeroListModule } from '@nrwl-sample/hero-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export const heroDetailRoutes: Route[] = [];

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    HeroListModule,
    StoreModule.forFeature('heroEditor', heroEditorReducer, { initialState: heroEditorInitialState }),
    EffectsModule.forFeature([HeroEditorEffects])
  ],
  declarations: [HeroDetailComponent],
  providers: [HeroEditorEffects],
  exports: [HeroDetailComponent]
})
export class HeroDetailModule {}

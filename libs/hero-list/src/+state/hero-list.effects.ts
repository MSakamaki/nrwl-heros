import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { HeroListState } from './hero-list.interfaces';
import { LoadData, DataLoaded, EditData, AddData, DeleteData } from './hero-list.actions';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroListEffects {

  @Effect()
  loadData = this.d.fetch('LOAD_DATA', {
    run: (a: LoadData, state: HeroListState) => {
      return this.http.get('api/users').map(heros => ({
        type: 'DATA_LOADED',
        payload: {
          heros: heros
        }
      }));
    },

    onError: (a: LoadData, error) => {
      console.error('Error', error);
    }
  });

  constructor(private http: HttpClient, private actions: Actions, private d: DataPersistence<HeroListState>) {}
}

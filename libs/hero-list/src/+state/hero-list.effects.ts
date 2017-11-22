import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { HeroListState } from './hero-list.interfaces';
import { LoadData, EditData, AddData, DeleteData } from './hero-list.actions';
import { HttpClient } from '@angular/common/http';

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

  @Effect()
  EditData = this.d.fetch('EDIT_DATA', {
    run: (a: EditData, state: HeroListState) => {
      return {
        type: 'DATA_EDITED',
        payload: {
          helo: a.payload.helo
        }
      };
    },

    onError: (a: EditData, error) => {
      console.error('Error', error);
    }
  });


  @Effect()
  AddData = this.d.fetch('ADD_DATA', {
    run: (a: AddData, state: HeroListState) => {
      return {
        type: 'DATA_ADDED',
        payload: {
          name: a.payload.name
        }
      };
    },

    onError: (a: AddData, error) => {
      console.error('Error', error);
    }
  });



  @Effect()
  DeleteData = this.d.fetch('DELETE_DATA', {
    run: (a: DeleteData, state: HeroListState) => {
      return {
        type: 'DATA_DELETED',
        payload: {
          id: a.payload.id
        }
      };
    },

    onError: (a: DeleteData, error) => {
      console.error('Error', error);
    }
  });


  constructor(private http: HttpClient, private actions: Actions, private d: DataPersistence<HeroListState>) {}
}

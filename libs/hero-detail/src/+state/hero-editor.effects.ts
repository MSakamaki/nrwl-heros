import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { HeroEditorState } from './hero-editor.interfaces';
import { EditStart, EditFinish } from './hero-editor.actions';
import { Store } from '@ngrx/store';
import { HeroListState } from '@nrwl-sample/hero-list/src/+state/hero-list.interfaces';

@Injectable()
export class HeroEditorEffects {

  @Effect()
  EditStart = this.d.fetch('EDIT_START', {
    run: (a: EditStart, state: HeroEditorState) => {
      return {
        type: 'EDITTING',
        payload: {
          id: state.heroEditor.id,
          name: state.heroEditor.name,
          editing: true,
          new: false,
        }
      };
    },

    onError: (a: EditStart, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  EditFinish = this.d.fetch('EDIT_FINISHD', {
    run: (a: EditFinish, state: HeroEditorState) => {

      this.heroList.dispatch({
        type: 'EDIT_DATA',
        payload: {
          helo: {
            id: state.heroEditor.id,
            name: a.payload.name,
          }
        }
      });

      return {
        type: 'COMPLITE',
        payload: {
          editing: false,
        }
      };
    },

    onError: (a: EditFinish, error) => {
      console.error('Error', error);
    }
  });


  @Effect()
  AddStart = this.d.fetch('ADD_START', {
    run: (a: EditStart, state: HeroEditorState) => {
      return {
        type: 'EDITTING',
        payload: {
          id: null,
          name: '',
          editing: true,
          new: true,
        }
      };
    },

    onError: (a: EditStart, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  AddFinish = this.d.fetch('ADD_FINISHD', {
    run: (a: EditFinish, state: HeroEditorState) => {

      // heroListにデータ追加をお願いする
      this.heroList.dispatch({
        type: 'ADD_DATA',
        payload: {
          name: a.payload.name,
        }
      });

      return {
        type: 'COMPLITE',
        payload: {
          editing: false,
        }
      };
    },

    onError: (a: EditFinish, error) => {
      console.error('Error', error);
    }
  });


  constructor(private actions: Actions, private d: DataPersistence<HeroEditorState>, private heroList: Store<HeroListState>) {}
}

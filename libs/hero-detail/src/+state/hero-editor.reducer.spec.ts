import { heroEditorReducer } from './hero-editor.reducer';
import { heroEditorInitialState } from './hero-editor.init';
import { HeroEditor } from './hero-editor.interfaces';
import { DataLoaded } from './hero-editor.actions';

describe('heroEditorReducer', () => {
  it('should work', () => {
    const state: HeroEditor = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = heroEditorReducer(state, action);
    expect(actual).toEqual({});
  });
});

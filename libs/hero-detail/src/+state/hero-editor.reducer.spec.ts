import { heroEditorReducer } from './hero-editor.reducer';
import { heroEditorInitialState } from './hero-editor.init';
import { HeroEditor } from './hero-editor.interfaces';
import { EditStart } from './hero-editor.actions';

describe('heroEditorReducer', () => {
  it('should work', () => {
    const state: HeroEditor = { id: 0, name: '' };
    const action: EditStart = { type: 'EDIT_START', payload: { helo: state }  };
    const actual = heroEditorReducer(state, action);
    expect(actual).toEqual({});
  });
});

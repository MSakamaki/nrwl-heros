import { HeroEditor } from './hero-editor.interfaces';
import { HeroEditorAction } from './hero-editor.actions';

export function heroEditorReducer(state: HeroEditor, action: HeroEditorAction): HeroEditor {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}

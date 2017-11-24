import { HeroEditor } from './hero-editor.interfaces';
import { HeroEditorAction } from './hero-editor.actions';
import { heroEditorInitialState } from '@nrwl-sample/hero-detail/src/+state/hero-editor.init';

export function heroEditorReducer(state: HeroEditor, action: HeroEditorAction): HeroEditor {
  switch (action.type) {
    case 'EDIT_START': {
      return { ...state, ...action.payload };
    }
    case 'EDITTING': {
      return { ...state, ...action.payload };
    }
    case 'ADD_START': {
      return { ...state, ...action.payload };
    }
    case 'COMPLITE': {
      // 編集が終わったら自分の状態は初期化
      return heroEditorInitialState;
    }
    default: {
      return state;
    }
  }
}

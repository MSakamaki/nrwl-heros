import { HeroList } from './hero-list.interfaces';
import { HeroListAction } from './hero-list.actions';

export function heroListReducer(state: HeroList, action: HeroListAction): HeroList {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}

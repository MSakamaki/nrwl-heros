import { HeroList } from './hero-list.interfaces';
import { HeroListAction } from './hero-list.actions';

export function heroListReducer(state: HeroList, action: HeroListAction): HeroList {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    case 'EDIT_DATA': {
      let index = state.heros.findIndex(v => v.id === action.payload.helo.id);
      state.heros[index].name = action.payload.helo.name;
      return state;
    }
    case 'ADD_DATA': {
      state.heros.push({
        id: Reflect.apply(Math.max, void 0, state.heros.map(hero => hero.id)) + 1,
        name: action.payload.name,
      });
      return state;
    }
    case 'DELETE_DATA': {
      state.heros = state.heros.filter(helo => helo.id !== action.payload.id);
      return state;
    }
    default: {
      return state;
    }
  }
}

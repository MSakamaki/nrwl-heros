import { heroListReducer } from './hero-list.reducer';
import { heroListInitialState } from './hero-list.init';
import { HeroList } from './hero-list.interfaces';
import { DataLoaded } from './hero-list.actions';

describe('heroListReducer', () => {
  it('should work', () => {
    const state: HeroList = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = heroListReducer(state, action);
    expect(actual).toEqual({});
  });
});

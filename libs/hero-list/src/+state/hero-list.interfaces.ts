export interface HeroList {
  // define state here
  heros: Hero[];
}

export interface Hero {
  id: number;
  name: string;
}

export interface HeroListState {
  readonly heroList: HeroList;
}

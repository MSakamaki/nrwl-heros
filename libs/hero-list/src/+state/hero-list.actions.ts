import { Hero } from "@nrwl-sample/hero-list/src/+state/hero-list.interfaces";

export interface LoadData {
  type: 'LOAD_DATA';
  payload: {};
}

export interface DataLoaded {
  type: 'DATA_LOADED';
  payload: {
    heros: Hero[];
  };
}
export interface EditData {
  type: 'EDIT_DATA';
  payload: {
    helo: Hero;
  };
}
export interface DataEdited {
  type: 'DATA_EDITED';
  payload: {
    helo: Hero;
  };
}

export interface AddData {
  type: 'ADD_DATA';
  payload: {
    name: string;
  };
}

export interface DataAdded {
  type: 'DATA_ADDED';
  payload: {
    name: string;
  };
}

export interface DeleteData {
  type: 'DELETE_DATA';
  payload: {
    id: number;
  };
}

export interface DataDeleted {
  type: 'DATA_DELETED';
  payload: {
    id: number;
  };
}


export type HeroListAction = LoadData | DataLoaded | EditData | DataEdited | AddData | DataAdded | DeleteData | DataDeleted;

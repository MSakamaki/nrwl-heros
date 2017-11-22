
export interface EditStart {
  type: 'EDIT_START';
  payload: {
    id: number;
    name: string;
    editing: boolean;
    new: boolean;
  };
}

export interface Editting {
  type: 'EDITTING';
  payload: {
    id: number;
    name: string;
    editing: boolean;
    new: boolean;
  };
}

export interface EditFinish {
  type: 'EDIT_FINISHD';
  payload: {
    name: string;
    editing: boolean;
    new: boolean;
  };
}

export interface Complite {
  type: 'COMPLITE';
  payload: {
    editing: boolean;
  };
}

export interface AddStart {
  type: 'ADD_START';
  payload: {};
}

export interface Adding {
  type: 'ADDING';
  payload: {
    id: number;
    name: string;
    editing: boolean;
    new: boolean;
  };
}

export interface AddFinish {
  type: 'ADD_FINISHD';
  payload: {
    name: string;
    editing: boolean;
    new: boolean;
  };
}

export type HeroEditorAction = EditStart | Editting | Complite | AddStart | Adding | AddFinish;

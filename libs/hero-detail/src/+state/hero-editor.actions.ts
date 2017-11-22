import { HeroEditor } from "@nrwl-sample/hero-detail/src/+state/hero-editor.interfaces";

export interface EditStart {
  type: 'EDIT_START';
  payload: {
    id: number;
    name: string;
    editing: boolean;
    new: boolean;
  };
}

export interface AddStart {
  type: 'ADD_START';
  payload: {};
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

export interface Adding {
  type: 'ADDING';
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

export interface AddFinish {
  type: 'ADD_FINISHD';
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


export type HeroEditorAction = EditStart | AddStart | Editting | Adding| EditFinish | AddFinish | Complite;

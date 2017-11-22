export interface HeroEditor {
  id: number;
  name: string;
  editing: boolean;
  new: boolean;
}

export interface HeroEditorState {
  readonly heroEditor: HeroEditor;
}

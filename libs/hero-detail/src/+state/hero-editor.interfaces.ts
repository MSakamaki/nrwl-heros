export interface HeroEditor {
  id: number;
  name: string;
  // 編集中か否か
  editing: boolean;
  // 新規データか否か
  new: boolean;
}

export interface HeroEditorState {
  readonly heroEditor: HeroEditor;
}

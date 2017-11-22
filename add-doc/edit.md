

#### heroの編集

heloに編集ボタンを追加して名前を変更できるようにする

`helos`モジュールの`heros.component.html`に編集ボタンを追加

```html
<ul>
  <li *ngFor="let hero of heros$ | async">{{hero.name}}
    <button (click)="onClick(hero)">編集</button>
  </li>
</ul>
```

```typescript
  onClick(helo: Hero) {
    this.heroEditor.dispatch({
      type: 'EDIT_START',
      payload: { id: helo.id, name: helo.name }
    });
  }
```

編集データのmodel(`HeroDetailModule`)を定義する。


```typescript
// hero-editor.interfaces.ts
export interface HeroEditor {
  id: number;
  name: string;
  // 編集中か否か
  editing: boolean;
  // 新規データか否か
  new: boolean;
}

// hero-editor.init.ts
export const heroEditorInitialState: HeroEditor = {
  id: null,
  name: '',
  editing: false,
  new: false,
};


// hero-editor.actions.ts
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

export interface Complite {
  type: 'COMPLITE';
  payload: {
    editing: boolean;
  };
}

// hero-editor.effects.ts
  @Effect()
  EditStart = this.d.fetch('EDIT_START', {
    run: (a: EditStart, state: HeroEditorState) => {
      return {
        type: 'EDITTING',
        payload: {
          id: state.heroEditor.id,
          name: state.heroEditor.name,
          editing: true,
          new: false,
        }
      };
    },

    onError: (a: EditStart, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  EditFinish = this.d.fetch('EDIT_FINISHD', {
    run: (a: EditFinish, state: HeroEditorState) => {

      this.heroList.dispatch({
        type: 'EDIT_DATA',
        payload: {
          helo: {
            id: state.heroEditor.id,
            name: a.payload.name,
          }
        }
      });

      return {
        type: 'COMPLITE',
        payload: {
          editing: false,
        }
      };
    },

    onError: (a: EditFinish, error) => {
      console.error('Error', error);
    }
  });


// hero-editor.reducer.ts
  switch (action.type) {
    case 'EDIT_START': {
      return { ...state, ...action.payload };
    }
    case 'EDITTING': {
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

```

編集結果をcomponentにbindする

```html
<!-- heros.component.html -->
<div *ngIf="editing$ | async">
  <p>
    名前を変えたり、新しく追加できたり
  </p>

  <label>Name:
    <input type="text" [value]="name$ | async" #heroName>
  </label>

  <button (click)="onEditComplite(heroName.value)">更新</button>
</div>

```

```typescript
//hero-detail.component.ts
export class HeroDetailComponent implements OnInit {

  name$: Observable<string>
  editing$: Observable<boolean>
  new$: Observable<boolean>
  
  constructor(private heroEditor: Store<HeroEditorState>) {
    this.name$ = this.heroEditor.select('heroEditor', 'name');
    this.editing$ = this.heroEditor.select('heroEditor', 'editing');
    this.new$ = this.heroEditor.select('heroEditor', 'new');
  }

  ngOnInit() {}

  onEditComplite(name) {
    this.heroEditor.dispatch({ type: 'EDIT_FINISHD', payload: { name: name} });
  }
}


```

編集が終わったら自分の状態を初期化して、`heloList`の該当データを更新できるようにする。


```typescript
// hero-editor.effects.ts
  @Effect()
  EditFinish = this.d.fetch('EDIT_FINISHD', {
    run: (a: EditFinish, state: HeroEditorState) => {

      this.heroList.dispatch({
        type: 'EDIT_DATA',
        payload: {
          helo: {
            id: state.heroEditor.id,
            name: a.payload.name,
          }
        }
      });

      return {
        type: 'COMPLITE',
        payload: {
          editing: false,
        }
      };
    },

    onError: (a: EditFinish, error) => {
      console.error('Error', error);
    }
  });
```

`heloList`側にもActionを追加


```typescript

// hero-list.actions.ts
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

// hero-list.effects.ts
  @Effect()
  EditData = this.d.fetch('EDIT_DATA', {
    run: (a: EditData, state: HeroListState) => {
      return {
        type: 'DATA_EDITED',
        payload: {
          helo: a.payload.helo
        }
      };
    },

    onError: (a: EditData, error) => {
      console.error('Error', error);
    }
  });

    // hero-list.reducer.ts
    case 'DATA_EDITED': {
      let index = state.heros.findIndex(v => v.id === action.payload.helo.id);
      state.heros[index].name = action.payload.helo.name;
      return state;
    }

```

データが更新されるので画面に反映される

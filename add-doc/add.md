
#### heroの追加

新規追加ボタンを追加して追加できるようにする

`HerosModule`モジュールの画面によしなに新規ボタンを追加する。

```html
<!-- heros.component.html -->
<button mat-raised-button (click)="onNewHero()" color="primary">新規登録</button>
```

イベントは以下の感じ。

```typescript

// hero-detail.component.ts
  onNewHero() {
    this.heroEditor.dispatch({
      type: 'ADD_START'
    });
  }


// hero-editor.actions.ts

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

// hero-editor.effects.ts
  @Effect()
  AddStart = this.d.fetch('ADD_START', {
    run: (a: EditStart, state: HeroEditorState) => {
      return {
        type: 'ADDING',
        payload: {
          id: null,
          name: '',
          editing: true,
          new: true,
        }
      };
    },

    onError: (a: EditStart, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  AddFinish = this.d.fetch('ADD_FINISHD', {
    run: (a: EditFinish, state: HeroEditorState) => {

      // heroListにデータ追加をお願いする
      this.heroList.dispatch({
        type: 'ADD_DATA',
        payload: {
          name: a.payload.name,
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
    case 'ADD_START': {
      return { ...state, ...action.payload };
    }
    case 'ADDING': {
      return { ...state, ...action.payload };
    }

```

`heroList`モデルにActionとかを新しく追加する

```typescript
// hero-list.actions.ts
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

// hero-list.effects.ts
  @Effect()
  AddData = this.d.fetch('ADD_DATA', {
    run: (a: AddData, state: HeroListState) => {
      return {
        type: 'DATA_ADDED',
        payload: {
          name: a.payload.name
        }
      };
    },

    onError: (a: AddData, error) => {
      console.error('Error', error);
    }
  });

// hero-list.reducer.ts
// reducerでデータを追加する。
    case 'DATA_ADDED': {
      state.heros.push({
        id: Reflect.apply(Math.max, void 0, state.heros.map(hero=> hero.id)) + 1,
        name: action.payload.name,
      });
      return state;
    }

```

`hero-detail`に登録完了ボタンを追加し、新規と編集で違うイベントにする。

```typescript
// hero-detail.component.ts
  onAdd(name) {
    this.heroEditor.dispatch({ type: 'ADD_FINISHD', payload: { name: name } });
  }
```

```html
<!-- hero-detail.component.html -->
<div *ngIf="editing$ | async">
  <mat-form-field>
    <input matInput placeholder="おなまえ" [value]="name$ | async" #heroName>
  </mat-form-field>
  <button mat-raised-button *ngIf="!(new$ | async)" (click)="onEditComplite(heroName.value)" color="primary">更新</button>
  <button mat-raised-button *ngIf="new$ | async" (click)="onAdd(heroName.value)" color="primary">登録</button>
</div>
```

`heroList`にデータが追加されるので画面のほうは動いてくれる。


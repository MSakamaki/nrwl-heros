## nrwl example


```sh

# クライントを作成
ng generate app client --routing
# ngrxのルートをファイルを作らずに作成
ng generate ngrx app --module=apps/client/src/app/app.module.ts --onlyEmptyRoot

# Hero詳細 Module
ng generate lib heros --routing  --parentModule=apps/client/src/app/app.module.ts 
ng generate component heros --app=heros

# hero詳細 Module
ng generate lib hero-detail --routing  --parentModule=apps/client/src/app/app.module.ts 
ng generate component hero-detail --app=hero-detail
ng generate ngrx hero-editor --module=libs/hero-detail/src/hero-detail.module.ts


# Hero管理モジュールを作成
ng generate lib hero-list
ng generate ngrx hero-list --module=libs/hero-list/src/hero-list.module.ts

```

### やること

#### hero-listの編集

`helo-list`の初期アクション(API)にAPI callを追加
`import { HttpClientModule } from '@angular/common/http';`を追加
`hero-list.interfaces.ts`の型定義(とりまAPIにあわせる)
`hero-list.actions.ts`の定義
`hero-list.effects.ts` に`httpClient.get()`でデータを取得する(戻り値はinterfaceの通り)
`map()`で`DATA_LOADED`用データに変換する
(ショートカット`rx-add-operator`で不足オペレーターを`hero-list.module.ts`へ追加)

#### herosの編集とtopへの組み込み


`HerosModule`をclientアプリに読ませる
`herosComponent`を`export`する
clientアプリに`app-heros`を書く

`herosModule`に`HeroListModule`を読み込む

`herosModule`に以下コードを追加し、モジュール初期化時にデータを読み込むようにする。
```typescript
  constructor(private store: Store<HeroListState>) {
    this.store.dispatch({ type: 'LOAD_DATA' });
  }
```
(ここまで書くとchromeのNetworkにapiを叩いてるのがわかる)

`heros.component.ts`に以下のようなコードを追加

```typescript
heros$;

constructor(private store: Store<HeroListState>) {}

ngOnInit() {
  this.heros$ = this.store.select('heroList', 'heros');
}
```


`a-ngFor`ショートカットでngforを追加( `<ul><li *ngFor="let hero of heros$ | async">{{hero.name}}</li></ul>`)

#### hero詳細との連携

herosと同じようにclientアプリにコンポーネントを読み込む、以下のように実装。

```html
<div>
  <p>
    名前を変えたり、新しく追加できたりする
  </p>

  <label>Name:
    <input type="text">
  </label>

  <button (click)="onEditComplite(heroName.value)">更新</button>
  <button (click)="onAdd(heroName.value)">追加</button>
</div>

```

```typescript
export class HeroDetailComponent implements OnInit {

  name$: Observable<string>
  
  constructor(private heroEditor: Store<HeroEditorState>) {
    this.name$ = this.heroEditor.select('heroEditor', 'name');
  }

  ngOnInit() {}

  onEditComplite(name) {
  }

  onAdd(name) {
  }
}
```

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

#### heroの追加

新規追加ボタンを追加して追加できるようにする

`HerosModule`モジュールの画面によしなに新規ボタンを追加する。イベントは以下の感じ。

```typescript

// hero-detail.component.ts
  constructor(
    private heroEditor: Store<HeroEditorState>) { }

  onNewHelo() {
    this.heroEditor.dispatch({
      type: 'ADD_START'
    });
  }


// hero-editor.actions.ts

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

`heroList`にデータが追加されるので画面のほうは動いてくれる。

uiを以下のようにするとそれっぽくなる

```html
<!-- hero-detail.component.html -->
<div *ngIf="editing$ | async">
  <p>
    名前を変えたり、新しく追加できたり
  </p>

  <label>Name:
    <input type="text" [value]="name$ | async" #heroName>
  </label>

  <button *ngIf="!(new$ | async)" (click)="onEditComplite(heroName.value)">更新</button>
  <button *ngIf="new$ | async" (click)="onAdd(heroName.value)">追加</button>
</div>

```

#### heroの削除

heloに削除ボタンを追加して削除できるようにする

こちらは`helo-erider`を経由せずに削除する。

`helos`コンポーネントに削除ボタンと対応イベントを追加する。

```typescript

  onDelete(id: number) {
    this.heloList.dispatch({
      type: 'DELETE_DATA',
      payload: {
        id: id,
      }
    });
  }
```

`helo-list`モジュール

```typescript
// hero-list.actions.ts
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
// hero-list.effects.ts
  @Effect()
  DeleteData = this.d.fetch('DELETE_DATA', {
    run: (a: DeleteData, state: HeroListState) => {
      return {
        type: 'DATA_DELETED',
        payload: {
          id: a.payload.id
        }
      };
    },

    onError: (a: DeleteData, error) => {
      console.error('Error', error);
    }
  });

// hero-list.reducer.ts
    case 'DATA_DELETED': {
      state.heros = state.heros.filter(helo => helo.id !== action.payload.id);
      return state;
    }

```

# その他

## おぼえがき

強さの順は`interface > actions > effects = reducer = init`

angular-cliで使用してる handlebarsのバージョンが1.5x系のためセキュリテイ脆弱性があるが、1.6.x１で修正されてるのでそのまま。

# vscode plagtin

https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
https://marketplace.visualstudio.com/items?itemName=Angular.ng-template
https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode



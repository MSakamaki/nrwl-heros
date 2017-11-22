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

## angular material　を入れる

angular 2 materialの導入について詳しくは[ここ](https://material.angular.io/guide/getting-started)参照


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


# その他

## おぼえがき

強さの順は`interface > actions > effects = reducer = init`

angular-cliで使用してる handlebarsのバージョンが1.5x系のためセキュリテイ脆弱性があるが、1.6.x１で修正されてるのでそのまま。

# vscode plagtin

https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
https://marketplace.visualstudio.com/items?itemName=Angular.ng-template
https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode



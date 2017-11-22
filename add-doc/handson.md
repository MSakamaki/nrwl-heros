## nrwl example


開発画面はモバイルViewだといい感じ

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

#### UIコンポーネントの呼び出し

`HerosModule`と`HeroDetailModule`の対応コンポーネントをexportして、対応タグを`app.component.html`へ記述する。


```html
<!-- app.component.html -->
<app-heros></app-heros>
<app-hero-detail></app-hero-detail>
```

#### ヒーロー一覧の表示

初期処理でhero一覧を取得して、表示できるようにする。


```typescript
// heros.module.ts
// HeroListModuleをimportsして、LOAD_DATA Actionを行う

@NgModule({
  imports: [CommonModule, RouterModule, HeroListModule],
  declarations: [HerosComponent],
  exports: [HerosComponent]
})
export class HerosModule {
  constructor(private store: Store<HeroListState>) {
    this.store.dispatch({ type: 'LOAD_DATA' });
  }
}
```

##### hero-listを作る

```typescript

// hero-list.module.ts
// heroListMOduleにHttpClientModuleをimportする
import { HttpClientModule } from '@angular/common/http';

// hero-list.interfaces.ts
export interface HeroList {
  // define state here
  heros: Hero[];
}

export interface Hero {
  id: number;
  name: string;
}

// hero-list.init.ts
export const heroListInitialState: HeroList = {
  heros: []
};

// hero-list.actions.ts
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

// hero-list.effects.ts
  @Effect()
  loadData = this.d.fetch('LOAD_DATA', {
    run: (a: LoadData, state: HeroListState) => {
      /** NEW
       *  mapが無いと言われるので、rx-add-operatorsショートカットでimportする。
       * **/
      return this.http.get('api/users').map(heros => ({
        type: 'DATA_LOADED',
        payload: {
          heros: heros
        }
      }));
    },

    onError: (a: LoadData, error) => {
      console.error('Error', error);
    }
  });

```

データの取得ができるようになったのでchrome開発ツールのnetworkを見てapiをよんでるか確認する。

##### リストをherosに表示する


```typescript
// heros.component.ts
export class HerosComponent implements OnInit {

 // rx-observable で追加が楽
  heros$: Observable<Hero[]>;

  constructor(private heloList: Store<HeroListState>) {}

  ngOnInit() {
    this.heros$ = this.heloList.select('heroList', 'heros');
  }
}
```

```html
<!-- pure html -->
<ul>
  <li *ngFor="let hero of heros$ | async">{{hero.name}}</li>
</ul>
<!-- material -->
<mat-list>
  <!-- `a-ngFor`ショートカットでngforの追加が楽 -->
  <mat-list-item *ngFor="let hero of heros$ | async">{{hero.name}}</mat-list-item>
</mat-list>
```

APIから取得したデータが画面に表示される

### [次(編集)へ](./handson/edit.html)


#### heroの削除

heloに削除ボタンを追加して削除できるようにする

こちらは`helo-erider`を経由せずに削除する。

`helos`コンポーネントに削除ボタンと対応イベントを追加する。

```typescript
// heros.component.ts
  onDelete(id: number) {
    this.heloList.dispatch({
      type: 'DELETE_DATA',
      payload: {
        id: id,
      }
    });
  }
```

```html
<!-- heros.component.html -->
    <button mat-raised-button (click)="onDelete(hero.id)" color="primary">削除</button>
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

// hero-list.reducer.ts
    case 'DELETE_DATA': {
      state.heros = state.heros.filter(helo => helo.id !== action.payload.id);
      return state;
    }

```

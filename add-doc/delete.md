

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

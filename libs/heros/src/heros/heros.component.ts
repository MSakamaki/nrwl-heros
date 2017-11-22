import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroListState, Hero } from '@nrwl-sample/hero-list/src/+state/hero-list.interfaces';
import { Observable } from 'rxjs/Observable';
import { HeroEditorState } from '@nrwl-sample/hero-detail/src/+state/hero-editor.interfaces';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heros$: Observable<Hero[]>;

  constructor(private heloList: Store<HeroListState>, private heroEditor: Store<HeroEditorState>) { }

  ngOnInit() {
    this.heros$ = this.heloList.select('heroList', 'heros');
  }

  onEdit(helo: Hero) {
    this.heroEditor.dispatch({
      type: 'EDIT_START',
      payload: { id: helo.id, name: helo.name }
    });
  }

  onNewHero() {
    this.heroEditor.dispatch({
      type: 'ADD_START'
    });
  }

  onDelete(id: number) {
    this.heloList.dispatch({
      type: 'DELETE_DATA',
      payload: {
        id: id,
      }
    });
  }

}

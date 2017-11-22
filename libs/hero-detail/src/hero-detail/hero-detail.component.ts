import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroEditorState, HeroEditor } from '@nrwl-sample/hero-detail/src/+state/hero-editor.interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
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

  onAdd(name) {
    this.heroEditor.dispatch({ type: 'ADD_FINISHD', payload: { name: name } });
  }
}

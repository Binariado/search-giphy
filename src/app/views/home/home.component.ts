import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { GifsService } from '../../services/gifs.service';
import { GifType } from '../../utils/gif';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [
    GifsService
  ]
})
export class HomeComponent implements OnInit {
  gif$: Observable<GifType>;

  constructor(
    private store: Store<{ gif: GifType }>,
    private historyService: GifsService
  ) { 
    this.gif$ = this.store.select('gif');
  }

  ngOnInit(): void {
    this.historyService.trendingGif();
  }

}

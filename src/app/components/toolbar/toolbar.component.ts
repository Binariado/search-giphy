import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import { GifsService } from '../../services/gifs.service';

type GifType = {
  history: string[]
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  providers: [
    GifsService
  ]
})
export class ToolbarComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;
  searchInput: string = '';
  offset: number = 0;
  gif$: Observable<GifType>;

  @ViewChild('historySearch') historySearch: ElementRef<HTMLInputElement>;

  @HostListener("window:scroll", ['$event'])
  doSomethingOnInternalScroll($event:Event){
    let event: any = $event;
    //const document = event.srcElement;

    if (
      document.documentElement.offsetHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight
    ) {
      this.historyService.data().then((data) => {
        const { onlySearch } = data;
        this.historyService.searchGif(onlySearch);
      });
    }
  }

  constructor(
    private store: Store<{ gif: GifType }>,
    private historyService: GifsService
  ) {
    this.gif$ = this.store.select('gif');
  } 
  
  ngOnInit() {

  }

  async searchGif(searchInput?: string): Promise<void> {
    if (this.searchInput){
      const historySearch = this.historySearch.nativeElement;
      const scroll = historySearch.offsetWidth + historySearch.scrollLeft;
      this.historyService.searchGif(searchInput ?? this.searchInput).then(() => {
        if (!searchInput) {
          setTimeout(() => {
            historySearch.scrollTo(scroll, 0);
          }, 10);
        }
      });
    }
  }

  remove(text: string): void {
    this.historyService.removeHistory(text)
  }

}

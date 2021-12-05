import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { renderGifTrending, renderGifSearch, mountNode } from '../config/giphy';
import { addHistory, removeHistory, gifOffset, onlySearch, gifSearching } from '../store/gifReducer/history.actions';
import { GifType } from '../utils/gif';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  gif$: Observable<GifType>;

  /**
   * Creates an instance of ShopCartService.
   * @param {Store<{ gif: GifType }>} store
   * @memberof GifsService
   */
  constructor(private store: Store<{ gif: GifType }>) {
    this.gif$ = this.store.select('gif');
  }
  
  /**
   *
   *
   * @private
   * @return {*} 
   * @memberof GifsService
   */
  async data() {
    const data: any = await this.store
      .pipe(
        select('gif'),
        take(1)
      )
      .toPromise();
    return {
      history: data.history,
      searching: data.searching,
      offset: data.offset,
      onlySearch: data.onlySearch
    };
  }

  /**
   *
   *
   * @param {string} search
   * @memberof GifsService
   */
  async addHistory(search: string) {
    this.store.dispatch(addHistory({
      payload: {
        text: search
      }
    }));
  }

  async removeHistory(search: string) {
    this.store.dispatch(removeHistory({
      payload: {
        text: search,
      }
    }));
  }

  async gifSearching(searching: boolean) {
    this.store.dispatch(gifSearching({
      payload: {
        searching: searching,
      }
    }));
  }

  async gifOffset() {
    const { offset } = await this.data();
    const offsetMax = offset + 25;
    this.store.dispatch(gifOffset({
      payload: {
        offset: offsetMax,
      }
    }));
    return offsetMax;
  }

  async gifOffsetReset() {
    this.store.dispatch(gifOffset({
      payload: {
        offset: 0,
      }
    }));
    const { offset } = await this.data();
    return offset;
  }

  async onlySearch(onlyText: string) {
    this.store.dispatch(onlySearch({
      payload: {
        onlySearch: onlyText,
      }
    }));
  }

  async searchGif(searchInput: string): Promise<void> {
    await this.data().then(async (data) => {
      const { offset, searching, onlySearch } = data;

      if (searchInput !== '') {
        this.onlySearch(searchInput);
        this.addHistory(searchInput);
        
        const element = mountNode();

        let offsetReset = -1;

        if(onlySearch !== searchInput) {
          element.innerHTML = '';
          offsetReset = await this.gifOffsetReset();
        }
        
        if(searching) {
          this.gifSearching(false);
          return renderGifSearch(
            element, {
              offset: offsetReset === 0 ? offsetReset: offset,
              text: searchInput
            }
            ).then((resp: boolean) => {
              this.gifSearching(resp);
              this.gifOffset();
          });
        }

      } else {
        this.trendingGif();
      }
    });
  }

  async trendingGif() {
    await this.data().then(async (data) => {
      const { offset, onlySearch, searching } = data;
      const element = mountNode();

      let offsetReset = -1;

      if(onlySearch !== '') {
        element.innerHTML = '';
        this.onlySearch('');
        offsetReset = await this.gifOffsetReset();
      }

      if(searching) {
        this.gifSearching(false);
        return renderGifTrending(
          mountNode(), {offset: offsetReset === 0 ? offsetReset: offset}
          ).then((resp: boolean) => {
            this.gifSearching(resp);
            this.gifOffset();
        });
      }
    });
  }

}

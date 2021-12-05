import { gf } from '../config/giphy';

export const Api = {
  giphyTrending: ({ offset, limit }) => {
    return gf.trending({ offset, limit });
  },
  giphysearch: (text: string, { offset, limit }) => {
    return gf.search(text, { offset, limit });
  }
}
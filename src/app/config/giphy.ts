import { GiphyFetch } from '@giphy/js-fetch-api';
import { renderGif } from '@giphy/js-components';
import { environment } from '../../environments/environment';
export const gf = new GiphyFetch(environment.giphy.apiKey);

export const mountNode = (): HTMLElement => document
.querySelector(".grid-gifs");

/**
 * vanillaJSGif render item gif
 * 
 * @param itemNode - node for item creation gif
 * @param idGif - id gif
 */
const vanillaJSGif = async (itemNode: HTMLElement, idGif: string) => {
  // render a single gif
  const { data: gif1 } = await gf.gif(idGif);
  renderGif({ gif: gif1, width: 300 }, itemNode);
}

/**
 * itemGrid
 * 
 * @returns Promise<HTMLElement>
 */
const itemGrid = (): Promise<HTMLElement> => {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.classList.add('m-1');
    resolve(div);
  });
}

/**
 * renderGrids render a grid on the mountNode node
 * 
 * @param mountNode - node for grid creation
 * @param data - data gif
 * @returns 
 */
const renderGrid = (mountNode: HTMLElement, data: any[]): Promise<boolean> => {
  return new Promise((resolve) => {
    let length = data.length,
    index= -1;
  
    while (++index <= length) {
      if (Object.prototype.hasOwnProperty.call(data, index)) {
        const element = data[index];
        itemGrid().then(div => {
          vanillaJSGif(div, element.id);
          mountNode.appendChild(div);
        });
      }
    }
    resolve(true);
  })
}

/**
 * giphyTrending get data trending gif
 * 
 * @param param0 -
 * ```json
 * { offset: 0, limit: 25 }
 * ```
 * @returns 
 */
export const giphyTrending = async ({ offset, limit }) => {
  return await gf.trending({ offset, limit: limit });
}

/**
 * giphySearch get data search gif
 * 
 * @param text - query search example 'music'
 * @param param1 
 * ```json
 * { offset: 0, limit: 25 }
 * ```
 * @returns 
 */
export const giphySearch= (text: string, { offset, limit }) => {
  return gf.search(text, { offset, limit });
}

/**
 * renderGifTrending renderGrids renders a grid of trending gifs in mountNode node
 * 
 * @param mountNode - node create grid
 * @param param1 
 * ```json
 * { offset: 0, limit: 25 }
 * ```
 * @returns 
 */
export const renderGifTrending = (mountNode: HTMLElement, {offset}) => {
  return new Promise((resolve) => {
    giphyTrending({ offset, limit: 25 }).then((response: any) => {
      const {data} = response;
      return renderGrid(mountNode, data).then((resp)=> resolve(resp));
    });
  })
}

/**
 * renderGifSearch renders a grid of gifs of the gifs requested by query search in the mountNode node
 * 
 * @param mountNode - node create grid
 * @param param1 
 * ```json
 * { offset: 0, limit: 25 }
 * ```
 * @returns 
 */
export const renderGifSearch = (mountNode: HTMLElement, {offset, text}) => {
  return new Promise((resolve) => {
    giphySearch(text, { offset, limit: 25 }).then((response: any) => {
      const {data} = response;
      renderGrid(mountNode, data).then((resp)=> resolve(resp));;
    });
  });
}
import { GiphyFetch } from '@giphy/js-fetch-api';
import { renderGif } from '@giphy/js-components';
import { environment } from '../../environments/environment';
export const gf = new GiphyFetch(environment.giphy.apiKey);

export const mountNode = (): HTMLElement => document
.querySelector(".grid-gifs");

const vanillaJSGif = async (mountNode: HTMLElement, idGif: string) => {
  // render a single gif
  const { data: gif1 } = await gf.gif(idGif);
  renderGif({ gif: gif1, width: 300 }, mountNode);
}

const itemGrid = (): Promise<HTMLElement> => {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.classList.add('m-1');
    resolve(div);
  });
}

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


export const giphyTrending = async ({ offset, limit }) => {
  return await gf.trending({ offset, limit: 25 });
}

export const giphySearch= (text: string, { offset, limit }) => {
  return gf.search(text, { offset, limit });
}

export const renderGifTrending = (mountNode: HTMLElement, {offset}) => {
  return new Promise((resolve) => {
    giphyTrending({ offset, limit: 25 }).then((response: any) => {
      const {data} = response;
      return renderGrid(mountNode, data).then((resp)=> resolve(resp));
    });
  })
}

export const renderGifSearch = (mountNode: HTMLElement, {offset, text}) => {
  return new Promise((resolve) => {
    giphySearch(text, { offset, limit: 25 }).then((response: any) => {
      const {data} = response;
      renderGrid(mountNode, data).then((resp)=> resolve(resp));;
    });
  });
}
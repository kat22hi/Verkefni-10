import { save, load } from './storage';
import { el } from './helpers';
import getRandomImage from './nasa-api';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let video; // vídjó á forsíðu
let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  image = await getRandomImage();

  if (image.type === 'video') {
    img.style.display = 'none';
    video.setAttribute('src', image.mediaUrl);
    video.style.display = 'block';
  } else {
    video.style.display = 'none';
    img.setAttribute('src', image.mediaUrl);
    img.style.display = '';
  }

  text.innerText = image.text;
  title.innerText = image.title;
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.type, image.mediaUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init() {
  img = document.querySelector('.apod__image');
  title = document.querySelector('.apod__title');
  text = document.querySelector('.apod__text');
  video = document.querySelector('.apod__video');

  document.querySelector('#new-image-button').addEventListener('click', getNewImage);
  document.querySelector('#save-image-button').addEventListener('click', saveCurrentImage);
  document.querySelector('#save-image-button').addEventListener('click', saveCurrentImage);
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const main = document.querySelector('main');
  const images = load();
  images.forEach((favimg) => {
    const titleEl = el('h1');
    titleEl.innerText = favimg.title;

    if (favimg.type === 'video') {
      const vid = el('iframe');
      video.setAttribute('src', favimg.mediaUrl);
      video.setAttribute('type', 'text/HTML');
      video.setAttribute('width', '640');
      video.setAttribute('height', '360');
      video.setAttribute('frameborder', '0');
      video.classList.add('apod__video');

      const item = el('div', titleEl, vid);
      item.classList.add('apod');

      main.appendChild(item);
    } else {
      const imgEl = el('img');
      imgEl.setAttribute('src', favimg.mediaUrl);
      imgEl.classList.add('apod__image');

      const item = el('div', titleEl, imgEl);
      item.classList.add('apod');

      main.appendChild(item);
    }
  });
}

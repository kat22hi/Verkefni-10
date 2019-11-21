/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
    const json = localStorage.getItem(LOCALSTORAGE_KEY);
    return JSON.parse(json);
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let favorites = load();
  if (!favorites) favorites = [];

  if (favorites.filter((img) => img.mediaUrl === mediaUrl).length === 0) {
    favorites.push({
      type, mediaUrl, text, title,
    });
    const json = JSON.stringify(favorites);
    localStorage.setItem(LOCALSTORAGE_KEY, json);
  }
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

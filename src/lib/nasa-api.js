import { generateRandomDate } from './helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'B8aF8lGp5GzPolZ8DBt4axeCd3nH4M8l7XRr2JEJ';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';

/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
    const date = generateRandomDate();
    const requestURL = `${URL}?api_key=${API_KEY}&date=${date}`;
    const res = await fetch(requestURL);

    const {
        meda_type: type,
        url: mediaUrl,
        explanation: text,
        title,
    } = await res.json();

    return {
        type, mediaUrl, text, title,
    };
}

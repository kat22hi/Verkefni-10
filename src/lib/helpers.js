
/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fær inn tölu og skilar síðan streng sem er paddaður
 */
const ToZeroPadded = (number) => (number > 9 ? String(number) : `0${number}`);

/**
 * Skilar handahófskenndri dagsetningu
 */
export function generateRandomDate() {
  // return '2019-10-21';

  const min = 803260800000; // 16. júlí 1995
  const max = Date.now();
  const timestamp = randomNumber(min, max);
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ToZeroPadded(date.getMonth() + 1);
  const day = ToZeroPadded(date.getDate());
  return `${year}-${month}-${day}`;
}

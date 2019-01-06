/*

──────────────────────────────────────────
──────────────────────────────────────────
RANDOM
──────────────────────────────────────────
──────────────────────────────────────────

var color = randomColor();
var randomValue = randomFromArray(['a', 'b', 'c', 'd', 'e']);
var randomValue = randomFromA2B(10, 100); // return a floating number
var randomValue = randomFromA2B(10, 100, true); // will return a integer instead of floating number

*/

/**
 * Returns the hex format random color.
 */
export const randomColor = () => {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 * Returns a random item in the array.
 */
export const randomFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns the random number between two numbers.
 */
export const randomFromA2B = (a, b, int = false) => {
  var result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
}


export default {
  randomColor,
  randomFromArray,
  randomFromA2B,
}

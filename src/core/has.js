/*

──────────────────────────────────────────
──────────────────────────────────────────
HAS
──────────────────────────────────────────
──────────────────────────────────────────

has(object, 'property')

*/

export default function has(obj, key) {
  return obj ? hasOwnProperty.call(obj, key) : false;
}

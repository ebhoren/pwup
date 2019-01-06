/*

──────────────────────────────────────────
──────────────────────────────────────────
IS
──────────────────────────────────────────
──────────────────────────────────────────

isNodeList( object );
isHTMLCollection( object );

*/

export const isNodeList = (v) => {
  return v instanceof NodeList;
}

export const isHTMLCollection = (v) => {
  return v instanceof HTMLCollection;
}

export default {
  isNodeList,
  isHTMLCollection,
}

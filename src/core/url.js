/*

──────────────────────────────────────────
──────────────────────────────────────────
URL PARAMS
──────────────────────────────────────────
──────────────────────────────────────────

var id  = getUrlParam('id');
var id  = getUrlParam('id', 'my_custom_url');
var url = setUrlParam('id', 'Hello World');
var url = setUrlParam('id', 'Hello World', 'my_custom_url');
var url = deleteUrlParam('id');
var url = deleteUrlParam('id', 'my_custom_url');

*/

/**
 * Get the url parameter of the current page(or custom).
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
export const getUrlParam = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
* Set the current page (or custom) url parameters, return the modified url.
* From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
*/
export const setUrlParam = (key, value, url = window.location.href) => {
  var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");

  if (url.match(re)) {
    return url.replace(re, "$1" + key + "=" + encodeURIComponent(value) + "$2");
  } else {
    var hash = "";
    if (url.indexOf("#") !== -1) {
      hash = url.replace(/.*#/, "#");
      url = url.replace(/#.*/, "");
    }
    var separator = url.indexOf("?") !== -1 ? "&" : "?";
    return url + separator + key + "=" + encodeURIComponent(value) + hash;
  }
}

/**
 * Delete the current page (or custom) url parameter, return the modified url.
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
export const deleteUrlParam = (param, url = window.location.href) => {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

    var prefix = encodeURIComponent(param) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
  }

  return url;
}


export default { getUrlParam, setUrlParam, deleteUrlParam };

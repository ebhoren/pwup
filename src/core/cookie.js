/*

──────────────────────────────────────────
──────────────────────────────────────────
COOKIES
──────────────────────────────────────────
──────────────────────────────────────────

getCookie('cookieName');
setCookie('cookieName', 'small');
setCookie('cookieName', 123, { hour: 12 });
setCookie('cookieName', 'helloworld', { domain: '.github.com' });
setCookie('cookieName', '%3Ca%3E%20sd', { raw: true }); //do not encode
deleteCookie('cookieName');

*/

import is from 'is_js';


/**
 * Get the browser cookie.
 */
export const getCookie = (name) => {
  const nameEQ  = encodeURIComponent(name) + "=",
        ca      = document.cookie.split(';');

  for (let i = 0, n = ca.length, c; i < n; i++) {
    c = ca[i];
    while( is.startWith(c, ' ') ) c = c.substring(1, c.length);
    if( c.indexOf(nameEQ) === 0 ) return decodeURIComponent( c.substring(nameEQ.length, c.length) );
  }

  return null;
}

/**
 * Set the browser cookie. The option param can set the following parameters: days, hour, path, domain, secure, raw.
 */
export const setCookie = (name, value, option) => {
  const longTime  = 10,
        val       = option && option.raw ? value : encodeURIComponent(value);
  let cookie      = encodeURIComponent(name) + "=" + val;

  if( option ) {
    let date, ms;

    if (option.days) {
        date  = new Date();
        ms    = option.days * 24 * 3600 * 1000;

        date.setTime(date.getTime() + ms);
        cookie += "; expires=" + date.toGMTString();
    } else if (option.hour) {
        date  = new Date();
        ms    = option.hour * 3600 * 1000;

        date.setTime(date.getTime() + ms);
        cookie += "; expires=" + date.toGMTString();
    } else {
        date  = new Date();
        ms    = longTime * 365 * 24 * 3600 * 1000;

        date.setTime(date.getTime() + ms);
        cookie += "; expires=" + date.toGMTString();
    }

    if( option.path ) cookie += "; path=" + option.path;
    if( option.domain ) cookie += "; domain=" + option.domain;
    if( option.secure ) cookie += "; true";
  }

  document.cookie = cookie;
}

/**
 * Delete the browser cookie.
 */
export const deleteCookie = (name) => {
  setCookie(name, "", { hour: -1 });
};



export default {
  getCookie,
  setCookie,
  deleteCookie,
};

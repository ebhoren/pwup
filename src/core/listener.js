/*

──────────────────────────────────────────
──────────────────────────────────────────
Listener
──────────────────────────────────────────
──────────────────────────────────────────

- element: DOM node or CSS selector
- type: Event type (click, mouseover, touchstart, etc..)
- callback: Function

on(element, type, callback);
off(element, type, callback);
once(element, type, callback);

*/

import is from 'is_js';
import { queryAll } from '../dom/query';


const PASSIVE_EVENTS = ['touchmove', 'mousemove', 'scroll', 'mouseWheel', 'touchstart'];



const getOptions = ( $type ) => {
  return PASSIVE_EVENTS.indexOf( $type ) === -1 ? false : { passive: false };
}

const normalizeEventType = ( $type ) => {
  if( $type === 'mouseWheel' ) {
      return 'onwheel' in document ? 'wheel' : is.existy(document.onmousewheel) ? 'mousewheel' : 'DOMMouseScroll';
  } else if( $type === 'focusOut' ) {
      return is.firefox() ? 'blur' : 'focusout';
  }

  return $type;
}

const listen = ($el, $action, $type, $cb ) => {
  const el = queryAll($el),
        t  = normalizeEventType( $type ),
        o  = getOptions( $type );

  for (var i = 0, n = el.length; i < n; i++) {
    el[i][$action + 'EventListener'](t, $cb, o);
  }
}





export const on = ($el, $type, $cb) => {
  listen($el, 'add', $type, $cb);
}

export const off = ($el, $type, $cb) => {
  listen($el, 'remove', $type, $cb);
}

export const once = ($el, $type, $cb) => {
  const cb = (e) => {
    const t = e.currentTarget;
    off(t, $type, cb);
    $cb.call(t, arguments);
  };

  listen($el, 'add', $type, cb);
}

export const trigger = ($el, $type) => {
  const el = queryAll($el),
        t  = normalizeEventType( $type );

  for (var i = 0, n = el.length; i < n; i++) {
    el[i].dispatchEvent( new Event(t) );
  }
};


export default { on, off, once, trigger };

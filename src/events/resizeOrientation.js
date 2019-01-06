/*

──────────────────────────────────────────
──────────────────────────────────────────
RESIZE & ORIENTATION
──────────────────────────────────────────
──────────────────────────────────────────

const ro = new ResizeOrientation({
    cb: resize,
    throttle: {
        delay: 100,
        onlyAtEnd: true
    }
});

ro.on();  // start listening to window's resize & orientation change events
ro.off(); // stop listening to window's resize & orientation change events
ro.run(); // execute object callback

function resize(event) {
  // do something
}

*/
import is from 'is_js';

import Throttle from '../core/throttle';
import { on, off } from '../core/event';
import { query } from '../dom/query';


// CACHE MOBILE DETECTION RESULT
const IS_MOBILE = is.mobile();
const EVENT_TYPE = IS_MOBILE ? 'orientationchange' : 'resize';


const ResizeOrientation = ( options ) => {

  const cb = options.cb;
  const throttle = new Throttle({
      cb: gRaf,
      delay: options.throttle.delay,
      onlyAtEnd: options.throttle.onlyAtEnd
  })
  let tick, event;



  // PRIVATE API
  const gRaf = () => {
    if( !tick ){
      requestAnimationFrame( _run );
      tick = true;
    }
  };
  const getThrottle = (e) => {
    event = e;
    throttle.init();
  };




  // PUBLIC API
  const _on = () => { on(window, EVENT_TYPE, getThrottle); };
  const _off = () => { off(window, EVENT_TYPE, getThrottle); };
  const _run = () => {
    cb( event );
    tick = false;
  };



  const ctx = {
    on: _on,
    off: _off,
    run: _run
  };

  return ctx;
}

export default ResizeOrientation;

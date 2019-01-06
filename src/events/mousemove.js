/*

──────────────────────────────────────────
──────────────────────────────────────────
MOUSEMOVE
──────────────────────────────────────────
──────────────────────────────────────────

►►►  element is optional

var mm = new MouseMove({
    element: '#element' (CSS selector OR DOM node),
    cb: mmCb
});

mm.on();  // start listening to mousemove event
mm.off(); // stop listening to mousemove event
mm.run(); // execute object callback

function mmCb(posX, posY, event) {
  // do something
}

*/
import is from 'is_js';
import { on, off } from '../core/event';
import { query } from '../dom/query';


// CACHE MOBILE DETECTION RESULT
const IS_MOBILE = is.mobile();
const EVENT_TYPE = IS_MOBILE ? 'touchmove' : 'mousemove';




const MouseMove = ( options ) => {

  const el = query( options.element ) || document;
  const cb = options.cb;
  let tick, event;



  // PRIVATE API
  const gRaf = (e) => {
    event = e;
    if( event.cancelable ) event.preventDefault();

    if( !tick ) {
      requestAnimationFrame( _run );
      tick = true;
    }
  };



  // PUBLIC API
  const _on = () => { on(el, EVENT_TYPE, gRaf); };
  const _off = () => { off(el, EVENT_TYPE, gRaf); };
  const _run = () => {
    const t = IS_MOBILE ? event.changedTouches[0] : event;

    cb(t['pageX'], t['pageY'], event);
    tick = false;
  };




  const ctx = {
    on: _on,
    off: _off,
    run: _run
  };

  return ctx;
}

export default MouseMove;

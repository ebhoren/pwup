/*

──────────────────────────────────────────
──────────────────────────────────────────
WHEEL & TOUCH
──────────────────────────────────────────
──────────────────────────────────────────

const wt = new WheelTouch(wtCb);
      wt.on();  // start listening to mouse wheel & touch move events
      wt.off(); // stop listening to mouse wheel & touch move events

function wtCb(delta, type, event) {
  // do something
}

type → 'scroll' or 'touch'

*/
import is from 'is_js';
import { on, off } from '../core/event';


const WheelTouch = (cb) => {

  let tick = false,
      event, type, delta, startY;



  // PRIVATE API
  const gRaf = (e) => {
    event = e;

    if( event.cancelable ) event.preventDefault();
    if( !tick ){
      requestAnimationFrame( _run );
      tick = true;
    }
  }
  const onWheel = () => {
    type = 'scroll';
    delta = event.wheelDeltaY || event.deltaY * -1;

    // deltamode === 1 -> wheel mouse, not touch pad
    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if( is.firefox() && event.deltaMode === 1 ) delta *= 40;

    getCb();
  };
  const onMouseWheel = () => {
    type = 'scroll';
    delta = event.wheelDeltaY ? event.wheelDeltaY : event.wheelDelta;

    getCb();
  };
  const onTouchStart = (e) => { startY = e.targetTouches[0].pageY; };
  const onTouchMove = () => {
    type = 'touch';
    delta = event.targetTouches[0].pageY - startY;

    getCb();
  };
  const getCb = () => {
    cb(delta, type, event);
    tick = false;
  };



  // PUBLIC API
  const _on = () => {
    on(document, 'mouseWheel', gRaf);
    on(document, 'touchstart', onTouchStart);
    on(document, 'touchmove', gRaf);
  };
  const _off = () => {
    off(document, 'mouseWheel', gRaf);
    off(document, 'touchstart', onTouchStart);
    off(document, 'touchmove', gRaf);
  };
  const _run = () => {
    const eType = event.type

    if( eType === 'wheel' ) onWheel();
    else if( eType === 'mousewheel' ) onMouseWheel();
    else if( eType === 'touchmove' ) onTouchMove();
  };



  const ctx = {
    on: _on,
    off: _off
  };

  return ctx;
}

export default WheelTouch;

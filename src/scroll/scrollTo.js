/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL TO
──────────────────────────────────────────
──────────────────────────────────────────

ScrollTo({
    dest: 1000,
    duration: 200,
    easing: 'ExpoInOut',
    cb: afterTop
});

*/
import is from 'is_js';

import DOM from '../dom/DOM';
import WheelTouchPrevent from '../events/wheelTouchPrevent';
import lerp from '../math/lerp';
import round from '../math/round';


const ScrollTo = (options) => {
    const d = document,
          scrollNode = d.scrollingElement ? d.scrollingElement : DOM.body, // Chrome v.61
          scrollable = is.firefox() || is.ie() ? d.documentElement : scrollNode,
          start = pageYOffset,
          end = options.dest;
    //var anim = new S.M({d: options.duration, e: options.easing, update, cb: getCb});

    if( start === end ) getCb();
    else {
        WheelTouchPrevent.on();
        //anim.play();
    };

    const update = (v) => {
        scrollable.scrollTop = round( lerp.init(start, end, v.progress) );
    };

    const getCb = () => {
      WheelTouchPrevent.off();
      if( options.cb ) options.cb();
    };
}

export default ScrollTo;

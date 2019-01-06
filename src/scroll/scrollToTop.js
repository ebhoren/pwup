/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL TO TOP
──────────────────────────────────────────
──────────────────────────────────────────

ScrollToTop({
    totalHeight: element.offsetHeight,
    cb: afterTop
});

*/
import lerp from '../math/lerp';
import ScrollTo from './scrollTo';

const ScrollToTop = (options) => {
  const currentPos = pageYOffset;


  // PRIVATE API
  const getDuration = () => {
    const coeff = lerp(300, 1500, currentPos / options.totalHeight);
    return currentPos === 0 ? 0 : coeff;
  };
  const getEase = () => {
    const step = 500;

    if( currentPos <= step * 5 ) return 'Power' + Math.ceil(currentPos / step) + 'InOut';
    else return 'ExpoInOut';
  };


  // start scrolling
  ScrollTo({
    dest: 0,
    duration: getDuration(),
    easing: getEase(),
    cb: options.cb
  });

}

export default ScrollToTop;

/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL TOP WHEN REFRESH BROWSER
──────────────────────────────────────────
──────────────────────────────────────────

const stwpr = new ScrollTopWhenPageRefresh();
      stwpr.on();
      stwpr.off();

*/

const ScrollTopWhenPageRefresh = () => {

  let active = false,
      scrollRestoration = 'auto',
      oldWindowBeforeUnload;

  return {
    on: () => {
      // skip all if already activated
      if( active === true ) return;
      active = true;

      // if scrollRestoration API is available
      if( 'scrollRestoration' in history ) {
        // save previous history.scrollRestoration value
        // change history.scrollRestoration to manual
        scrollRestoration = history.scrollRestoration;
        history.scrollRestoration = 'manual';
      }
      else {
        // save previous window.onbeforeunload
        // change window.onbeforeunload to scroll window to top, then run old window.onbeforeunload
        oldWindowBeforeUnload = window.onbeforeunload || null;
        window.onbeforeunload = () => {
          window.scrollTo(0, 0);
          if( oldWindowBeforeUnload ) oldWindowBeforeUnload();
        };
      }
    },
    off: () => {
      // skip all if not activated
      if( active === false ) return;

      // restore defaults behaviors
      if( 'scrollRestoration' in history ) history.scrollRestoration = scrollRestoration || 'auto';
      else window.onbeforeunload = oldWindowBeforeUnload;

      active = false;
    }
  }
};

export default ScrollTopWhenPageRefresh;

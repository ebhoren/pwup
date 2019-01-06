import is from 'is_js';

import { isNodeList, isHTMLCollection } from '../core/is';
import DOM from './DOM';



/**
 *
 */
export const query = ($selector, $el = DOM.body) => {
  if( is.string( $selector ) ) return $el.querySelector($selector);
  else if( is.domNode( $selector ) ) return $selector;
  else if( is.array( $selector) || isNodeList( $selector ) || isHTMLCollection( $selector ) ) return $selector[0];

  return null;
}


/**
 *
 */
export const queryAll = ($selector, $el = DOM.body) => {
  if( is.string( $selector ) ) return $el.querySelectorAll( $selector );
  else if( is.domNode( $selector ) ) return [$selector];
  else if( is.array( $selector ) || isNodeList( $selector ) || isHTMLCollection( $selector ) ) return $selector;

  return null;
}


export default { query, queryAll };

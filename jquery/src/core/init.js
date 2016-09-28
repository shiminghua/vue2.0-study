/**
 * jQuery.fn.init
 */
import jQuery from '../core';
import document from '../var/document';
import rsingleTag from './var/rsingleTag';

import '../traversing/findFilter';

// A central reference to the root jQuery(document)
let rootjQuery,
  // A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

  init = jQuery.fn.init = function( selector, context, root ) {

    let match, elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    // 处理 "" null undefined false
    if ( !selector ) {
      return this;
    }

    // Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
    root = root || rootjQuery;

    // Handle HTML strings
    // 处理html字符串
    if ( typeof selector === 'string' ) {

      // Assume that strings that start and end with <> are HTML and skip the regex check
      if ( selector[ 0 ] === '<' && selector[ selector.length - 1 ] === '>' && selector.length >= 3 ) {
        match = [ null, selector, null ];
      }
      else {
        match = rquickExpr.exec( selector );
      }

      // Match html or make sure no context is specified for #id
      // 匹配的html或确保没有上下文指定为# id
      if ( match && ( match[ 1 ] || !context ) ) {

        // HANDLE: $(html) -> $(array)
        if ( match[ 1 ] ) {

          context = context instanceof jQuery ? context[ 0 ] : context;

          jQuery.merge( this, jQuery.parseHTML( 
            match[ 1 ],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
           ) );

           // HANDLE: $(html, props)
           if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
             for ( match in context ) {
               // Properties of context are called as methods if possible
               if ( jQuery.isFunction( this[ match ] ) ) {
                 this[ match ]( context[ match ] );
               }
               // ...and otherwise set as attributes
               else {
                 this.attr( match, context[ match ] );
               }
             }
           }

           return this;

        }
        // HANDLE: $(#id)
        else {
          elem = document.getElementById( match[ 2 ] );
          if ( elem ) {
            // Inject the element directly into the jQuery object
            // 直接将 elem 添加到 jQuery
            this[ 0 ] = elem;
            this.length = 1;
          }
          return this;
        }

      }
      // HANDLE: $(expr, $(...))
      else if ( !context || context.jquery ) {
        return ( context || root ).find( selector );
      }
      // HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
      else {
        return this.constructor( context ).find( selector );
      }

    }

    // HANDLE: $(DOMElement)
    // 处理 DOMElement
    else if ( selector.nodeType ) {
      this[ 0 ] = selector;
      this.length = 1;
      return this;
    }

    // HANDLE: $(function)
		// Shortcut for document ready
    // 处理 $(function() {})
    else if ( jQuery.isFunction( selector ) ) {
      return root.ready !== undefined ? 
        root.ready( selector ) : 
        // Execute immediately if ready is not present
        // 如果 ready 不存在则立即执行
        selector( jQuery ); 
    }

    return jQuery.makeArray( selector, this );

  };

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );

return init;
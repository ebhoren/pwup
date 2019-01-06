// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"Oux2":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
 * is.js 0.8.0
 * Author: Aras Atasaygin
 */

// AMD with global, Node, or global
;(function(root, factory) {    // eslint-disable-line no-extra-semi
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.is = factory());
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is self)
        root.is = factory();
    }
}(this, function() {

    // Baseline
    /* -------------------------------------------------------------------------- */

    // define 'is' object and current version
    var is = {};
    is.VERSION = '0.8.0';

    // define interfaces
    is.not = {};
    is.all = {};
    is.any = {};

    // cache some methods to call later on
    var toString = Object.prototype.toString;
    var slice = Array.prototype.slice;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // helper function which reverses the sense of predicate result
    function not(func) {
        return function() {
            return !func.apply(null, slice.call(arguments));
        };
    }

    // helper function which call predicate function per parameter and return true if all pass
    function all(func) {
        return function() {
            var params = getParams(arguments);
            var length = params.length;
            for (var i = 0; i < length; i++) {
                if (!func.call(null, params[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // helper function which call predicate function per parameter and return true if any pass
    function any(func) {
        return function() {
            var params = getParams(arguments);
            var length = params.length;
            for (var i = 0; i < length; i++) {
                if (func.call(null, params[i])) {
                    return true;
                }
            }
            return false;
        };
    }

    // build a 'comparator' object for various comparison checks
    var comparator = {
        '<': function(a, b) { return a < b; },
        '<=': function(a, b) { return a <= b; },
        '>': function(a, b) { return a > b; },
        '>=': function(a, b) { return a >= b; }
    }

    // helper function which compares a version to a range
    function compareVersion(version, range) {
        var string = (range + '');
        var n = +(string.match(/\d+/) || NaN);
        var op = string.match(/^[<>]=?|/)[0];
        return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
    }

    // helper function which extracts params from arguments
    function getParams(args) {
        var params = slice.call(args);
        var length = params.length;
        if (length === 1 && is.array(params[0])) {    // support array
            params = params[0];
        }
        return params;
    }

    // Type checks
    /* -------------------------------------------------------------------------- */

    // is a given value Arguments?
    is.arguments = function(value) {    // fallback check is for IE
        return toString.call(value) === '[object Arguments]' ||
            (value != null && typeof value === 'object' && 'callee' in value);
    };

    // is a given value Array?
    is.array = Array.isArray || function(value) {    // check native isArray first
        return toString.call(value) === '[object Array]';
    };

    // is a given value Boolean?
    is.boolean = function(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    };

    // is a given value Char?
    is.char = function(value) {
        return is.string(value) && value.length === 1;
    };

    // is a given value Date Object?
    is.date = function(value) {
        return toString.call(value) === '[object Date]';
    };

    // is a given object a DOM node?
    is.domNode = function(object) {
        return is.object(object) && object.nodeType > 0;
    };

    // is a given value Error object?
    is.error = function(value) {
        return toString.call(value) === '[object Error]';
    };

    // is a given value function?
    is['function'] = function(value) {    // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    };

    // is given value a pure JSON object?
    is.json = function(value) {
        return toString.call(value) === '[object Object]';
    };

    // is a given value NaN?
    is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself
        return value !== value;
    };

    // is a given value null?
    is['null'] = function(value) {
        return value === null;
    };

    // is a given value number?
    is.number = function(value) {
        return is.not.nan(value) && toString.call(value) === '[object Number]';
    };

    // is a given value object?
    is.object = function(value) {
        return Object(value) === value;
    };

    // is a given value RegExp?
    is.regexp = function(value) {
        return toString.call(value) === '[object RegExp]';
    };

    // are given values same type?
    // prevent NaN, Number same type check
    is.sameType = function(value, other) {
        var tag = toString.call(value);
        if (tag !== toString.call(other)) {
            return false;
        }
        if (tag === '[object Number]') {
            return !is.any.nan(value, other) || is.all.nan(value, other);
        }
        return true;
    };
    // sameType method does not support 'all' and 'any' interfaces
    is.sameType.api = ['not'];

    // is a given value String?
    is.string = function(value) {
        return toString.call(value) === '[object String]';
    };

    // is a given value undefined?
    is.undefined = function(value) {
        return value === void 0;
    };

    // is a given value window?
    // setInterval method is only available for window object
    is.windowObject = function(value) {
        return value != null && typeof value === 'object' && 'setInterval' in value;
    };

    // Presence checks
    /* -------------------------------------------------------------------------- */

    //is a given value empty? Objects, arrays, strings
    is.empty = function(value) {
        if (is.object(value)) {
            var length = Object.getOwnPropertyNames(value).length;
            if (length === 0 || (length === 1 && is.array(value)) ||
                    (length === 2 && is.arguments(value))) {
                return true;
            }
            return false;
        }
        return value === '';
    };

    // is a given value existy?
    is.existy = function(value) {
        return value != null;
    };

    // is a given value falsy?
    is.falsy = function(value) {
        return !value;
    };

    // is a given value truthy?
    is.truthy = not(is.falsy);

    // Arithmetic checks
    /* -------------------------------------------------------------------------- */

    // is a given number above minimum parameter?
    is.above = function(n, min) {
        return is.all.number(n, min) && n > min;
    };
    // above method does not support 'all' and 'any' interfaces
    is.above.api = ['not'];

    // is a given number decimal?
    is.decimal = function(n) {
        return is.number(n) && n % 1 !== 0;
    };

    // are given values equal? supports numbers, strings, regexes, booleans
    // TODO: Add object and array support
    is.equal = function(value, other) {
        // check 0 and -0 equity with Infinity and -Infinity
        if (is.all.number(value, other)) {
            return value === other && 1 / value === 1 / other;
        }
        // check regexes as strings too
        if (is.all.string(value, other) || is.all.regexp(value, other)) {
            return '' + value === '' + other;
        }
        if (is.all.boolean(value, other)) {
            return value === other;
        }
        return false;
    };
    // equal method does not support 'all' and 'any' interfaces
    is.equal.api = ['not'];

    // is a given number even?
    is.even = function(n) {
        return is.number(n) && n % 2 === 0;
    };

    // is a given number finite?
    is.finite = isFinite || function(n) {
        return is.not.infinite(n) && is.not.nan(n);
    };

    // is a given number infinite?
    is.infinite = function(n) {
        return n === Infinity || n === -Infinity;
    };

    // is a given number integer?
    is.integer = function(n) {
        return is.number(n) && n % 1 === 0;
    };

    // is a given number negative?
    is.negative = function(n) {
        return is.number(n) && n < 0;
    };

    // is a given number odd?
    is.odd = function(n) {
        return is.number(n) && n % 2 === 1;
    };

    // is a given number positive?
    is.positive = function(n) {
        return is.number(n) && n > 0;
    };

    // is a given number above maximum parameter?
    is.under = function(n, max) {
        return is.all.number(n, max) && n < max;
    };
    // least method does not support 'all' and 'any' interfaces
    is.under.api = ['not'];

    // is a given number within minimum and maximum parameters?
    is.within = function(n, min, max) {
        return is.all.number(n, min, max) && n > min && n < max;
    };
    // within method does not support 'all' and 'any' interfaces
    is.within.api = ['not'];

    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation

    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // time match hours, minutes, and seconds, 24-hour clock
    var regexes = {
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        dateString: /^(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])(?:\2)(?:[0-9]{2})?[0-9]{2}$/,
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
    };

    function regexpCheck(regexp, regexes) {
        is[regexp] = function(value) {
            return regexes[regexp].test(value);
        };
    }

    // create regexp checks methods from 'regexes' object
    for (var regexp in regexes) {
        if (regexes.hasOwnProperty(regexp)) {
            regexpCheck(regexp, regexes);
        }
    }

    // simplify IP checks by calling the regex helpers for IPv4 and IPv6
    is.ip = function(value) {
        return is.ipv4(value) || is.ipv6(value);
    };

    // String checks
    /* -------------------------------------------------------------------------- */

    // is a given string or sentence capitalized?
    is.capitalized = function(string) {
        if (is.not.string(string)) {
            return false;
        }
        var words = string.split(' ');
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word.length) {
                var chr = word.charAt(0);
                if (chr !== chr.toUpperCase()) {
                    return false;
                }
            }
        }
        return true;
    };

    // is string end with a given target parameter?
    is.endWith = function(string, target) {
        if (is.not.string(string)) {
            return false;
        }
        target += '';
        var position = string.length - target.length;
        return position >= 0 && string.indexOf(target, position) === position;
    };
    // endWith method does not support 'all' and 'any' interfaces
    is.endWith.api = ['not'];

    // is a given string include parameter target?
    is.include = function(string, target) {
        return string.indexOf(target) > -1;
    };
    // include method does not support 'all' and 'any' interfaces
    is.include.api = ['not'];

    // is a given string all lowercase?
    is.lowerCase = function(string) {
        return is.string(string) && string === string.toLowerCase();
    };

    // is a given string palindrome?
    is.palindrome = function(string) {
        if (is.not.string(string)) {
            return false;
        }
        string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
        var length = string.length - 1;
        for (var i = 0, half = Math.floor(length / 2); i <= half; i++) {
            if (string.charAt(i) !== string.charAt(length - i)) {
                return false;
            }
        }
        return true;
    };

    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    is.space = function(value) {
        if (is.not.char(value)) {
            return false;
        }
        var charCode = value.charCodeAt(0);
        return (charCode > 8 && charCode < 14) || charCode === 32;
    };

    // is string start with a given target parameter?
    is.startWith = function(string, target) {
        return is.string(string) && string.indexOf(target) === 0;
    };
    // startWith method does not support 'all' and 'any' interfaces
    is.startWith.api = ['not'];

    // is a given string all uppercase?
    is.upperCase = function(string) {
        return is.string(string) && string === string.toUpperCase();
    };

    // Time checks
    /* -------------------------------------------------------------------------- */

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    // is a given dates day equal given day parameter?
    is.day = function(date, day) {
        return is.date(date) && day.toLowerCase() === days[date.getDay()];
    };
    // day method does not support 'all' and 'any' interfaces
    is.day.api = ['not'];

    // is a given date in daylight saving time?
    is.dayLightSavingTime = function(date) {
        var january = new Date(date.getFullYear(), 0, 1);
        var july = new Date(date.getFullYear(), 6, 1);
        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
        return date.getTimezoneOffset() < stdTimezoneOffset;
    };

    // is a given date future?
    is.future = function(date) {
        var now = new Date();
        return is.date(date) && date.getTime() > now.getTime();
    };

    // is date within given range?
    is.inDateRange = function(date, start, end) {
        if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
            return false;
        }
        var stamp = date.getTime();
        return stamp > start.getTime() && stamp < end.getTime();
    };
    // inDateRange method does not support 'all' and 'any' interfaces
    is.inDateRange.api = ['not'];

    // is a given date in last month range?
    is.inLastMonth = function(date) {
        return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };

    // is a given date in last week range?
    is.inLastWeek = function(date) {
        return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };

    // is a given date in last year range?
    is.inLastYear = function(date) {
        return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };

    // is a given date in next month range?
    is.inNextMonth = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };

    // is a given date in next week range?
    is.inNextWeek = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };

    // is a given date in next year range?
    is.inNextYear = function(date) {
        return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };

    // is the given year a leap year?
    is.leapYear = function(year) {
        return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };

    // is a given dates month equal given month parameter?
    is.month = function(date, month) {
        return is.date(date) && month.toLowerCase() === months[date.getMonth()];
    };
    // month method does not support 'all' and 'any' interfaces
    is.month.api = ['not'];

    // is a given date past?
    is.past = function(date) {
        var now = new Date();
        return is.date(date) && date.getTime() < now.getTime();
    };

    // is a given date in the parameter quarter?
    is.quarterOfYear = function(date, quarter) {
        return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);
    };
    // quarterOfYear method does not support 'all' and 'any' interfaces
    is.quarterOfYear.api = ['not'];

    // is a given date indicate today?
    is.today = function(date) {
        var now = new Date();
        var todayString = now.toDateString();
        return is.date(date) && date.toDateString() === todayString;
    };

    // is a given date indicate tomorrow?
    is.tomorrow = function(date) {
        var now = new Date();
        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return is.date(date) && date.toDateString() === tomorrowString;
    };

    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    is.weekend = function(date) {
        return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
    };

    // is a given date weekday?
    is.weekday = not(is.weekend);

    // is a given dates year equal given year parameter?
    is.year = function(date, year) {
        return is.date(date) && is.number(year) && year === date.getFullYear();
    };
    // year method does not support 'all' and 'any' interfaces
    is.year.api = ['not'];

    // is a given date indicate yesterday?
    is.yesterday = function(date) {
        var now = new Date();
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return is.date(date) && date.toDateString() === yesterdayString;
    };

    // Environment checks
    /* -------------------------------------------------------------------------- */

    var freeGlobal = is.windowObject(typeof global == 'object' && global) && global;
    var freeSelf = is.windowObject(typeof self == 'object' && self) && self;
    var thisGlobal = is.windowObject(typeof this == 'object' && this) && this;
    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

    var document = freeSelf && freeSelf.document;
    var previousIs = root.is;

    // store navigator properties to use later
    var navigator = freeSelf && freeSelf.navigator;
    var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
    var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
    var vendor = (navigator && navigator.vendor || '').toLowerCase();

    // is current device android?
    is.android = function() {
        return /android/.test(userAgent);
    };
    // android method does not support 'all' and 'any' interfaces
    is.android.api = ['not'];

    // is current device android phone?
    is.androidPhone = function() {
        return /android/.test(userAgent) && /mobile/.test(userAgent);
    };
    // androidPhone method does not support 'all' and 'any' interfaces
    is.androidPhone.api = ['not'];

    // is current device android tablet?
    is.androidTablet = function() {
        return /android/.test(userAgent) && !/mobile/.test(userAgent);
    };
    // androidTablet method does not support 'all' and 'any' interfaces
    is.androidTablet.api = ['not'];

    // is current device blackberry?
    is.blackberry = function() {
        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
    };
    // blackberry method does not support 'all' and 'any' interfaces
    is.blackberry.api = ['not'];

    // is current browser chrome?
    // parameter is optional
    is.chrome = function(range) {
        var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && compareVersion(match[1], range);
    };
    // chrome method does not support 'all' and 'any' interfaces
    is.chrome.api = ['not'];

    // is current device desktop?
    is.desktop = function() {
        return is.not.mobile() && is.not.tablet();
    };
    // desktop method does not support 'all' and 'any' interfaces
    is.desktop.api = ['not'];

    // is current browser edge?
    // parameter is optional
    is.edge = function(range) {
        var match = userAgent.match(/edge\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // edge method does not support 'all' and 'any' interfaces
    is.edge.api = ['not'];

    // is current browser firefox?
    // parameter is optional
    is.firefox = function(range) {
        var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // firefox method does not support 'all' and 'any' interfaces
    is.firefox.api = ['not'];

    // is current browser internet explorer?
    // parameter is optional
    is.ie = function(range) {
        var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ie method does not support 'all' and 'any' interfaces
    is.ie.api = ['not'];

    // is current device ios?
    is.ios = function() {
        return is.iphone() || is.ipad() || is.ipod();
    };
    // ios method does not support 'all' and 'any' interfaces
    is.ios.api = ['not'];

    // is current device ipad?
    // parameter is optional
    is.ipad = function(range) {
        var match = userAgent.match(/ipad.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ipad method does not support 'all' and 'any' interfaces
    is.ipad.api = ['not'];

    // is current device iphone?
    // parameter is optional
    is.iphone = function(range) {
        // original iPhone doesn't have the os portion of the UA
        var match = userAgent.match(/iphone(?:.+?os (\d+))?/);
        return match !== null && compareVersion(match[1] || 1, range);
    };
    // iphone method does not support 'all' and 'any' interfaces
    is.iphone.api = ['not'];

    // is current device ipod?
    // parameter is optional
    is.ipod = function(range) {
        var match = userAgent.match(/ipod.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // ipod method does not support 'all' and 'any' interfaces
    is.ipod.api = ['not'];

    // is current operating system linux?
    is.linux = function() {
        return /linux/.test(appVersion);
    };
    // linux method does not support 'all' and 'any' interfaces
    is.linux.api = ['not'];

    // is current operating system mac?
    is.mac = function() {
        return /mac/.test(appVersion);
    };
    // mac method does not support 'all' and 'any' interfaces
    is.mac.api = ['not'];

    // is current device mobile?
    is.mobile = function() {
        return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
    };
    // mobile method does not support 'all' and 'any' interfaces
    is.mobile.api = ['not'];

    // is current state offline?
    is.offline = not(is.online);
    // offline method does not support 'all' and 'any' interfaces
    is.offline.api = ['not'];

    // is current state online?
    is.online = function() {
        return !navigator || navigator.onLine === true;
    };
    // online method does not support 'all' and 'any' interfaces
    is.online.api = ['not'];

    // is current browser opera?
    // parameter is optional
    is.opera = function(range) {
        var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // opera method does not support 'all' and 'any' interfaces
    is.opera.api = ['not'];

    // is current browser phantomjs?
    // parameter is optional
    is.phantom = function(range) {
        var match = userAgent.match(/phantomjs\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };
    // phantom method does not support 'all' and 'any' interfaces
    is.phantom.api = ['not'];

    // is current browser safari?
    // parameter is optional
    is.safari = function(range) {
        var match = userAgent.match(/version\/(\d+).+?safari/);
        return match !== null && compareVersion(match[1], range);
    };
    // safari method does not support 'all' and 'any' interfaces
    is.safari.api = ['not'];

    // is current device tablet?
    is.tablet = function() {
        return is.ipad() || is.androidTablet() || is.windowsTablet();
    };
    // tablet method does not support 'all' and 'any' interfaces
    is.tablet.api = ['not'];

    // is current device supports touch?
    is.touchDevice = function() {
        return !!document && ('ontouchstart' in freeSelf ||
            ('DocumentTouch' in freeSelf && document instanceof DocumentTouch));
    };
    // touchDevice method does not support 'all' and 'any' interfaces
    is.touchDevice.api = ['not'];

    // is current operating system windows?
    is.windows = function() {
        return /win/.test(appVersion);
    };
    // windows method does not support 'all' and 'any' interfaces
    is.windows.api = ['not'];

    // is current device windows phone?
    is.windowsPhone = function() {
        return is.windows() && /phone/.test(userAgent);
    };
    // windowsPhone method does not support 'all' and 'any' interfaces
    is.windowsPhone.api = ['not'];

    // is current device windows tablet?
    is.windowsTablet = function() {
        return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);
    };
    // windowsTablet method does not support 'all' and 'any' interfaces
    is.windowsTablet.api = ['not'];

    // Object checks
    /* -------------------------------------------------------------------------- */

    // has a given object got parameterized count property?
    is.propertyCount = function(object, count) {
        if (is.not.object(object) || is.not.number(count)) {
            return false;
        }
        var n = 0;
        for (var property in object) {
            if (hasOwnProperty.call(object, property) && ++n > count) {
                return false;
            }
        }
        return n === count;
    };
    // propertyCount method does not support 'all' and 'any' interfaces
    is.propertyCount.api = ['not'];

    // is given object has parameterized property?
    is.propertyDefined = function(object, property) {
        return is.object(object) && is.string(property) && property in object;
    };
    // propertyDefined method does not support 'all' and 'any' interfaces
    is.propertyDefined.api = ['not'];

    // Array checks
    /* -------------------------------------------------------------------------- */

    // is a given item in an array?
    is.inArray = function(value, array) {
        if (is.not.array(array)) {
            return false;
        }
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    };
    // inArray method does not support 'all' and 'any' interfaces
    is.inArray.api = ['not'];

    // is a given array sorted?
    is.sorted = function(array, sign) {
        if (is.not.array(array)) {
            return false;
        }
        var predicate = comparator[sign] || comparator['>='];
        for (var i = 1; i < array.length; i++) {
            if (!predicate(array[i], array[i - 1])) {
                return false;
            }
        }
        return true;
    };

    // API
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
    /* -------------------------------------------------------------------------- */

    function setInterfaces() {
        var options = is;
        for (var option in options) {
            if (hasOwnProperty.call(options, option) && is['function'](options[option])) {
                var interfaces = options[option].api || ['not', 'all', 'any'];
                for (var i = 0; i < interfaces.length; i++) {
                    if (interfaces[i] === 'not') {
                        is.not[option] = not(is[option]);
                    }
                    if (interfaces[i] === 'all') {
                        is.all[option] = all(is[option]);
                    }
                    if (interfaces[i] === 'any') {
                        is.any[option] = any(is[option]);
                    }
                }
            }
        }
    }
    setInterfaces();

    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */

    // change namespace of library to prevent name collisions
    // var preferredName = is.setNamespace();
    // preferredName.odd(3);
    // => true
    is.setNamespace = function() {
        root.is = previousIs;
        return this;
    };

    // set optional regexes to methods
    is.setRegexp = function(regexp, name) {
        for (var r in regexes) {
            if (hasOwnProperty.call(regexes, r) && (name === r)) {
                regexes[r] = regexp;
            }
        }
    };

    return is;
}));

},{}],"VeMR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.deleteCookie = exports.setCookie = exports.getCookie = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * Get the browser cookie.
 */
var getCookie = function getCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=",
      ca = document.cookie.split(';');

  for (var i = 0, n = ca.length, c; i < n; i++) {
    c = ca[i];

    while (_is_js.default.startWith(c, ' ')) {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }

  return null;
};
/**
 * Set the browser cookie. The option param can set the following parameters: days, hour, path, domain, secure, raw.
 */


exports.getCookie = getCookie;

var setCookie = function setCookie(name, value, option) {
  var longTime = 10,
      val = option && option.raw ? value : encodeURIComponent(value);
  var cookie = encodeURIComponent(name) + "=" + val;

  if (option) {
    var date, ms;

    if (option.days) {
      date = new Date();
      ms = option.days * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += "; expires=" + date.toGMTString();
    } else if (option.hour) {
      date = new Date();
      ms = option.hour * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += "; expires=" + date.toGMTString();
    } else {
      date = new Date();
      ms = longTime * 365 * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += "; expires=" + date.toGMTString();
    }

    if (option.path) cookie += "; path=" + option.path;
    if (option.domain) cookie += "; domain=" + option.domain;
    if (option.secure) cookie += "; true";
  }

  document.cookie = cookie;
};
/**
 * Delete the browser cookie.
 */


exports.setCookie = setCookie;

var deleteCookie = function deleteCookie(name) {
  setCookie(name, "", {
    hour: -1
  });
};

exports.deleteCookie = deleteCookie;
var _default = {
  getCookie: getCookie,
  setCookie: setCookie,
  deleteCookie: deleteCookie
};
exports.default = _default;
},{"is_js":"Oux2"}],"R3RY":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*

──────────────────────────────────────────
──────────────────────────────────────────
DELAY
──────────────────────────────────────────
──────────────────────────────────────────

const delay = new Delay(function(){
  // do something
}, 3500);

delay.start();
delay.stop();
delay.reset();

*/
var Delay = function Delay(cb, duration) {
  var raf, startTime; // PRIVATE API

  var loop = function loop(now) {
    if (!startTime) startTime = now;
    var progress = duration > 0 ? Math.min((now - startTime) / duration, 1) : 1;
    if (progress + 0.0000001 < 1) raf = requestAnimationFrame(loop);else if (cb) cb();
  }; // PUBLIC API


  var start = function start() {
    if (raf) stop();
    raf = requestAnimationFrame(loop);
  };

  var stop = function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  };

  var reset = function reset() {
    startTime = null;
  };

  var ctx = {
    start: start,
    stop: stop,
    reset: reset
  };
  return ctx;
};

var _default = Delay;
exports.default = _default;
},{}],"10YE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*

──────────────────────────────────────────
──────────────────────────────────────────
DOM
──────────────────────────────────────────
──────────────────────────────────────────

const body = DOM.body

*/
var DOM = {
  html: document.documentElement,
  body: document.body
};
var _default = DOM;
exports.default = _default;
},{}],"1VuZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.queryAll = exports.query = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

var _DOM = _interopRequireDefault(require("./DOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
var query = function query() {
  var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _DOM.default.body;
  var $selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (_is_js.default.string($selector)) return $el.querySelector($selector);else if (_is_js.default.domNode($selector)) return $selector;else if (_is_js.default.array($selector)) return $selector[0];
  return null;
};
/**
 *
 */


exports.query = query;

var queryAll = function queryAll() {
  var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _DOM.default.body;
  var $selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (_is_js.default.string($selector)) return $el.querySelectorAll($selector);else if (_is_js.default.domNode($selector)) return [$selector];else if (_is_js.default.array($selector)) return $selector;
  return null;
};

exports.queryAll = queryAll;
var _default = {
  query: query,
  queryAll: queryAll
};
exports.default = _default;
},{"is_js":"Oux2","./DOM":"10YE"}],"/YM+":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.once = exports.off = exports.on = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

var _query = require("../dom/query");

var _this = void 0,
    _arguments = arguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passiveEvents = ['touchmove', 'mousemove', 'scroll', 'mouseWheel', 'touchstart'];

var getOptions = function getOptions($type) {
  return passiveEvents.indexOf($type) === -1 ? false : {
    passive: false
  };
};

var normalizeEventType = function normalizeEventType($type) {
  if ($type === 'mouseWheel') {
    return 'onwheel' in document ? 'wheel' : _is_js.default.existy(document.onmousewheel) ? 'mousewheel' : 'DOMMouseScroll';
  } else if ($type === 'focusOut') {
    return _is_js.default.firefox() ? 'blur' : 'focusout';
  }

  return $type;
};

var listen = function listen($el, $action, $type, $cb) {
  var el = (0, _query.queryAll)($el),
      t = normalizeEventType($type),
      o = getOptions($type);

  for (var i = 0, n = el.length; i < n; i++) {
    el[i][$action + 'EventListener'](t, cb, o);
  }
};

var on = function on($el, $type, $cb) {
  listen($el, 'add', $type, $cb);
};

exports.on = on;

var off = function off($el, $type, $cb) {
  listen($el, 'remove', $type, $cb);
};

exports.off = off;

var once = function once($el, $type, $cb) {
  var cb = function cb() {
    listen(_this, 'remove', $type, cb);
    $cb.call(_this, _arguments);
  };

  listen($el, 'add', $type, cb);
};

exports.once = once;
var _default = {
  on: on,
  off: off,
  once: once
};
exports.default = _default;
},{"is_js":"Oux2","../dom/query":"1VuZ"}],"CMlS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

/*

──────────────────────────────────────────
──────────────────────────────────────────
HAS
──────────────────────────────────────────
──────────────────────────────────────────

has(object, 'property')

*/
function has(obj, key) {
  return obj ? hasOwnProperty.call(obj, key) : false;
}
},{}],"jxB8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*

──────────────────────────────────────────
──────────────────────────────────────────
THROTTLE
──────────────────────────────────────────
──────────────────────────────────────────

►►►  firstTime for window resizer

const throttle = new S.Throttle({
    cb: callback,
    delay: 200
    onlyAtEnd: true
})

throttle.init()

*/
var Throttle = function Throttle() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    delay: 200,
    onlyAtEnd: false
  };
  var delay = options.delay,
      cb = options.cb,
      onlyAtEnd = options.onlyAtEnd;
  var last, timer;

  var init = function init() {
    var firstTime = true,
        now = Date.now();

    if (last && now < last + delay || firstTime) {
      firstTime = false;
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        cb();
      }, delay);
    } else {
      last = now;

      if (!onlyAtEnd) {
        firstTime = false;
        cb();
      }
    }
  };

  var ctx = {
    init: init
  };
  return ctx;
};

var _default = Throttle;
exports.default = _default;
},{}],"zXBI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.deleteUrlParam = exports.setUrlParam = exports.getUrlParam = void 0;

/*

──────────────────────────────────────────
──────────────────────────────────────────
URL PARAMS
──────────────────────────────────────────
──────────────────────────────────────────

var id  = getUrlParam('id');
var id  = getUrlParam('id', 'my_custom_url');
var url = setUrlParam('id', 'Hello World');
var url = setUrlParam('id', 'Hello World', 'my_custom_url');
var url = deleteUrlParam('id');
var url = deleteUrlParam('id', 'my_custom_url');

*/

/**
 * Get the url parameter of the current page(or custom).
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
var getUrlParam = function getUrlParam(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
/**
* Set the current page (or custom) url parameters, return the modified url.
* From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
*/


exports.getUrlParam = getUrlParam;

var setUrlParam = function setUrlParam(key, value) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.href;
  var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");

  if (url.match(re)) {
    return url.replace(re, "$1" + key + "=" + encodeURIComponent(value) + "$2");
  } else {
    var hash = "";

    if (url.indexOf("#") !== -1) {
      hash = url.replace(/.*#/, "#");
      url = url.replace(/#.*/, "");
    }

    var separator = url.indexOf("?") !== -1 ? "&" : "?";
    return url + separator + key + "=" + encodeURIComponent(value) + hash;
  }
};
/**
 * Delete the current page (or custom) url parameter, return the modified url.
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */


exports.setUrlParam = setUrlParam;

var deleteUrlParam = function deleteUrlParam(param) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');

  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(param) + '=';
    var pars = urlparts[1].split(/[&;]/g); //reverse iteration as may be destructive

    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
  }

  return url;
};

exports.deleteUrlParam = deleteUrlParam;
var _default = {
  getUrlParam: getUrlParam,
  setUrlParam: setUrlParam,
  deleteUrlParam: deleteUrlParam
};
exports.default = _default;
},{}],"hMGG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
──────────────────────────────────────────
──────────────────────────────────────────
WIN
──────────────────────────────────────────
──────────────────────────────────────────
const windowHeight = win.height;
const path = win.path;
*/
var win = {
  get width() {
    return innerWidth;
  },

  get height() {
    return innerHeight;
  },

  get path() {
    return location.pathname;
  },

  get hostname() {
    return location.hostname;
  },

  get href() {
    return location.href;
  }

};
var _default = win;
exports.default = _default;
},{}],"TL2n":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cookie = _interopRequireDefault(require("./cookie"));

var _delay = _interopRequireDefault(require("./delay"));

var _event = _interopRequireDefault(require("./event"));

var _has = _interopRequireDefault(require("./has"));

var _throttle = _interopRequireDefault(require("./throttle"));

var _url = _interopRequireDefault(require("./url"));

var _window = _interopRequireDefault(require("./window"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  cookie: _cookie.default,
  delay: _delay.default,
  event: _event.default,
  has: _has.default,
  throttle: _throttle.default,
  url: _url.default,
  win: _window.default
};
exports.default = _default;
},{"./cookie":"VeMR","./delay":"R3RY","./event":"/YM+","./has":"CMlS","./throttle":"jxB8","./url":"zXBI","./window":"hMGG"}],"STW7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOM = _interopRequireDefault(require("./DOM"));

var _query = _interopRequireDefault(require("./query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  DOM: _DOM.default,
  query: _query.default
};
exports.default = _default;
},{"./DOM":"10YE","./query":"1VuZ"}],"JuFe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

var _event = require("../core/event");

var _query = require("../dom/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// CACHE MOBILE DETECTION RESULT
var IS_MOBILE = _is_js.default.mobile();

var EVENT_TYPE = IS_MOBILE ? 'touchmove' : 'mousemove';

var MouseMove = function MouseMove(options) {
  var el = (0, _query.query)(options.element) || document;
  var cb = options.cb;
  var tick, event; // PRIVATE API

  var gRaf = function gRaf(e) {
    event = e;
    if (event.cancelable) event.preventDefault();

    if (!tick) {
      requestAnimationFrame(_run);
      tick = true;
    }
  }; // PUBLIC API


  var _on = function _on() {
    (0, _event.on)(el, EVENT_TYPE, gRaf);
  };

  var _off = function _off() {
    (0, _event.off)(el, EVENT_TYPE, gRaf);
  };

  var _run = function _run() {
    var t = IS_MOBILE ? event.changedTouches[0] : event;
    cb(t['pageX'], t['pageY'], event);
    tick = false;
  };

  var ctx = {
    on: _on,
    off: _off,
    run: _run
  };
  return ctx;
};

var _default = MouseMove;
exports.default = _default;
},{"is_js":"Oux2","../core/event":"/YM+","../dom/query":"1VuZ"}],"58KS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

var _throttle = _interopRequireDefault(require("../core/throttle"));

var _event = require("../core/event");

var _query = require("../dom/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// CACHE MOBILE DETECTION RESULT
var IS_MOBILE = _is_js.default.mobile();

var EVENT_TYPE = IS_MOBILE ? 'orientationchange' : 'resize';

var ResizeOrientation = function ResizeOrientation(options) {
  var cb = options.cb;
  var throttle = new _throttle.default({
    cb: gRaf,
    delay: options.throttle.delay,
    onlyAtEnd: options.throttle.onlyAtEnd
  });
  var tick, event; // PRIVATE API

  var gRaf = function gRaf() {
    if (!tick) {
      requestAnimationFrame(_run);
      tick = true;
    }
  };

  var getThrottle = function getThrottle(e) {
    event = e;
    throttle.init();
  }; // PUBLIC API


  var _on = function _on() {
    (0, _event.on)(window, EVENT_TYPE, getThrottle);
  };

  var _off = function _off() {
    (0, _event.off)(window, EVENT_TYPE, getThrottle);
  };

  var _run = function _run() {
    cb(event);
    tick = false;
  };

  var ctx = {
    on: _on,
    off: _off,
    run: _run
  };
  return ctx;
};

var _default = ResizeOrientation;
exports.default = _default;
},{"is_js":"Oux2","../core/throttle":"jxB8","../core/event":"/YM+","../dom/query":"1VuZ"}],"lxAK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = require("../core/event");

/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL
──────────────────────────────────────────
──────────────────────────────────────────

const scroll = new Scroll(scrollCb);
      scroll.on();  // start listening to window's scroll event
      scroll.off(); // stop listening to window's scroll event
      scroll.run(); // execute object callback

function scrollCb(currentScrollY, delta, event) {
  // do something
}

*/
var Scroll = function Scroll(cb) {
  var tick = false,
      startScrollY = 0,
      event; // PRIVATE API

  var gRaf = function gRaf(e) {
    event = e;

    if (!tick) {
      requestAnimationFrame(_run);
      tick = true;
    }
  }; // PUBLIC API


  var _on = function _on() {
    startScrollY = pageYOffset;
    (0, _event.on)(window, 'scroll', gRaf);
  };

  var _off = function _off() {
    (0, _event.off)(window, 'scroll', gRaf);
  };

  var _run = function _run() {
    var currentScrollY = pageYOffset,
        delta = -(currentScrollY - startScrollY); // Reset start scroll y

    startScrollY = currentScrollY;
    cb(currentScrollY, delta, event);
    tick = false;
  };

  var ctx = {
    on: _on,
    off: _off,
    run: _run
  };
  return ctx;
};

var _default = Scroll;
exports.default = _default;
},{"../core/event":"/YM+"}],"AAvC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = require("../core/event");

/*

──────────────────────────────────────────
──────────────────────────────────────────
TAB
──────────────────────────────────────────
──────────────────────────────────────────

const tab = new Tab(tabVisibilityChange);
      tab.on();   // start listening to tab visibility change
      tab.off();  // stop listening to tab visibility change
      tab.run();  // execute object callback

function tabVisibilityChange(hidden) {
  if( hidden === true ) {
    // do something
  } else {
    // do something
  }
}
*/
var Tab = function Tab(cb) {
  // PUBLIC API
  var _on = function _on() {
    (0, _event.on)(document, 'visibilitychange', _run);
  };

  var _off = function _off() {
    (0, _event.off)(document, 'visibilitychange', _run);
  };

  var _run = function _run() {
    cb(document.hidden);
  };

  var ctx = {
    on: _on,
    off: _off,
    run: _run
  };
};

var _default = Tab;
exports.default = _default;
},{"../core/event":"/YM+"}],"JNcX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

var _event = require("../core/event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var WheelTouch = function WheelTouch(cb) {
  var tick = false,
      event,
      type,
      delta,
      startY; // PRIVATE API

  var gRaf = function gRaf(e) {
    event = e;
    if (event.cancelable) event.preventDefault();

    if (!tick) {
      requestAnimationFrame(_run);
      tick = true;
    }
  };

  var onWheel = function onWheel() {
    type = 'scroll';
    delta = event.wheelDeltaY || event.deltaY * -1; // deltamode === 1 -> wheel mouse, not touch pad
    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes

    if (_is_js.default.firefox() && event.deltaMode === 1) delta *= 40;
    getCb();
  };

  var onMouseWheel = function onMouseWheel() {
    type = 'scroll';
    delta = event.wheelDeltaY ? event.wheelDeltaY : event.wheelDelta;
    getCb();
  };

  var onTouchStart = function onTouchStart(e) {
    startY = e.targetTouches[0].pageY;
  };

  var onTouchMove = function onTouchMove() {
    type = 'touch';
    delta = event.targetTouches[0].pageY - startY;
    getCb();
  };

  var getCb = function getCb() {
    cb(delta, type, event);
    tick = false;
  }; // PUBLIC API


  var _on = function _on() {
    (0, _event.on)(document, 'mouseWheel', gRaf);
    (0, _event.on)(document, 'touchstart', onTouchStart);
    (0, _event.on)(document, 'touchmove', gRaf);
  };

  var _off = function _off() {
    (0, _event.off)(document, 'mouseWheel', gRaf);
    (0, _event.off)(document, 'touchstart', onTouchStart);
    (0, _event.off)(document, 'touchmove', gRaf);
  };

  var _run = function _run() {
    var eType = event.type;
    if (eType === 'wheel') onWheel();else if (eType === 'mousewheel') onMouseWheel();else if (eType === 'touchmove') onTouchMove();
  };

  var ctx = {
    on: _on,
    off: _off
  };
  return ctx;
};

var _default = WheelTouch;
exports.default = _default;
},{"is_js":"Oux2","../core/event":"/YM+"}],"xVAX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = require("../core/event");

/*

──────────────────────────────────────────
──────────────────────────────────────────
WHEEL & TOUCH PREVENT
──────────────────────────────────────────
──────────────────────────────────────────

WTP.on();   // prevent all touchMove & mouseWheel events on document
WTP.off();  // restore touchMove & mouseWheel events on document

*/
var WTP = function WTP() {
  // PRIVATE API
  var cancel = function cancel(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  var ctx = {
    on: function on() {
      (0, _event.on)(document, 'mouseWheel', cancel);
      (0, _event.on)(document, 'touchmove', cancel);
    },
    off: function off() {
      (0, _event.off)(document, 'mouseWheel', cancel);
      (0, _event.off)(document, 'touchmove', cancel);
    }
  };
  return ctx;
};

var wtp = new WTP();
var _default = wtp;
exports.default = _default;
},{"../core/event":"/YM+"}],"55WM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mousemove = _interopRequireDefault(require("./mousemove"));

var _resizeOrientation = _interopRequireDefault(require("./resizeOrientation"));

var _scroll = _interopRequireDefault(require("./scroll"));

var _tab = _interopRequireDefault(require("./tab"));

var _wheelTouch = _interopRequireDefault(require("./wheelTouch"));

var _wheelTouchPrevent = _interopRequireDefault(require("./wheelTouchPrevent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  MouseMove: _mousemove.default,
  ResizeOrientation: _resizeOrientation.default,
  Scroll: _scroll.default,
  Tab: _tab.default,
  WheelTouch: _wheelTouch.default,
  WheelTouchPrevent: _wheelTouchPrevent.default
};
exports.default = _default;
},{"./mousemove":"JuFe","./resizeOrientation":"58KS","./scroll":"lxAK","./tab":"AAvC","./wheelTouch":"JNcX","./wheelTouchPrevent":"xVAX"}],"eJor":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lerp;

/*

──────────────────────────────────────────
──────────────────────────────────────────
LERP
──────────────────────────────────────────
──────────────────────────────────────────

►►►  simple lerp (!== OP's algorithm used to prevent the floating-point error)

lerp(start, end, multiplier);
lerp(0, 100, 0.12);

*/
function lerp(s, e, m) {
  return s * (1 - m) + e * m;
}
},{}],"Mo7q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.randomFromA2B = exports.randomFromArray = exports.randomColor = void 0;

/*

──────────────────────────────────────────
──────────────────────────────────────────
RANDOM
──────────────────────────────────────────
──────────────────────────────────────────

var color = randomColor();
var randomValue = randomFromArray(['a', 'b', 'c', 'd', 'e']);
var randomValue = randomFromA2B(10, 100); // return a floating number
var randomValue = randomFromA2B(10, 100, true); // will return a integer instead of floating number

*/

/**
 * Returns the hex format random color.
 */
var randomColor = function randomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
};
/**
 * Returns a random item in the array.
 */


exports.randomColor = randomColor;

var randomFromArray = function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
/**
 * Returns the random number between two numbers.
 */


exports.randomFromArray = randomFromArray;

var randomFromA2B = function randomFromA2B(a, b) {
  var int = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
};

exports.randomFromA2B = randomFromA2B;
var _default = {
  randomColor: randomColor,
  randomFromArray: randomFromArray,
  randomFromA2B: randomFromA2B
};
exports.default = _default;
},{}],"QWL+":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = round;

/*

──────────────────────────────────────────
──────────────────────────────────────────
ROUND
──────────────────────────────────────────
──────────────────────────────────────────

round(number, precision)

►►►  precision is optional → 3 by default

0 → 1
1 → 0.1
2 → 0.01
3 → 0.001

*/
function round($n) {
  var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  if (p < 0 || p > 3) throw new Error('Precision can only be between 0 and 3.');
  p = Math.pow(10, p);
  return Math.round($n * p) / p;
}
},{}],"OFwd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lerp = _interopRequireDefault(require("./lerp"));

var _random = _interopRequireDefault(require("./random"));

var _round = _interopRequireDefault(require("./round"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  lerp: _lerp.default,
  random: _random.default,
  round: _round.default
};
exports.default = _default;
},{"./lerp":"eJor","./random":"Mo7q","./round":"QWL+"}],"ZJQD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _is_js = _interopRequireDefault(require("is_js"));

var _DOM = _interopRequireDefault(require("../dom/DOM"));

var _wheelTouchPrevent = _interopRequireDefault(require("../events/wheelTouchPrevent"));

var _lerp = _interopRequireDefault(require("../math/lerp"));

var _round = _interopRequireDefault(require("../math/round"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var ScrollTo = function ScrollTo(options) {
  var d = document,
      scrollNode = d.scrollingElement ? d.scrollingElement : _DOM.default.body,
      // Chrome v.61
  scrollable = _is_js.default.firefox() || _is_js.default.ie() ? d.documentElement : scrollNode,
      start = pageYOffset,
      end = options.dest; //var anim = new S.M({d: options.duration, e: options.easing, update, cb: getCb});

  if (start === end) getCb();else {
    _wheelTouchPrevent.default.on(); //anim.play();

  }
  ;

  var update = function update(v) {
    scrollable.scrollTop = (0, _round.default)(_lerp.default.init(start, end, v.progress));
  };

  var getCb = function getCb() {
    _wheelTouchPrevent.default.off();

    if (options.cb) options.cb();
  };
};

var _default = ScrollTo;
exports.default = _default;
},{"is_js":"Oux2","../dom/DOM":"10YE","../events/wheelTouchPrevent":"xVAX","../math/lerp":"eJor","../math/round":"QWL+"}],"Ntq9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
var ScrollTopWhenPageRefresh = function ScrollTopWhenPageRefresh() {
  var active = false,
      scrollRestoration = 'auto',
      oldWindowBeforeUnload;
  return {
    on: function on() {
      // skip all if already activated
      if (active === true) return;
      active = true; // if scrollRestoration API is available

      if ('scrollRestoration' in history) {
        // save previous history.scrollRestoration value
        // change history.scrollRestoration to manual
        scrollRestoration = history.scrollRestoration;
        history.scrollRestoration = 'manual';
      } else {
        // save previous window.onbeforeunload
        // change window.onbeforeunload to scroll window to top, then run old window.onbeforeunload
        oldWindowBeforeUnload = window.onbeforeunload || null;

        window.onbeforeunload = function () {
          window.scrollTo(0, 0);
          if (oldWindowBeforeUnload) oldWindowBeforeUnload();
        };
      }
    },
    off: function off() {
      // skip all if not activated
      if (active === false) return; // restore defaults behaviors

      if ('scrollRestoration' in history) history.scrollRestoration = scrollRestoration || 'auto';else window.onbeforeunload = oldWindowBeforeUnload;
      active = false;
    }
  };
};

var _default = ScrollTopWhenPageRefresh;
exports.default = _default;
},{}],"of+w":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lerp = _interopRequireDefault(require("../math/lerp"));

var _scrollTo = _interopRequireDefault(require("./scrollTo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var ScrollToTop = function ScrollToTop(options) {
  var currentPos = pageYOffset; // PRIVATE API

  var getDuration = function getDuration() {
    var coeff = (0, _lerp.default)(300, 1500, currentPos / options.totalHeight);
    return currentPos === 0 ? 0 : coeff;
  };

  var getEase = function getEase() {
    var step = 500;
    if (currentPos <= step * 5) return 'Power' + Math.ceil(currentPos / step) + 'InOut';else return 'ExpoInOut';
  }; // start scrolling


  (0, _scrollTo.default)({
    dest: 0,
    duration: getDuration(),
    easing: getEase(),
    cb: options.cb
  });
};

var _default = ScrollToTop;
exports.default = _default;
},{"../math/lerp":"eJor","./scrollTo":"ZJQD"}],"0GPr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL ZERO
──────────────────────────────────────────
──────────────────────────────────────────

►►►  Scroll immediatly to top

ScrollZero();

*/
var ScrollZero = function ScrollZero() {
  window.scrollTo(0, 0);
};

var _default = ScrollZero;
exports.default = _default;
},{}],"fqIj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scrollTo = _interopRequireDefault(require("./scrollTo"));

var _scrollTopWhenPageRefresh = _interopRequireDefault(require("./scrollTopWhenPageRefresh"));

var _scrollToTop = _interopRequireDefault(require("./scrollToTop"));

var _scrollZero = _interopRequireDefault(require("./scrollZero"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  ScrollTo: _scrollTo.default,
  ScrollToTop: _scrollToTop.default,
  ScrollTopWhenPageRefresh: _scrollTopWhenPageRefresh.default,
  ScrollZero: _scrollZero.default
};
exports.default = _default;
},{"./scrollTo":"ZJQD","./scrollTopWhenPageRefresh":"Ntq9","./scrollToTop":"of+w","./scrollZero":"0GPr"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("./src/core"));

var _dom = _interopRequireDefault(require("./src/dom"));

var _events = _interopRequireDefault(require("./src/events"));

var _math = _interopRequireDefault(require("./src/math"));

var _scroll = _interopRequireDefault(require("./src/scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  core: _core.default,
  dom: _dom.default,
  events: _events.default,
  math: _math.default,
  scroll: _scroll.default
};
exports.default = _default;
},{"./src/core":"TL2n","./src/dom":"STW7","./src/events":"55WM","./src/math":"OFwd","./src/scroll":"fqIj"}]},{},["Focm"], "Penny")
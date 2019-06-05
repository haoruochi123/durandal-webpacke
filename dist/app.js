/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/durandal-webpack/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The system module encapsulates the most basic features used by other modules.
	 * @module system
	 * @requires require
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(require, $) {
	    var isDebugging = false,
	        nativeKeys = Object.keys,
	        hasOwnProperty = Object.prototype.hasOwnProperty,
	        toString = Object.prototype.toString,
	        system,
	        treatAsIE8 = false,
	        nativeIsArray = Array.isArray,
	        slice = Array.prototype.slice;
	
	    //polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	    if (!String.prototype.trim) {
	        String.prototype.trim = function () {
	            return this.replace(/^\s+|\s+$/g, '');
	        };
	    }
	
	    //see http://patik.com/blog/complete-cross-browser-console-log/
	    // Tell IE9 to use its built-in console
	    if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log == 'object') {
	        try {
	            ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd']
	                .forEach(function(method) {
	                    console[method] = this.call(console[method], console);
	                }, Function.prototype.bind);
	        } catch (ex) {
	            treatAsIE8 = true;
	        }
	    }
	
	    // callback for dojo's loader
	    // note: if you wish to use Durandal with dojo's AMD loader,
	    // currently you must fork the dojo source with the following
	    // dojo/dojo.js, line 1187, the last line of the finishExec() function:
	    //  (add) signal("moduleLoaded", [module.result, module.mid]);
	    // an enhancement request has been submitted to dojo to make this
	    // a permanent change. To view the status of this request, visit:
	    // http://bugs.dojotoolkit.org/ticket/16727
	
	    if (__webpack_require__(15).on) {
	        __webpack_require__(15).on("moduleLoaded", function(module, mid) {
	            system.setModuleId(module, mid);
	        });
	    }
	
	    // callback for require.js loader
	    if (typeof requirejs !== 'undefined') {
	        requirejs.onResourceLoad = function(context, map, depArray) {
	            system.setModuleId(context.defined[map.id], map.id);
	        };
	    }
	
	    var noop = function() { };
	
	    var log = function() {
	        try {
	            // Modern browsers
	            if (typeof console != 'undefined' && typeof console.log == 'function') {
	                // Opera 11
	                if (window.opera) {
	                    var i = 0;
	                    while (i < arguments.length) {
	                        console.log('Item ' + (i + 1) + ': ' + arguments[i]);
	                        i++;
	                    }
	                }
	                // All other modern browsers
	                else if ((slice.call(arguments)).length == 1 && typeof slice.call(arguments)[0] == 'string') {
	                    console.log((slice.call(arguments)).toString());
	                } else {
	                    console.log.apply(console, slice.call(arguments));
	                }
	            }
	            // IE8
	            else if ((!Function.prototype.bind || treatAsIE8) && typeof console != 'undefined' && typeof console.log == 'object') {
	                Function.prototype.call.call(console.log, console, slice.call(arguments));
	            }
	
	            // IE7 and lower, and other old browsers
	        } catch (ignore) { }
	    };
	
	    var logError = function(error, err) {
	        var exception;
	
	        if(error instanceof Error){
	            exception = error;
	        } else {
	            exception = new Error(error);
	        }
	
	        exception.innerError = err;
	
	        //Report the error as an error, not as a log
	        try {
	            // Modern browsers (it's only a single item, no need for argument splitting as in log() above)
	            if (typeof console != 'undefined' && typeof console.error == 'function') {
	                console.error(exception);
	            }
	            // IE8
	            else if ((!Function.prototype.bind || treatAsIE8) && typeof console != 'undefined' && typeof console.error == 'object') {
	                Function.prototype.call.call(console.error, console, exception);
	            }
	            // IE7 and lower, and other old browsers
	        } catch (ignore) { }
	
	        throw exception;
	    };
	
	    /**
	     * @class SystemModule
	     * @static
	     */
	    system = {
	        /**
	         * Durandal's version.
	         * @property {string} version
	         */
	        version: "2.2.0",
	        /**
	         * A noop function.
	         * @method noop
	         */
	        noop: noop,
	        /**
	         * Gets the module id for the specified object.
	         * @method getModuleId
	         * @param {object} obj The object whose module id you wish to determine.
	         * @return {string} The module id.
	         */
	        getModuleId: function(obj) {
	            if (!obj) {
	                return null;
	            }
	
	            if (typeof obj == 'function' && obj.prototype) {
	                return obj.prototype.__moduleId__;
	            }
	
	            if (typeof obj == 'string') {
	                return null;
	            }
	
	            return obj.__moduleId__;
	        },
	        /**
	         * Sets the module id for the specified object.
	         * @method setModuleId
	         * @param {object} obj The object whose module id you wish to set.
	         * @param {string} id The id to set for the specified object.
	         */
	        setModuleId: function(obj, id) {
	            if (!obj) {
	                return;
	            }
	
	            if (typeof obj == 'function' && obj.prototype) {
	                obj.prototype.__moduleId__ = id;
	                return;
	            }
	
	            if (typeof obj == 'string') {
	                return;
	            }
	
	            obj.__moduleId__ = id;
	        },
	        /**
	         * Resolves the default object instance for a module. If the module is an object, the module is returned. If the module is a function, that function is called with `new` and it's result is returned.
	         * @method resolveObject
	         * @param {object} module The module to use to get/create the default object for.
	         * @return {object} The default object for the module.
	         */
	        resolveObject: function(module) {
	            if (system.isFunction(module)) {
	                return new module();
	            } else {
	                return module;
	            }
	        },
	        /**
	         * Gets/Sets whether or not Durandal is in debug mode.
	         * @method debug
	         * @param {boolean} [enable] Turns on/off debugging.
	         * @return {boolean} Whether or not Durandal is current debugging.
	         */
	        debug: function(enable) {
	            if (arguments.length == 1) {
	                isDebugging = enable;
	                if (isDebugging) {
	                    this.log = log;
	                    this.error = logError;
	                    this.log('Debug:Enabled');
	                } else {
	                    this.log('Debug:Disabled');
	                    this.log = noop;
	                    this.error = noop;
	                }
	            }
	
	            return isDebugging;
	        },
	        /**
	         * Logs data to the console. Pass any number of parameters to be logged. Log output is not processed if the framework is not running in debug mode.
	         * @method log
	         * @param {object} info* The objects to log.
	         */
	        log: noop,
	        /**
	         * Logs an error.
	         * @method error
	         * @param {string|Error} obj The error to report.
	         */
	        error: noop,
	        /**
	         * Asserts a condition by throwing an error if the condition fails.
	         * @method assert
	         * @param {boolean} condition The condition to check.
	         * @param {string} message The message to report in the error if the condition check fails.
	         */
	        assert: function (condition, message) {
	            if (!condition) {
	                system.error(new Error(message || 'Assert:Failed'));
	            }
	        },
	        /**
	         * Creates a deferred object which can be used to create a promise. Optionally pass a function action to perform which will be passed an object used in resolving the promise.
	         * @method defer
	         * @param {function} [action] The action to defer. You will be passed the deferred object as a paramter.
	         * @return {Deferred} The deferred object.
	         */
	        defer: function(action) {
	            return $.Deferred(action);
	        },
	        /**
	         * Creates a simple V4 UUID. This should not be used as a PK in your database. It can be used to generate internal, unique ids. For a more robust solution see [node-uuid](https://github.com/broofa/node-uuid).
	         * @method guid
	         * @return {string} The guid.
	         */
	        guid: function() {
	            var d = new Date().getTime();
	            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	                var r = (d + Math.random() * 16) % 16 | 0;
	                d = Math.floor(d/16);
	                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	            });
	        },
	        /**
	         * Uses require.js to obtain a module. This function returns a promise which resolves with the module instance. You can pass more than one module id to this function or an array of ids. If more than one or an array is passed, then the promise will resolve with an array of module instances.
	         * @method acquire
	         * @param {string|string[]} moduleId The id(s) of the modules to load.
	         * @return {Promise} A promise for the loaded module(s).
	         */
	        acquire: function() {
	            var modules,
	                first = arguments[0],
	                arrayRequest = false;
	
	            if(system.isArray(first)){
	                modules = first;
	                arrayRequest = true;
	            }else{
	                modules = slice.call(arguments, 0);
	            }
	
	            return this.defer(function(dfd) {
	                __webpack_require__(15)(modules, function() {
	                    var args = arguments;
	                    setTimeout(function() {
	                        if(args.length > 1 || arrayRequest){
	                            dfd.resolve(slice.call(args, 0));
	                        }else{
	                            dfd.resolve(args[0]);
	                        }
	                    }, 1);
	                }, function(err){
	                    dfd.reject(err);
	                });
	            }).promise();
	        },
	        /**
	         * Extends the first object with the properties of the following objects.
	         * @method extend
	         * @param {object} obj The target object to extend.
	         * @param {object} extension* Uses to extend the target object.
	         */
	        extend: function(obj) {
	            var rest = slice.call(arguments, 1);
	
	            for (var i = 0; i < rest.length; i++) {
	                var source = rest[i];
	
	                if (source) {
	                    for (var prop in source) {
	                        obj[prop] = source[prop];
	                    }
	                }
	            }
	
	            return obj;
	        },
	        /**
	         * Uses a setTimeout to wait the specified milliseconds.
	         * @method wait
	         * @param {number} milliseconds The number of milliseconds to wait.
	         * @return {Promise}
	         */
	        wait: function(milliseconds) {
	            return system.defer(function(dfd) {
	                setTimeout(dfd.resolve, milliseconds);
	            }).promise();
	        }
	    };
	
	    /**
	     * Gets all the owned keys of the specified object.
	     * @method keys
	     * @param {object} object The object whose owned keys should be returned.
	     * @return {string[]} The keys.
	     */
	    system.keys = nativeKeys || function(obj) {
	        if (obj !== Object(obj)) {
	            throw new TypeError('Invalid object');
	        }
	
	        var keys = [];
	
	        for (var key in obj) {
	            if (hasOwnProperty.call(obj, key)) {
	                keys[keys.length] = key;
	            }
	        }
	
	        return keys;
	    };
	
	    /**
	     * Determines if the specified object is an html element.
	     * @method isElement
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isElement = function(obj) {
	        return !!(obj && obj.nodeType === 1);
	    };
	
	    /**
	     * Determines if the specified object is an array.
	     * @method isArray
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isArray = nativeIsArray || function(obj) {
	        return toString.call(obj) == '[object Array]';
	    };
	
	    /**
	     * Determines if the specified object is...an object. ie. Not an array, string, etc.
	     * @method isObject
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isObject = function(obj) {
	        return obj === Object(obj);
	    };
	
	    /**
	     * Determines if the specified object is a boolean.
	     * @method isBoolean
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isBoolean = function(obj) {
	        return typeof(obj) === "boolean";
	    };
	
	    /**
	     * Determines if the specified object is a promise.
	     * @method isPromise
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	    system.isPromise = function(obj) {
	        return obj && system.isFunction(obj.then);
	    };
	
	    /**
	     * Determines if the specified object is a function arguments object.
	     * @method isArguments
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	
	    /**
	     * Determines if the specified object is a function.
	     * @method isFunction
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	
	    /**
	     * Determines if the specified object is a string.
	     * @method isString
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	
	    /**
	     * Determines if the specified object is a number.
	     * @method isNumber
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	
	    /**
	     * Determines if the specified object is a date.
	     * @method isDate
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	
	    /**
	     * Determines if the specified object is a boolean.
	     * @method isBoolean
	     * @param {object} object The object to check.
	     * @return {boolean} True if matches the type, false otherwise.
	     */
	
	    //isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	    var isChecks = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
	
	    function makeIsFunction(name) {
	        var value = '[object ' + name + ']';
	        system['is' + name] = function(obj) {
	            return toString.call(obj) == value;
	        };
	    }
	
	    for (var i = 0; i < isChecks.length; i++) {
	        makeIsFunction(isChecks[i]);
	    }
	
	    return system;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Knockout JavaScript library v3.5.0
	 * (c) The Knockout.js team - http://knockoutjs.com/
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */
	
	(function() {(function(p){var z=this||(0,eval)("this"),w=z.document,R=z.navigator,v=z.jQuery,H=z.JSON;v||"undefined"===typeof jQuery||(v=jQuery);(function(p){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports,__webpack_require__], __WEBPACK_AMD_DEFINE_FACTORY__ = (p), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"===typeof exports&&"object"===typeof module?p(module.exports||exports):p(z.ko={})})(function(S,T){function K(a,c){return null===a||typeof a in W?a===c:!1}function X(b,c){var d;return function(){d||(d=a.a.setTimeout(function(){d=p;b()},c))}}function Y(b,c){var d;return function(){clearTimeout(d);
	d=a.a.setTimeout(b,c)}}function Z(a,c){c&&"change"!==c?"beforeChange"===c?this.oc(a):this.bb(a,c):this.pc(a)}function aa(a,c){null!==c&&c.s&&c.s()}function ba(a,c){var d=this.pd,e=d[t];e.qa||(this.Pb&&this.kb[c]?(d.tc(c,a,this.kb[c]),this.kb[c]=null,--this.Pb):e.F[c]||d.tc(c,a,e.G?{da:a}:d.Zc(a)),a.Ka&&a.fd())}var a="undefined"!==typeof S?S:{};a.b=function(b,c){for(var d=b.split("."),e=a,f=0;f<d.length-1;f++)e=e[d[f]];e[d[d.length-1]]=c};a.J=function(a,c,d){a[c]=d};a.version="3.5.0";a.b("version",
	a.version);a.options={deferUpdates:!1,useOnlyNativeEvents:!1,foreachHidesDestroyed:!1};a.a=function(){function b(a,b){for(var c in a)f.call(a,c)&&b(c,a[c])}function c(a,b){if(b)for(var c in b)f.call(b,c)&&(a[c]=b[c]);return a}function d(a,b){a.__proto__=b;return a}function e(b,c,d,e){var k=b[c].match(n)||[];a.a.C(d.match(n),function(b){a.a.Oa(k,b,e)});b[c]=k.join(" ")}var f=Object.prototype.hasOwnProperty,g={__proto__:[]}instanceof Array,h="function"===typeof Symbol,m={},l={};m[R&&/Firefox\/2/i.test(R.userAgent)?
	"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];m.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(m,function(a,b){if(b.length)for(var c=0,d=b.length;c<d;c++)l[b[c]]=a});var k={propertychange:!0},q=w&&function(){for(var a=3,b=w.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:p}(),n=/\S+/g,r;return{Ic:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],
	C:function(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a[d],d,a)},A:"function"==typeof Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},Lb:function(a,b,c){for(var d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d,a))return a[d];return p},hb:function(b,c){var d=a.a.A(b,c);0<d?b.splice(d,1):0===d&&b.shift()},vc:function(b){var c=[];b&&a.a.C(b,function(b){0>a.a.A(c,b)&&c.push(b)});return c},Mb:function(a,
	b,c){var d=[];if(a)for(var e=0,k=a.length;e<k;e++)d.push(b.call(c,a[e],e));return d},fb:function(a,b,c){var d=[];if(a)for(var e=0,k=a.length;e<k;e++)b.call(c,a[e],e)&&d.push(a[e]);return d},gb:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},Oa:function(b,c,d){var e=a.a.A(a.a.$b(b),c);0>e?d&&b.push(c):d||b.splice(e,1)},Ba:g,extend:c,setPrototypeOf:d,zb:g?d:c,O:b,Ha:function(a,b,c){if(!a)return a;var d={},e;for(e in a)f.call(a,e)&&(d[e]=
	b.call(c,a[e],e,a));return d},Sb:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Xb:function(b){b=a.a.la(b);for(var c=(b[0]&&b[0].ownerDocument||w).createElement("div"),d=0,e=b.length;d<e;d++)c.appendChild(a.na(b[d]));return c},Ca:function(b,c){for(var d=0,e=b.length,k=[];d<e;d++){var f=b[d].cloneNode(!0);k.push(c?a.na(f):f)}return k},ua:function(b,c){a.a.Sb(b);if(c)for(var d=0,e=c.length;d<e;d++)b.appendChild(c[d])},Wc:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var e=d[0],
	k=e.parentNode,f=0,l=c.length;f<l;f++)k.insertBefore(c[f],e);f=0;for(l=d.length;f<l;f++)a.removeNode(d[f])}},Ua:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.splice(0,1);for(;1<a.length&&a[a.length-1].parentNode!==b;)a.length--;if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=0;c!==d;)a.push(c),c=c.nextSibling;a.push(d)}}return a},Yc:function(a,b){7>q?a.setAttribute("selected",b):a.selected=b},Cb:function(a){return null===a||a===p?"":a.trim?
	a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},Td:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},ud:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(1!==a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;return!!a},Rb:function(b){return a.a.ud(b,b.ownerDocument.documentElement)},jd:function(b){return!!a.a.Lb(b,a.a.Rb)},P:function(a){return a&&
	a.tagName&&a.tagName.toLowerCase()},zc:function(b){return a.onError?function(){try{return b.apply(this,arguments)}catch(c){throw a.onError&&a.onError(c),c;}}:b},setTimeout:function(b,c){return setTimeout(a.a.zc(b),c)},Fc:function(b){setTimeout(function(){a.onError&&a.onError(b);throw b;},0)},H:function(b,c,d){var e=a.a.zc(d);d=k[c];if(a.options.useOnlyNativeEvents||d||!v)if(d||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var f=function(a){e.call(b,a)},l="on"+c;b.attachEvent(l,
	f);a.a.I.za(b,function(){b.detachEvent(l,f)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(c,e,!1);else r||(r="function"==typeof v(b).on?"on":"bind"),v(b)[r](c,e)},Fb:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.P(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==d||"radio"==d):d=!1;if(a.options.useOnlyNativeEvents||!v||d)if("function"==typeof w.createEvent)if("function"==
	typeof b.dispatchEvent)d=w.createEvent(l[c]||"HTMLEvents"),d.initEvent(c,!0,!0,z,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");else v(b).trigger(c)},c:function(b){return a.N(b)?b():b},$b:function(b){return a.N(b)?b.w():b},Eb:function(b,c,d){var k;c&&("object"===typeof b.classList?
	(k=b.classList[d?"add":"remove"],a.a.C(c.match(n),function(a){k.call(b.classList,a)})):"string"===typeof b.className.baseVal?e(b.className,"baseVal",c,d):e(b,"className",c,d))},Ab:function(b,c){var d=a.a.c(c);if(null===d||d===p)d="";var e=a.h.firstChild(b);!e||3!=e.nodeType||a.h.nextSibling(e)?a.h.ua(b,[b.ownerDocument.createTextNode(d)]):e.data=d;a.a.zd(b)},Xc:function(a,b){a.name=b;if(7>=q)try{var c=a.name.replace(/[&<>'"]/g,function(a){return"&#"+a.charCodeAt(0)+";"});a.mergeAttributes(w.createElement("<input name='"+
	c+"'/>"),!1)}catch(d){}},zd:function(a){9<=q&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},vd:function(a){if(q){var b=a.style.width;a.style.width=0;a.style.width=b}},Od:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var d=[],e=b;e<=c;e++)d.push(e);return d},la:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},Da:function(a){return h?Symbol(a):a},Xd:6===q,Yd:7===q,W:q,Kc:function(b,c){for(var d=a.a.la(b.getElementsByTagName("input")).concat(a.a.la(b.getElementsByTagName("textarea"))),
	e="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},k=[],f=d.length-1;0<=f;f--)e(d[f])&&k.push(d[f]);return k},Md:function(b){return"string"==typeof b&&(b=a.a.Cb(b))?H&&H.parse?H.parse(b):(new Function("return "+b))():null},fc:function(b,c,d){if(!H||!H.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
	return H.stringify(a.a.c(b),c,d)},Nd:function(c,d,e){e=e||{};var k=e.params||{},f=e.includeFields||this.Ic,l=c;if("object"==typeof c&&"form"===a.a.P(c))for(var l=c.action,h=f.length-1;0<=h;h--)for(var g=a.a.Kc(c,f[h]),m=g.length-1;0<=m;m--)k[g[m].name]=g[m].value;d=a.a.c(d);var n=w.createElement("form");n.style.display="none";n.action=l;n.method="post";for(var q in d)c=w.createElement("input"),c.type="hidden",c.name=q,c.value=a.a.fc(a.a.c(d[q])),n.appendChild(c);b(k,function(a,b){var c=w.createElement("input");
	c.type="hidden";c.name=a;c.value=b;n.appendChild(c)});w.body.appendChild(n);e.submitter?e.submitter(n):n.submit();setTimeout(function(){n.parentNode.removeChild(n)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.C);a.b("utils.arrayFirst",a.a.Lb);a.b("utils.arrayFilter",a.a.fb);a.b("utils.arrayGetDistinctValues",a.a.vc);a.b("utils.arrayIndexOf",a.a.A);a.b("utils.arrayMap",a.a.Mb);a.b("utils.arrayPushAll",a.a.gb);a.b("utils.arrayRemoveItem",a.a.hb);a.b("utils.cloneNodes",a.a.Ca);a.b("utils.createSymbolOrString",
	a.a.Da);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.Ic);a.b("utils.getFormFields",a.a.Kc);a.b("utils.objectMap",a.a.Ha);a.b("utils.peekObservable",a.a.$b);a.b("utils.postJson",a.a.Nd);a.b("utils.parseJson",a.a.Md);a.b("utils.registerEventHandler",a.a.H);a.b("utils.stringifyJson",a.a.fc);a.b("utils.range",a.a.Od);a.b("utils.toggleDomNodeCssClass",a.a.Eb);a.b("utils.triggerEvent",a.a.Fb);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.O);a.b("utils.addOrRemoveItem",
	a.a.Oa);a.b("utils.setTextContent",a.a.Ab);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this;if(1===arguments.length)return function(){return c.apply(a,arguments)};var d=Array.prototype.slice.call(arguments,1);return function(){var e=d.slice(0);e.push.apply(e,arguments);return c.apply(a,e)}});a.a.g=new function(){var b=0,c="__ko__"+(new Date).getTime(),d={},e,f;a.a.W?(e=function(a,e){var f=a[c];if(!f||"null"===f||!d[f]){if(!e)return p;f=a[c]="ko"+b++;d[f]=
	{}}return d[f]},f=function(a){var b=a[c];return b?(delete d[b],a[c]=null,!0):!1}):(e=function(a,b){var d=a[c];!d&&b&&(d=a[c]={});return d},f=function(a){return a[c]?(delete a[c],!0):!1});return{get:function(a,b){var c=e(a,!1);return c&&c[b]},set:function(a,b,c){(a=e(a,c!==p))&&(a[b]=c)},Tb:function(a,b,c){a=e(a,!0);return a[b]||(a[b]=c)},clear:f,Z:function(){return b++ +c}}};a.b("utils.domData",a.a.g);a.b("utils.domData.clear",a.a.g.clear);a.a.I=new function(){function b(b,c){var d=a.a.g.get(b,e);
	d===p&&c&&(d=[],a.a.g.set(b,e,d));return d}function c(c){var e=b(c,!1);if(e)for(var e=e.slice(0),f=0;f<e.length;f++)e[f](c);a.a.g.clear(c);a.a.I.cleanExternalData(c);g[c.nodeType]&&d(c.childNodes,!0)}function d(b,d){for(var e=[],k,f=0;f<b.length;f++)if(!d||8===b[f].nodeType)if(c(e[e.length]=k=b[f]),b[f]!==k)for(;f--&&-1==a.a.A(e,b[f]););}var e=a.a.g.Z(),f={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{za:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},xb:function(c,
	d){var f=b(c,!1);f&&(a.a.hb(f,d),0==f.length&&a.a.g.set(c,e,p))},na:function(a){f[a.nodeType]&&(c(a),g[a.nodeType]&&d(a.getElementsByTagName("*")));return a},removeNode:function(b){a.na(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){v&&"function"==typeof v.cleanData&&v.cleanData([a])}}};a.na=a.a.I.na;a.removeNode=a.a.I.removeNode;a.b("cleanNode",a.na);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.I);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.I.za);
	a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.I.xb);(function(){var b=[0,"",""],c=[1,"<table>","</table>"],d=[3,"<table><tbody><tr>","</tr></tbody></table>"],e=[1,"<select multiple='multiple'>","</select>"],f={thead:c,tbody:c,tfoot:c,tr:[2,"<table><tbody>","</tbody></table>"],td:d,th:d,option:e,optgroup:e},g=8>=a.a.W;a.a.ta=function(c,d){var e;if(v)if(v.parseHTML)e=v.parseHTML(c,d)||[];else{if((e=v.clean([c],d))&&e[0]){for(var k=e[0];k.parentNode&&11!==k.parentNode.nodeType;)k=k.parentNode;
	k.parentNode&&k.parentNode.removeChild(k)}}else{(e=d)||(e=w);var k=e.parentWindow||e.defaultView||z,q=a.a.Cb(c).toLowerCase(),n=e.createElement("div"),r;r=(q=q.match(/^(?:\x3c!--.*?--\x3e\s*?)*?<([a-z]+)[\s>]/))&&f[q[1]]||b;q=r[0];r="ignored<div>"+r[1]+c+r[2]+"</div>";"function"==typeof k.innerShiv?n.appendChild(k.innerShiv(r)):(g&&e.body.appendChild(n),n.innerHTML=r,g&&n.parentNode.removeChild(n));for(;q--;)n=n.lastChild;e=a.a.la(n.lastChild.childNodes)}return e};a.a.Ld=function(b,c){var d=a.a.ta(b,
	c);return d.length&&d[0].parentElement||a.a.Xb(d)};a.a.dc=function(b,c){a.a.Sb(b);c=a.a.c(c);if(null!==c&&c!==p)if("string"!=typeof c&&(c=c.toString()),v)v(b).html(c);else for(var d=a.a.ta(c,b.ownerDocument),e=0;e<d.length;e++)b.appendChild(d[e])}})();a.b("utils.parseHtmlFragment",a.a.ta);a.b("utils.setHtml",a.a.dc);a.aa=function(){function b(c,e){if(c)if(8==c.nodeType){var f=a.aa.Tc(c.nodeValue);null!=f&&e.push({sd:c,Jd:f})}else if(1==c.nodeType)for(var f=0,g=c.childNodes,h=g.length;f<h;f++)b(g[f],
	e)}var c={};return{Wb:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},ad:function(a,b){var f=c[a];if(f===p)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return f.apply(null,b||[]),!0}finally{delete c[a]}},bd:function(c,e){var f=
	[];b(c,f);for(var g=0,h=f.length;g<h;g++){var m=f[g].sd,l=[m];e&&a.a.gb(l,e);a.aa.ad(f[g].Jd,l);m.nodeValue="";m.parentNode&&m.parentNode.removeChild(m)}},Tc:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.aa);a.b("memoization.memoize",a.aa.Wb);a.b("memoization.unmemoize",a.aa.ad);a.b("memoization.parseMemoText",a.aa.Tc);a.b("memoization.unmemoizeDomNodeAndDescendants",a.aa.bd);a.ma=function(){function b(){if(f)for(var b=f,c=0,d;h<f;)if(d=e[h++]){if(h>b){if(5E3<=
	++c){h=f;a.a.Fc(Error("'Too much recursion' after processing "+c+" task groups."));break}b=f}try{d()}catch(g){a.a.Fc(g)}}}function c(){b();h=f=e.length=0}var d,e=[],f=0,g=1,h=0;z.MutationObserver?d=function(a){var b=w.createElement("div");(new MutationObserver(a)).observe(b,{attributes:!0});return function(){b.classList.toggle("foo")}}(c):d=w&&"onreadystatechange"in w.createElement("script")?function(a){var b=w.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;w.documentElement.removeChild(b);
	b=null;a()};w.documentElement.appendChild(b)}:function(a){setTimeout(a,0)};return{scheduler:d,yb:function(b){f||a.ma.scheduler(c);e[f++]=b;return g++},cancel:function(a){a=a-(g-f);a>=h&&a<f&&(e[a]=null)},resetForTesting:function(){var a=f-h;h=f=e.length=0;return a},Rd:b}}();a.b("tasks",a.ma);a.b("tasks.schedule",a.ma.yb);a.b("tasks.runEarly",a.ma.Rd);a.Ta={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.$({read:b,write:function(e){clearTimeout(d);d=a.a.setTimeout(function(){b(e)},
	c)}})},rateLimit:function(a,c){var d,e,f;"number"==typeof c?d=c:(d=c.timeout,e=c.method);a.Hb=!1;f="function"==typeof e?e:"notifyWhenChangesStop"==e?Y:X;a.tb(function(a){return f(a,d,c)})},deferred:function(b,c){if(!0!==c)throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");b.Hb||(b.Hb=!0,b.tb(function(c){var e,f=!1;return function(){if(!f){a.ma.cancel(e);e=a.ma.yb(c);try{f=!0,b.notifySubscribers(p,"dirty")}finally{f=
	!1}}}}))},notify:function(a,c){a.equalityComparer="always"==c?null:K}};var W={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.Ta);a.gc=function(b,c,d){this.da=b;this.kc=c;this.lc=d;this.Ib=!1;this.ab=this.Jb=null;a.J(this,"dispose",this.s);a.J(this,"disposeWhenNodeIsRemoved",this.l)};a.gc.prototype.s=function(){this.Ib||(this.ab&&a.a.I.xb(this.Jb,this.ab),this.Ib=!0,this.lc(),this.da=this.kc=this.lc=this.Jb=this.ab=null)};a.gc.prototype.l=function(b){this.Jb=b;a.a.I.za(b,this.ab=this.s.bind(this))};
	a.R=function(){a.a.zb(this,D);D.ob(this)};var D={ob:function(a){a.S={change:[]};a.rc=1},subscribe:function(b,c,d){var e=this;d=d||"change";var f=new a.gc(e,c?b.bind(c):b,function(){a.a.hb(e.S[d],f);e.cb&&e.cb(d)});e.Qa&&e.Qa(d);e.S[d]||(e.S[d]=[]);e.S[d].push(f);return f},notifySubscribers:function(b,c){c=c||"change";"change"===c&&this.Gb();if(this.Wa(c)){var d="change"===c&&this.dd||this.S[c].slice(0);try{a.v.wc();for(var e=0,f;f=d[e];++e)f.Ib||f.kc(b)}finally{a.v.end()}}},mb:function(){return this.rc},
	Cd:function(a){return this.mb()!==a},Gb:function(){++this.rc},tb:function(b){var c=this,d=a.N(c),e,f,g,h,m;c.bb||(c.bb=c.notifySubscribers,c.notifySubscribers=Z);var l=b(function(){c.Ka=!1;d&&h===c&&(h=c.mc?c.mc():c());var a=f||m&&c.qb(g,h);m=f=e=!1;a&&c.bb(g=h)});c.pc=function(a,b){b&&c.Ka||(m=!b);c.dd=c.S.change.slice(0);c.Ka=e=!0;h=a;l()};c.oc=function(a){e||(g=a,c.bb(a,"beforeChange"))};c.qc=function(){m=!0};c.fd=function(){c.qb(g,c.w(!0))&&(f=!0)}},Wa:function(a){return this.S[a]&&this.S[a].length},
	Ad:function(b){if(b)return this.S[b]&&this.S[b].length||0;var c=0;a.a.O(this.S,function(a,b){"dirty"!==a&&(c+=b.length)});return c},qb:function(a,c){return!this.equalityComparer||!this.equalityComparer(a,c)},toString:function(){return"[object Object]"},extend:function(b){var c=this;b&&a.a.O(b,function(b,e){var f=a.Ta[b];"function"==typeof f&&(c=f(c,e)||c)});return c}};a.J(D,"init",D.ob);a.J(D,"subscribe",D.subscribe);a.J(D,"extend",D.extend);a.J(D,"getSubscriptionsCount",D.Ad);a.a.Ba&&a.a.setPrototypeOf(D,
	Function.prototype);a.R.fn=D;a.Pc=function(a){return null!=a&&"function"==typeof a.subscribe&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.R);a.b("isSubscribable",a.Pc);a.U=a.v=function(){function b(a){d.push(e);e=a}function c(){e=d.pop()}var d=[],e,f=0;return{wc:b,end:c,ac:function(b){if(e){if(!a.Pc(b))throw Error("Only subscribable things can act as dependencies");e.nd.call(e.od,b,b.ed||(b.ed=++f))}},K:function(a,d,e){try{return b(),a.apply(d,e||[])}finally{c()}},pa:function(){if(e)return e.o.pa()},
	Va:function(){if(e)return e.o.Va()},rb:function(){if(e)return e.rb},o:function(){if(e)return e.o}}}();a.b("computedContext",a.U);a.b("computedContext.getDependenciesCount",a.U.pa);a.b("computedContext.getDependencies",a.U.Va);a.b("computedContext.isInitial",a.U.rb);a.b("computedContext.registerDependency",a.U.ac);a.b("ignoreDependencies",a.Wd=a.v.K);var I=a.a.Da("_latestValue");a.sa=function(b){function c(){if(0<arguments.length)return c.qb(c[I],arguments[0])&&(c.xa(),c[I]=arguments[0],c.wa()),this;
	a.v.ac(c);return c[I]}c[I]=b;a.a.Ba||a.a.extend(c,a.R.fn);a.R.fn.ob(c);a.a.zb(c,F);a.options.deferUpdates&&a.Ta.deferred(c,!0);return c};var F={equalityComparer:K,w:function(){return this[I]},wa:function(){this.notifySubscribers(this[I],"spectate");this.notifySubscribers(this[I])},xa:function(){this.notifySubscribers(this[I],"beforeChange")}};a.a.Ba&&a.a.setPrototypeOf(F,a.R.fn);var G=a.sa.Na="__ko_proto__";F[G]=a.sa;a.N=function(b){if((b="function"==typeof b&&b[G])&&b!==F[G]&&b!==a.o.fn[G])throw Error("Invalid object that looks like an observable; possibly from another Knockout instance");
	return!!b};a.Ya=function(b){return"function"==typeof b&&(b[G]===F[G]||b[G]===a.o.fn[G]&&b.Mc)};a.b("observable",a.sa);a.b("isObservable",a.N);a.b("isWriteableObservable",a.Ya);a.b("isWritableObservable",a.Ya);a.b("observable.fn",F);a.J(F,"peek",F.w);a.J(F,"valueHasMutated",F.wa);a.J(F,"valueWillMutate",F.xa);a.Ia=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.sa(b);a.a.zb(b,
	a.Ia.fn);return b.extend({trackArrayChanges:!0})};a.Ia.fn={remove:function(b){for(var c=this.w(),d=[],e="function"!=typeof b||a.N(b)?function(a){return a===b}:b,f=0;f<c.length;f++){var g=c[f];if(e(g)){0===d.length&&this.xa();if(c[f]!==g)throw Error("Array modified during remove; cannot remove item");d.push(g);c.splice(f,1);f--}}d.length&&this.wa();return d},removeAll:function(b){if(b===p){var c=this.w(),d=c.slice(0);this.xa();c.splice(0,c.length);this.wa();return d}return b?this.remove(function(c){return 0<=
	a.a.A(b,c)}):[]},destroy:function(b){var c=this.w(),d="function"!=typeof b||a.N(b)?function(a){return a===b}:b;this.xa();for(var e=c.length-1;0<=e;e--){var f=c[e];d(f)&&(f._destroy=!0)}this.wa()},destroyAll:function(b){return b===p?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.A(b,c)}):[]},indexOf:function(b){var c=this();return a.a.A(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.xa(),this.w()[d]=c,this.wa())},sorted:function(a){var c=this().slice(0);
	return a?c.sort(a):c.sort()},reversed:function(){return this().slice(0).reverse()}};a.a.Ba&&a.a.setPrototypeOf(a.Ia.fn,a.sa.fn);a.a.C("pop push reverse shift sort splice unshift".split(" "),function(b){a.Ia.fn[b]=function(){var a=this.w();this.xa();this.yc(a,b,arguments);var d=a[b].apply(a,arguments);this.wa();return d===a?this:d}});a.a.C(["slice"],function(b){a.Ia.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.Oc=function(b){return a.N(b)&&"function"==typeof b.remove&&"function"==
	typeof b.push};a.b("observableArray",a.Ia);a.b("isObservableArray",a.Oc);a.Ta.trackArrayChanges=function(b,c){function d(){function c(){if(h){var d=[].concat(b.w()||[]);if(b.Wa("arrayChange")){var e;if(!f||1<h)f=a.a.Ob(m,d,b.Nb);e=f}m=d;f=null;h=0;e&&e.length&&b.notifySubscribers(e,"arrayChange")}}e?c():(e=!0,l=b.notifySubscribers,b.notifySubscribers=function(a,b){b&&"change"!==b||++h;return l.apply(this,arguments)},m=[].concat(b.w()||[]),f=null,g=b.subscribe(c))}b.Nb={};c&&"object"==typeof c&&a.a.extend(b.Nb,
	c);b.Nb.sparse=!0;if(!b.yc){var e=!1,f=null,g,h=0,m,l,k=b.Qa,q=b.cb;b.Qa=function(a){k&&k.call(b,a);"arrayChange"===a&&d()};b.cb=function(a){q&&q.call(b,a);"arrayChange"!==a||b.Wa("arrayChange")||(l&&(b.notifySubscribers=l,l=p),g&&g.s(),g=null,e=!1,m=p)};b.yc=function(b,c,d){function k(a,b,c){return l[l.length]={status:a,value:b,index:c}}if(e&&!h){var l=[],g=b.length,q=d.length,m=0;switch(c){case "push":m=g;case "unshift":for(c=0;c<q;c++)k("added",d[c],m+c);break;case "pop":m=g-1;case "shift":g&&
	k("deleted",b[m],m);break;case "splice":c=Math.min(Math.max(0,0>d[0]?g+d[0]:d[0]),g);for(var g=1===q?g:Math.min(c+(d[1]||0),g),q=c+q-2,m=Math.max(g,q),U=[],L=[],p=2;c<m;++c,++p)c<g&&L.push(k("deleted",b[c],c)),c<q&&U.push(k("added",d[p],c));a.a.Jc(L,U);break;default:return}f=l}}}};var t=a.a.Da("_state");a.o=a.$=function(b,c,d){function e(){if(0<arguments.length){if("function"===typeof f)f.apply(g.lb,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
	return this}g.qa||a.v.ac(e);(g.ka||g.G&&e.Xa())&&e.ha();return g.X}"object"===typeof b?d=b:(d=d||{},b&&(d.read=b));if("function"!=typeof d.read)throw Error("Pass a function that returns the value of the ko.computed");var f=d.write,g={X:p,ra:!0,ka:!0,pb:!1,hc:!1,qa:!1,vb:!1,G:!1,Vc:d.read,lb:c||d.owner,l:d.disposeWhenNodeIsRemoved||d.l||null,Sa:d.disposeWhen||d.Sa,Qb:null,F:{},V:0,Hc:null};e[t]=g;e.Mc="function"===typeof f;a.a.Ba||a.a.extend(e,a.R.fn);a.R.fn.ob(e);a.a.zb(e,C);d.pure?(g.vb=!0,g.G=!0,
	a.a.extend(e,da)):d.deferEvaluation&&a.a.extend(e,ea);a.options.deferUpdates&&a.Ta.deferred(e,!0);g.l&&(g.hc=!0,g.l.nodeType||(g.l=null));g.G||d.deferEvaluation||e.ha();g.l&&e.ja()&&a.a.I.za(g.l,g.Qb=function(){e.s()});return e};var C={equalityComparer:K,pa:function(){return this[t].V},Va:function(){var b=[];a.a.O(this[t].F,function(a,d){b[d.La]=d.da});return b},Ub:function(b){if(!this[t].V)return!1;var c=this.Va();return-1!==a.a.A(c,b)?!0:!!a.a.Lb(c,function(a){return a.Ub&&a.Ub(b)})},tc:function(a,
	c,d){if(this[t].vb&&c===this)throw Error("A 'pure' computed must not be called recursively");this[t].F[a]=d;d.La=this[t].V++;d.Ma=c.mb()},Xa:function(){var a,c,d=this[t].F;for(a in d)if(Object.prototype.hasOwnProperty.call(d,a)&&(c=d[a],this.Ja&&c.da.Ka||c.da.Cd(c.Ma)))return!0},Id:function(){this.Ja&&!this[t].pb&&this.Ja(!1)},ja:function(){var a=this[t];return a.ka||0<a.V},Qd:function(){this.Ka?this[t].ka&&(this[t].ra=!0):this.Gc()},Zc:function(a){if(a.Hb){var c=a.subscribe(this.Id,this,"dirty"),
	d=a.subscribe(this.Qd,this);return{da:a,s:function(){c.s();d.s()}}}return a.subscribe(this.Gc,this)},Gc:function(){var b=this,c=b.throttleEvaluation;c&&0<=c?(clearTimeout(this[t].Hc),this[t].Hc=a.a.setTimeout(function(){b.ha(!0)},c)):b.Ja?b.Ja(!0):b.ha(!0)},ha:function(b){var c=this[t],d=c.Sa,e=!1;if(!c.pb&&!c.qa){if(c.l&&!a.a.Rb(c.l)||d&&d()){if(!c.hc){this.s();return}}else c.hc=!1;c.pb=!0;try{e=this.yd(b)}finally{c.pb=!1}return e}},yd:function(b){var c=this[t],d=!1,e=c.vb?p:!c.V,d={pd:this,kb:c.F,
	Pb:c.V};a.v.wc({od:d,nd:ba,o:this,rb:e});c.F={};c.V=0;var f=this.xd(c,d);c.V?d=this.qb(c.X,f):(this.s(),d=!0);d&&(c.G?this.Gb():this.notifySubscribers(c.X,"beforeChange"),c.X=f,this.notifySubscribers(c.X,"spectate"),!c.G&&b&&this.notifySubscribers(c.X),this.qc&&this.qc());e&&this.notifySubscribers(c.X,"awake");return d},xd:function(b,c){try{var d=b.Vc;return b.lb?d.call(b.lb):d()}finally{a.v.end(),c.Pb&&!b.G&&a.a.O(c.kb,aa),b.ra=b.ka=!1}},w:function(a){var c=this[t];(c.ka&&(a||!c.V)||c.G&&this.Xa())&&
	this.ha();return c.X},tb:function(b){a.R.fn.tb.call(this,b);this.mc=function(){this[t].G||(this[t].ra?this.ha():this[t].ka=!1);return this[t].X};this.Ja=function(a){this.oc(this[t].X);this[t].ka=!0;a&&(this[t].ra=!0);this.pc(this,!a)}},s:function(){var b=this[t];!b.G&&b.F&&a.a.O(b.F,function(a,b){b.s&&b.s()});b.l&&b.Qb&&a.a.I.xb(b.l,b.Qb);b.F=p;b.V=0;b.qa=!0;b.ra=!1;b.ka=!1;b.G=!1;b.l=p;b.Sa=p;b.Vc=p;this.Mc||(b.lb=p)}},da={Qa:function(b){var c=this,d=c[t];if(!d.qa&&d.G&&"change"==b){d.G=!1;if(d.ra||
	c.Xa())d.F=null,d.V=0,c.ha()&&c.Gb();else{var e=[];a.a.O(d.F,function(a,b){e[b.La]=a});a.a.C(e,function(a,b){var e=d.F[a],m=c.Zc(e.da);m.La=b;m.Ma=e.Ma;d.F[a]=m});c.Xa()&&c.ha()&&c.Gb()}d.qa||c.notifySubscribers(d.X,"awake")}},cb:function(b){var c=this[t];c.qa||"change"!=b||this.Wa("change")||(a.a.O(c.F,function(a,b){b.s&&(c.F[a]={da:b.da,La:b.La,Ma:b.Ma},b.s())}),c.G=!0,this.notifySubscribers(p,"asleep"))},mb:function(){var b=this[t];b.G&&(b.ra||this.Xa())&&this.ha();return a.R.fn.mb.call(this)}},
	ea={Qa:function(a){"change"!=a&&"beforeChange"!=a||this.w()}};a.a.Ba&&a.a.setPrototypeOf(C,a.R.fn);var N=a.sa.Na;C[N]=a.o;a.Nc=function(a){return"function"==typeof a&&a[N]===C[N]};a.Ed=function(b){return a.Nc(b)&&b[t]&&b[t].vb};a.b("computed",a.o);a.b("dependentObservable",a.o);a.b("isComputed",a.Nc);a.b("isPureComputed",a.Ed);a.b("computed.fn",C);a.J(C,"peek",C.w);a.J(C,"dispose",C.s);a.J(C,"isActive",C.ja);a.J(C,"getDependenciesCount",C.pa);a.J(C,"getDependencies",C.Va);a.wb=function(b,c){if("function"===
	typeof b)return a.o(b,c,{pure:!0});b=a.a.extend({},b);b.pure=!0;return a.o(b,c)};a.b("pureComputed",a.wb);(function(){function b(a,f,g){g=g||new d;a=f(a);if("object"!=typeof a||null===a||a===p||a instanceof RegExp||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var h=a instanceof Array?[]:{};g.save(a,h);c(a,function(c){var d=f(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":h[c]=d;break;case "object":case "undefined":var k=
	g.get(d);h[c]=k!==p?k:b(d,f,g)}});return h}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=[];this.values=[]}a.$c=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.N(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.$c(b);return a.a.fc(b,c,d)};d.prototype={constructor:d,save:function(b,
	c){var d=a.a.A(this.keys,b);0<=d?this.values[d]=c:(this.keys.push(b),this.values.push(c))},get:function(b){b=a.a.A(this.keys,b);return 0<=b?this.values[b]:p}}})();a.b("toJS",a.$c);a.b("toJSON",a.toJSON);a.Vd=function(b,c,d){function e(c){var e=a.wb(b,d).extend({Ga:"always"}),h=e.subscribe(function(a){a&&(h.s(),c(a))});e.notifySubscribers(e.w());return h}return"function"!==typeof Promise||c?e(c.bind(d)):new Promise(e)};a.b("when",a.Vd);(function(){a.u={L:function(b){switch(a.a.P(b)){case "option":return!0===
	b.__ko__hasDomDataOptionValue__?a.a.g.get(b,a.f.options.Yb):7>=a.a.W?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.u.L(b.options[b.selectedIndex]):p;default:return b.value}},ya:function(b,c,d){switch(a.a.P(b)){case "option":"string"===typeof c?(a.a.g.set(b,a.f.options.Yb,p),"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__,b.value=c):(a.a.g.set(b,a.f.options.Yb,c),b.__ko__hasDomDataOptionValue__=
	!0,b.value="number"===typeof c?c:"");break;case "select":if(""===c||null===c)c=p;for(var e=-1,f=0,g=b.options.length,h;f<g;++f)if(h=a.u.L(b.options[f]),h==c||""===h&&c===p){e=f;break}if(d||0<=e||c===p&&1<b.size)b.selectedIndex=e,6===a.a.W&&a.a.setTimeout(function(){b.selectedIndex=e},0);break;default:if(null===c||c===p)c="";b.value=c}}}})();a.b("selectExtensions",a.u);a.b("selectExtensions.readValue",a.u.L);a.b("selectExtensions.writeValue",a.u.ya);a.m=function(){function b(b){b=a.a.Cb(b);123===b.charCodeAt(0)&&
	(b=b.slice(1,-1));b+="\n,";var c=[],d=b.match(e),q,n=[],h=0;if(1<d.length){for(var y=0,A;A=d[y];++y){var u=A.charCodeAt(0);if(44===u){if(0>=h){c.push(q&&n.length?{key:q,value:n.join("")}:{unknown:q||n.join("")});q=h=0;n=[];continue}}else if(58===u){if(!h&&!q&&1===n.length){q=n.pop();continue}}else if(47===u&&1<A.length&&(47===A.charCodeAt(1)||42===A.charCodeAt(1)))continue;else 47===u&&y&&1<A.length?(u=d[y-1].match(f))&&!g[u[0]]&&(b=b.substr(b.indexOf(A)+1),d=b.match(e),y=-1,A="/"):40===u||123===
	u||91===u?++h:41===u||125===u||93===u?--h:q||n.length||34!==u&&39!==u||(A=A.slice(1,-1));n.push(A)}if(0<h)throw Error("Unbalanced parentheses, braces, or brackets");}return c}var c=["true","false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|`(?:\\\\.|[^`])*`|/\\*(?:[^*]|\\*+[^*/])*\\*+/|//.*\n|/(?:\\\\.|[^/])+/w*|[^\\s:,/][^,\"'`{}()/:[\\]]*[^\\s,\"'`{}()/:[\\]]|[^\\s]","g"),f=/[\])"'A-Za-z0-9_$]+$/,g={"in":1,"return":1,
	"typeof":1},h={};return{Ra:[],va:h,Zb:b,ub:function(e,f){function k(b,e){var f;if(!y){var l=a.getBindingHandler(b);if(l&&l.preprocess&&!(e=l.preprocess(e,b,k)))return;if(l=h[b])f=e,0<=a.a.A(c,f)?f=!1:(l=f.match(d),f=null===l?!1:l[1]?"Object("+l[1]+")"+l[2]:f),l=f;l&&n.push("'"+("string"==typeof h[b]?h[b]:b)+"':function(_z){"+f+"=_z}")}g&&(e="function(){return "+e+" }");q.push("'"+b+"':"+e)}f=f||{};var q=[],n=[],g=f.valueAccessors,y=f.bindingParams,A="string"===typeof e?b(e):e;a.a.C(A,function(a){k(a.key||
	a.unknown,a.value)});n.length&&k("_ko_property_writers","{"+n.join(",")+" }");return q.join(",")},Hd:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;return!1},$a:function(b,c,d,e,f){if(b&&a.N(b))!a.Ya(b)||f&&b.w()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.m);a.b("expressionRewriting.bindingRewriteValidators",a.m.Ra);a.b("expressionRewriting.parseObjectLiteral",a.m.Zb);a.b("expressionRewriting.preProcessBindings",a.m.ub);a.b("expressionRewriting._twoWayBindings",
	a.m.va);a.b("jsonExpressionRewriting",a.m);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.m.ub);(function(){function b(a){return 8==a.nodeType&&g.test(f?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&h.test(f?a.text:a.nodeValue)}function d(d,e){for(var f=d,g=1,h=[];f=f.nextSibling;){if(c(f)&&(a.a.g.set(f,l,!0),g--,0===g))return h;h.push(f);b(f)&&g++}if(!e)throw Error("Cannot find closing comment tag to match: "+d.nodeValue);return null}function e(a,b){var c=d(a,b);return c?
	0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var f=w&&"\x3c!--test--\x3e"===w.createComment("test").text,g=f?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,h=f?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,m={ul:!0,ol:!0},l="__ko_matchedEndComment__";a.h={ea:{},childNodes:function(a){return b(a)?d(a):a.childNodes},Ea:function(c){if(b(c)){c=a.h.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.Sb(c)},ua:function(c,d){if(b(c)){a.h.Ea(c);for(var e=
	c.nextSibling,f=0,l=d.length;f<l;f++)e.parentNode.insertBefore(d[f],e)}else a.a.ua(c,d)},Uc:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},Vb:function(c,d,e){e?b(c)?c.parentNode.insertBefore(d,e.nextSibling):e.nextSibling?c.insertBefore(d,e.nextSibling):c.appendChild(d):a.h.Uc(c,d)},firstChild:function(a){if(b(a))return!a.nextSibling||c(a.nextSibling)?null:a.nextSibling;if(a.firstChild&&c(a.firstChild))throw Error("Found invalid end comment, as the first child of "+
	a);return a.firstChild},nextSibling:function(d){b(d)&&(d=e(d));if(d.nextSibling&&c(d.nextSibling)){var f=d.nextSibling;if(c(f)&&!a.a.g.get(f,l))throw Error("Found end comment without a matching opening comment, as child of "+d);return null}return d.nextSibling},Bd:b,Ud:function(a){return(a=(f?a.text:a.nodeValue).match(g))?a[1]:null},Rc:function(d){if(m[a.a.P(d)]){var f=d.firstChild;if(f){do if(1===f.nodeType){var l;l=f.firstChild;var g=null;if(l){do if(g)g.push(l);else if(b(l)){var h=e(l,!0);h?l=
	h:g=[l]}else c(l)&&(g=[l]);while(l=l.nextSibling)}if(l=g)for(g=f.nextSibling,h=0;h<l.length;h++)g?d.insertBefore(l[h],g):d.appendChild(l[h])}while(f=f.nextSibling)}}}}})();a.b("virtualElements",a.h);a.b("virtualElements.allowedBindings",a.h.ea);a.b("virtualElements.emptyNode",a.h.Ea);a.b("virtualElements.insertAfter",a.h.Vb);a.b("virtualElements.prepend",a.h.Uc);a.b("virtualElements.setDomNodeChildren",a.h.ua);(function(){a.ga=function(){this.md={}};a.a.extend(a.ga.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=
	b.getAttribute("data-bind")||a.i.getComponentNameForNode(b);case 8:return a.h.Bd(b);default:return!1}},getBindings:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b):null;return a.i.sc(d,b,c,!1)},getBindingAccessors:function(b,c){var d=this.getBindingsString(b,c),d=d?this.parseBindingsString(d,c,b,{valueAccessors:!0}):null;return a.i.sc(d,b,c,!0)},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.h.Ud(b);default:return null}},
	parseBindingsString:function(b,c,d,e){try{var f=this.md,g=b+(e&&e.valueAccessors||""),h;if(!(h=f[g])){var m,l="with($context){with($data||{}){return{"+a.m.ub(b,e)+"}}}";m=new Function("$context","$element",l);h=f[g]=m}return h(c,d)}catch(k){throw k.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+k.message,k;}}});a.ga.instance=new a.ga})();a.b("bindingProvider",a.ga);(function(){function b(b){var c=(b=a.a.g.get(b,B))&&b.M;c&&(b.M=null,c.Sc())}function c(c,d,e){this.node=c;this.xc=
	d;this.ib=[];this.T=!1;d.M||a.a.I.za(c,b);e&&e.M&&(e.M.ib.push(c),this.Kb=e)}function d(a){return function(){return a}}function e(a){return a()}function f(b){return a.a.Ha(a.v.K(b),function(a,c){return function(){return b()[c]}})}function g(b,c,e){return"function"===typeof b?f(b.bind(null,c,e)):a.a.Ha(b,d)}function h(a,b){return f(this.getBindings.bind(this,a,b))}function m(b,c){var d=a.h.firstChild(c);if(d){var e,f=a.ga.instance,k=f.preprocessNode;if(k){for(;e=d;)d=a.h.nextSibling(e),k.call(f,e);
	d=a.h.firstChild(c)}for(;e=d;)d=a.h.nextSibling(e),l(b,e)}a.j.Ga(c,a.j.T)}function l(b,c){var d=b,e=1===c.nodeType;e&&a.h.Rc(c);if(e||a.ga.instance.nodeHasBindings(c))d=q(c,null,b).bindingContextForDescendants;d&&!u[a.a.P(c)]&&m(d,c)}function k(b){var c=[],d={},e=[];a.a.O(b,function ca(f){if(!d[f]){var l=a.getBindingHandler(f);l&&(l.after&&(e.push(f),a.a.C(l.after,function(c){if(b[c]){if(-1!==a.a.A(e,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+e.join(", "));
	ca(c)}}),e.length--),c.push({key:f,Lc:l}));d[f]=!0}});return c}function q(b,c,d){var f=a.a.g.Tb(b,B,{}),l=f.gd;if(!c){if(l)throw Error("You cannot apply bindings multiple times to the same element.");f.gd=!0}l||(f.context=d);var g;if(c&&"function"!==typeof c)g=c;else{var q=a.ga.instance,n=q.getBindingAccessors||h,m=a.$(function(){if(g=c?c(d,b):n.call(q,b,d)){if(d[r])d[r]();if(d[A])d[A]()}return g},null,{l:b});g&&m.ja()||(m=null)}var y=d,u;if(g){var J=function(){return a.a.Ha(m?m():g,e)},t=m?function(a){return function(){return e(m()[a])}}:
	function(a){return g[a]};J.get=function(a){return g[a]&&e(t(a))};J.has=function(a){return a in g};a.j.T in g&&a.j.subscribe(b,a.j.T,function(){var c=(0,g[a.j.T])();if(c){var d=a.h.childNodes(b);d.length&&c(d,a.Dc(d[0]))}});a.j.oa in g&&(y=a.j.Bb(b,d),a.j.subscribe(b,a.j.oa,function(){var c=(0,g[a.j.oa])();c&&a.h.firstChild(b)&&c(b)}));f=k(g);a.a.C(f,function(c){var d=c.Lc.init,e=c.Lc.update,f=c.key;if(8===b.nodeType&&!a.h.ea[f])throw Error("The binding '"+f+"' cannot be used with virtual elements");
	try{"function"==typeof d&&a.v.K(function(){var a=d(b,t(f),J,y.$data,y);if(a&&a.controlsDescendantBindings){if(u!==p)throw Error("Multiple bindings ("+u+" and "+f+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");u=f}}),"function"==typeof e&&a.$(function(){e(b,t(f),J,y.$data,y)},null,{l:b})}catch(l){throw l.message='Unable to process binding "'+f+": "+g[f]+'"\nMessage: '+l.message,l;}})}f=u===p;return{shouldBindDescendants:f,
	bindingContextForDescendants:f&&y}}function n(b,c){return b&&b instanceof a.fa?b:new a.fa(b,p,p,c)}var r=a.a.Da("_subscribable"),y=a.a.Da("_ancestorBindingInfo"),A=a.a.Da("_dataDependency");a.f={};var u={script:!0,textarea:!0,template:!0};a.getBindingHandler=function(b){return a.f[b]};var J={};a.fa=function(b,c,d,e,f){function l(){var b=q?h():h,f=a.a.c(b);c?(a.a.extend(k,c),y in c&&(k[y]=c[y])):(k.$parents=[],k.$root=f,k.ko=a);k[r]=n;g?f=k.$data:(k.$rawData=b,k.$data=f);d&&(k[d]=f);e&&e(k,c,f);if(c&&
	c[r]&&!a.U.o().Ub(c[r]))c[r]();m&&(k[A]=m);return k.$data}var k=this,g=b===J,h=g?p:b,q="function"==typeof h&&!a.N(h),n,m=f&&f.dataDependency;f&&f.exportDependencies?l():(n=a.wb(l),n.w(),n.ja()?n.equalityComparer=null:k[r]=p)};a.fa.prototype.createChildContext=function(b,c,d,e){!e&&c&&"object"==typeof c&&(e=c,c=e.as,d=e.extend);if(c&&e&&e.noChildContext){var f="function"==typeof b&&!a.N(b);return new a.fa(J,this,null,function(a){d&&d(a);a[c]=f?b():b},e)}return new a.fa(b,this,c,function(a,b){a.$parentContext=
	b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)},e)};a.fa.prototype.extend=function(b,c){return new a.fa(J,this,null,function(c){a.a.extend(c,"function"==typeof b?b(c):b)},c)};var B=a.a.g.Z();c.prototype.Sc=function(){this.Kb&&this.Kb.M&&this.Kb.M.rd(this.node)};c.prototype.rd=function(b){a.a.hb(this.ib,b);!this.ib.length&&this.T&&this.Bc()};c.prototype.Bc=function(){this.T=!0;this.xc.M&&!this.ib.length&&(this.xc.M=null,a.a.I.xb(this.node,b),a.j.Ga(this.node,
	a.j.oa),this.Sc())};a.j={T:"childrenComplete",oa:"descendantsComplete",subscribe:function(b,c,d,e){b=a.a.g.Tb(b,B,{});b.Fa||(b.Fa=new a.R);return b.Fa.subscribe(d,e,c)},Ga:function(b,c){var d=a.a.g.get(b,B);if(d&&(d.Fa&&d.Fa.notifySubscribers(b,c),c==a.j.T))if(d.M)d.M.Bc();else if(d.M===p&&d.Fa&&d.Fa.Wa(a.j.oa))throw Error("descendantsComplete event not supported for bindings on this node");},Bb:function(b,d){var e=a.a.g.Tb(b,B,{});e.M||(e.M=new c(b,e,d[y]));return d[y]==e?d:d.extend(function(a){a[y]=
	e})}};a.Sd=function(b){return(b=a.a.g.get(b,B))&&b.context};a.eb=function(b,c,d){1===b.nodeType&&a.h.Rc(b);return q(b,c,n(d))};a.kd=function(b,c,d){d=n(d);return a.eb(b,g(c,d,b),d)};a.Pa=function(a,b){1!==b.nodeType&&8!==b.nodeType||m(n(a),b)};a.uc=function(a,b,c){!v&&z.jQuery&&(v=z.jQuery);if(2>arguments.length){if(b=w.body,!b)throw Error("ko.applyBindings: could not find document.body; has the document been loaded?");}else if(!b||1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
	l(n(a,c),b)};a.Cc=function(b){return!b||1!==b.nodeType&&8!==b.nodeType?p:a.Sd(b)};a.Dc=function(b){return(b=a.Cc(b))?b.$data:p};a.b("bindingHandlers",a.f);a.b("bindingEvent",a.j);a.b("bindingEvent.subscribe",a.j.subscribe);a.b("bindingEvent.startPossiblyAsyncContentBinding",a.j.Bb);a.b("applyBindings",a.uc);a.b("applyBindingsToDescendants",a.Pa);a.b("applyBindingAccessorsToNode",a.eb);a.b("applyBindingsToNode",a.kd);a.b("contextFor",a.Cc);a.b("dataFor",a.Dc)})();(function(b){function c(c,e){var l=
	Object.prototype.hasOwnProperty.call(f,c)?f[c]:b,k;l?l.subscribe(e):(l=f[c]=new a.R,l.subscribe(e),d(c,function(b,d){var e=!(!d||!d.synchronous);g[c]={definition:b,Fd:e};delete f[c];k||e?l.notifySubscribers(b):a.ma.yb(function(){l.notifySubscribers(b)})}),k=!0)}function d(a,b){e("getConfig",[a],function(c){c?e("loadComponent",[a,c],function(a){b(a,c)}):b(null,null)})}function e(c,d,f,k){k||(k=a.i.loaders.slice(0));var g=k.shift();if(g){var n=g[c];if(n){var r=!1;if(n.apply(g,d.concat(function(a){r?
	f(null):null!==a?f(a):e(c,d,f,k)}))!==b&&(r=!0,!g.suppressLoaderExceptions))throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");}else e(c,d,f,k)}else f(null)}var f={},g={};a.i={get:function(d,e){var f=Object.prototype.hasOwnProperty.call(g,d)?g[d]:b;f?f.Fd?a.v.K(function(){e(f.definition)}):a.ma.yb(function(){e(f.definition)}):c(d,e)},Ac:function(a){delete g[a]},nc:e};a.i.loaders=[];a.b("components",a.i);a.b("components.get",a.i.get);
	a.b("components.clearCachedDefinition",a.i.Ac)})();(function(){function b(b,c,d,e){function g(){0===--A&&e(h)}var h={},A=2,u=d.template;d=d.viewModel;u?f(c,u,function(c){a.i.nc("loadTemplate",[b,c],function(a){h.template=a;g()})}):g();d?f(c,d,function(c){a.i.nc("loadViewModel",[b,c],function(a){h[m]=a;g()})}):g()}function c(a,b,d){if("function"===typeof b)d(function(a){return new b(a)});else if("function"===typeof b[m])d(b[m]);else if("instance"in b){var e=b.instance;d(function(){return e})}else"viewModel"in
	b?c(a,b.viewModel,d):a("Unknown viewModel value: "+b)}function d(b){switch(a.a.P(b)){case "script":return a.a.ta(b.text);case "textarea":return a.a.ta(b.value);case "template":if(e(b.content))return a.a.Ca(b.content.childNodes)}return a.a.Ca(b.childNodes)}function e(a){return z.DocumentFragment?a instanceof DocumentFragment:a&&11===a.nodeType}function f(a,b,c){"string"===typeof b.require?T||z.require?(T||z.require)([b.require],c):a("Uses require, but no AMD loader is present"):c(b)}function g(a){return function(b){throw Error("Component '"+
	a+"': "+b);}}var h={};a.i.register=function(b,c){if(!c)throw Error("Invalid configuration for "+b);if(a.i.sb(b))throw Error("Component "+b+" is already registered");h[b]=c};a.i.sb=function(a){return Object.prototype.hasOwnProperty.call(h,a)};a.i.unregister=function(b){delete h[b];a.i.Ac(b)};a.i.Ec={getConfig:function(b,c){c(a.i.sb(b)?h[b]:null)},loadComponent:function(a,c,d){var e=g(a);f(e,c,function(c){b(a,e,c,d)})},loadTemplate:function(b,c,f){b=g(b);if("string"===typeof c)f(a.a.ta(c));else if(c instanceof
	Array)f(c);else if(e(c))f(a.a.la(c.childNodes));else if(c.element)if(c=c.element,z.HTMLElement?c instanceof HTMLElement:c&&c.tagName&&1===c.nodeType)f(d(c));else if("string"===typeof c){var h=w.getElementById(c);h?f(d(h)):b("Cannot find element with ID "+c)}else b("Unknown element type: "+c);else b("Unknown template value: "+c)},loadViewModel:function(a,b,d){c(g(a),b,d)}};var m="createViewModel";a.b("components.register",a.i.register);a.b("components.isRegistered",a.i.sb);a.b("components.unregister",
	a.i.unregister);a.b("components.defaultLoader",a.i.Ec);a.i.loaders.push(a.i.Ec);a.i.cd=h})();(function(){function b(b,e){var f=b.getAttribute("params");if(f){var f=c.parseBindingsString(f,e,b,{valueAccessors:!0,bindingParams:!0}),f=a.a.Ha(f,function(c){return a.o(c,null,{l:b})}),g=a.a.Ha(f,function(c){var e=c.w();return c.ja()?a.o({read:function(){return a.a.c(c())},write:a.Ya(e)&&function(a){c()(a)},l:b}):e});Object.prototype.hasOwnProperty.call(g,"$raw")||(g.$raw=f);return g}return{$raw:{}}}a.i.getComponentNameForNode=
	function(b){var c=a.a.P(b);if(a.i.sb(c)&&(-1!=c.indexOf("-")||"[object HTMLUnknownElement]"==""+b||8>=a.a.W&&b.tagName===c))return c};a.i.sc=function(c,e,f,g){if(1===e.nodeType){var h=a.i.getComponentNameForNode(e);if(h){c=c||{};if(c.component)throw Error('Cannot use the "component" binding on a custom element matching a component');var m={name:h,params:b(e,f)};c.component=g?function(){return m}:m}}return c};var c=new a.ga;9>a.a.W&&(a.i.register=function(a){return function(b){return a.apply(this,
	arguments)}}(a.i.register),w.createDocumentFragment=function(b){return function(){var c=b(),f=a.i.cd,g;for(g in f);return c}}(w.createDocumentFragment))})();(function(){function b(b,c,d){c=c.template;if(!c)throw Error("Component '"+b+"' has no template");b=a.a.Ca(c);a.h.ua(d,b)}function c(a,b,c){var d=a.createViewModel;return d?d.call(a,b,c):b}var d=0;a.f.component={init:function(e,f,g,h,m){function l(){var a=k&&k.dispose;"function"===typeof a&&a.call(k);n&&n.s();q=k=n=null}var k,q,n,r=a.a.la(a.h.childNodes(e));
	a.h.Ea(e);a.a.I.za(e,l);a.o(function(){var g=a.a.c(f()),h,u;"string"===typeof g?h=g:(h=a.a.c(g.name),u=a.a.c(g.params));if(!h)throw Error("No component name specified");var p=a.j.Bb(e,m),B=q=++d;a.i.get(h,function(d){if(q===B){l();if(!d)throw Error("Unknown component '"+h+"'");b(h,d,e);var f=c(d,u,{element:e,templateNodes:r});d=p.createChildContext(f,{extend:function(a){a.$component=f;a.$componentTemplateNodes=r}});f&&f.koDescendantsComplete&&(n=a.j.subscribe(e,a.j.oa,f.koDescendantsComplete,f));
	k=f;a.Pa(d,e)}})},null,{l:e});return{controlsDescendantBindings:!0}}};a.h.ea.component=!0})();var V={"class":"className","for":"htmlFor"};a.f.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.O(d,function(c,d){d=a.a.c(d);var g=c.indexOf(":"),g="lookupNamespaceURI"in b&&0<g&&b.lookupNamespaceURI(c.substr(0,g)),h=!1===d||null===d||d===p;h?g?b.removeAttributeNS(g,c):b.removeAttribute(c):d=d.toString();8>=a.a.W&&c in V?(c=V[c],h?b.removeAttribute(c):b[c]=d):h||(g?b.setAttributeNS(g,c,d):b.setAttribute(c,
	d));"name"===c&&a.a.Xc(b,h?"":d)})}};(function(){a.f.checked={after:["value","attr"],init:function(b,c,d){function e(){var e=b.checked,f=g();if(!a.U.rb()&&(e||!m&&!a.U.pa())){var l=a.v.K(c);if(k){var n=q?l.w():l,B=r;r=f;B!==f?e&&(a.a.Oa(n,f,!0),a.a.Oa(n,B,!1)):a.a.Oa(n,f,e);q&&a.Ya(l)&&l(n)}else h&&(f===p?f=e:e||(f=p)),a.m.$a(l,d,"checked",f,!0)}}function f(){var d=a.a.c(c()),e=g();k?(b.checked=0<=a.a.A(d,e),r=e):b.checked=h&&e===p?!!d:g()===d}var g=a.wb(function(){if(d.has("checkedValue"))return a.a.c(d.get("checkedValue"));
	if(n)return d.has("value")?a.a.c(d.get("value")):b.value}),h="checkbox"==b.type,m="radio"==b.type;if(h||m){var l=c(),k=h&&a.a.c(l)instanceof Array,q=!(k&&l.push&&l.splice),n=m||k,r=k?g():p;m&&!b.name&&a.f.uniqueName.init(b,function(){return!0});a.o(e,null,{l:b});a.a.H(b,"click",e);a.o(f,null,{l:b});l=p}}};a.m.va.checked=!0;a.f.checkedValue={update:function(b,c){b.value=a.a.c(c())}}})();a.f["class"]={update:function(b,c){var d=a.a.Cb(a.a.c(c()));a.a.Eb(b,b.__ko__cssValue,!1);b.__ko__cssValue=d;a.a.Eb(b,
	d,!0)}};a.f.css={update:function(b,c){var d=a.a.c(c());null!==d&&"object"==typeof d?a.a.O(d,function(c,d){d=a.a.c(d);a.a.Eb(b,c,d)}):a.f["class"].update(b,c)}};a.f.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):d||b.disabled||(b.disabled=!0)}};a.f.disable={update:function(b,c){a.f.enable.update(b,function(){return!a.a.c(c())})}};a.f.event={init:function(b,c,d,e,f){var g=c()||{};a.a.O(g,function(g){"string"==typeof g&&a.a.H(b,g,function(b){var l,k=c()[g];
	if(k){try{var q=a.a.la(arguments);e=f.$data;q.unshift(e);l=k.apply(e,q)}finally{!0!==l&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}!1===d.get(g+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.f.foreach={Qc:function(b){return function(){var c=b(),d=a.a.$b(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.ba.Na};a.a.c(c);return{foreach:d.data,as:d.as,noChildContext:d.noChildContext,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,
	beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.ba.Na}}},init:function(b,c){return a.f.template.init(b,a.f.foreach.Qc(c))},update:function(b,c,d,e,f){return a.f.template.update(b,a.f.foreach.Qc(c),d,e,f)}};a.m.Ra.foreach=!1;a.h.ea.foreach=!0;a.f.hasfocus={init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var f=b.ownerDocument;if("activeElement"in f){var g;try{g=f.activeElement}catch(k){g=f.body}e=g===b}f=c();a.m.$a(f,
	d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var f=e.bind(null,!0),g=e.bind(null,!1);a.a.H(b,"focus",f);a.a.H(b,"focusin",f);a.a.H(b,"blur",g);a.a.H(b,"focusout",g);b.__ko_hasfocusLastValue=!1},update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),!d&&b.__ko_hasfocusLastValue&&b.ownerDocument.body.focus(),a.v.K(a.a.Fb,null,[b,d?"focusin":"focusout"]))}};a.m.va.hasfocus=!0;a.f.hasFocus=a.f.hasfocus;a.m.va.hasFocus=
	"hasfocus";a.f.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.dc(b,c())}};(function(){function b(b,d,e){a.f[b]={init:function(b,c,h,m,l){var k,q,n={},r,p,A;if(d){m=h.get("as");var u=h.get("noChildContext");A=!(m&&u);n={as:m,noChildContext:u,exportDependencies:A}}p=(r="render"==h.get("completeOn"))||h.has(a.j.oa);a.o(function(){var h=a.a.c(c()),m=!e!==!h,u=!q,t;if(A||m!==k){p&&(l=a.j.Bb(b,l));if(m){if(!d||A)n.dataDependency=a.U.o();t=d?l.createChildContext("function"==
	typeof h?h:c,n):a.U.pa()?l.extend(null,n):l}u&&a.U.pa()&&(q=a.a.Ca(a.h.childNodes(b),!0));m?(u||a.h.ua(b,a.a.Ca(q)),a.Pa(t,b)):(a.h.Ea(b),r||a.j.Ga(b,a.j.T));k=m}},null,{l:b});return{controlsDescendantBindings:!0}}};a.m.Ra[b]=!1;a.h.ea[b]=!0}b("if");b("ifnot",!1,!0);b("with",!0)})();a.f.let={init:function(b,c,d,e,f){c=f.extend(c);a.Pa(c,b);return{controlsDescendantBindings:!0}}};a.h.ea.let=!0;var Q={};a.f.options={init:function(b){if("select"!==a.a.P(b))throw Error("options binding applies only to SELECT elements");
	for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,c,d){function e(){return a.a.fb(b.options,function(a){return a.selected})}function f(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function g(c,e){if(y&&k)a.u.ya(b,a.a.c(d.get("value")),!0);else if(r.length){var f=0<=a.a.A(r,a.u.L(e[0]));a.a.Yc(e[0],f);y&&!f&&a.v.K(a.a.Fb,null,[b,"change"])}}var h=b.multiple,m=0!=b.length&&h?b.scrollTop:null,l=a.a.c(c()),k=d.get("valueAllowUnset")&&d.has("value"),
	q=d.get("optionsIncludeDestroyed");c={};var n,r=[];k||(h?r=a.a.Mb(e(),a.u.L):0<=b.selectedIndex&&r.push(a.u.L(b.options[b.selectedIndex])));l&&("undefined"==typeof l.length&&(l=[l]),n=a.a.fb(l,function(b){return q||b===p||null===b||!a.a.c(b._destroy)}),d.has("optionsCaption")&&(l=a.a.c(d.get("optionsCaption")),null!==l&&l!==p&&n.unshift(Q)));var y=!1;c.beforeRemove=function(a){b.removeChild(a)};l=g;d.has("optionsAfterRender")&&"function"==typeof d.get("optionsAfterRender")&&(l=function(b,c){g(0,c);
	a.v.K(d.get("optionsAfterRender"),null,[c[0],b!==Q?b:p])});a.a.cc(b,n,function(c,e,g){g.length&&(r=!k&&g[0].selected?[a.u.L(g[0])]:[],y=!0);e=b.ownerDocument.createElement("option");c===Q?(a.a.Ab(e,d.get("optionsCaption")),a.u.ya(e,p)):(g=f(c,d.get("optionsValue"),c),a.u.ya(e,a.a.c(g)),c=f(c,d.get("optionsText"),g),a.a.Ab(e,c));return[e]},c,l);a.v.K(function(){if(k)a.u.ya(b,a.a.c(d.get("value")),!0);else{var c;h?c=r.length&&e().length<r.length:c=r.length&&0<=b.selectedIndex?a.u.L(b.options[b.selectedIndex])!==
	r[0]:r.length||0<=b.selectedIndex;c&&a.a.Fb(b,"change")}});a.a.vd(b);m&&20<Math.abs(m-b.scrollTop)&&(b.scrollTop=m)}};a.f.options.Yb=a.a.g.Z();a.f.selectedOptions={after:["options","foreach"],init:function(b,c,d){a.a.H(b,"change",function(){var e=c(),f=[];a.a.C(b.getElementsByTagName("option"),function(b){b.selected&&f.push(a.u.L(b))});a.m.$a(e,d,"selectedOptions",f)})},update:function(b,c){if("select"!=a.a.P(b))throw Error("values binding applies only to SELECT elements");var d=a.a.c(c()),e=b.scrollTop;
	d&&"number"==typeof d.length&&a.a.C(b.getElementsByTagName("option"),function(b){var c=0<=a.a.A(d,a.u.L(b));b.selected!=c&&a.a.Yc(b,c)});b.scrollTop=e}};a.m.va.selectedOptions=!0;a.f.style={update:function(b,c){var d=a.a.c(c()||{});a.a.O(d,function(c,d){d=a.a.c(d);if(null===d||d===p||!1===d)d="";if(v)v(b).css(c,d);else if(/^--/.test(c))b.style.setProperty(c,d);else{c=c.replace(/-(\w)/g,function(a,b){return b.toUpperCase()});var g=b.style[c];b.style[c]=d;d===g||b.style[c]!=g||isNaN(d)||(b.style[c]=
	d+"px")}})}};a.f.submit={init:function(b,c,d,e,f){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");a.a.H(b,"submit",function(a){var d,e=c();try{d=e.call(f.$data,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.f.text={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Ab(b,c())}};a.h.ea.text=!0;(function(){if(z&&z.navigator){var b=function(a){if(a)return parseFloat(a[1])},c=z.navigator.userAgent,
	d,e,f,g,h;(d=z.opera&&z.opera.version&&parseInt(z.opera.version()))||(h=b(c.match(/Edge\/([^ ]+)$/)))||b(c.match(/Chrome\/([^ ]+)/))||(e=b(c.match(/Version\/([^ ]+) Safari/)))||(f=b(c.match(/Firefox\/([^ ]+)/)))||(g=a.a.W||b(c.match(/MSIE ([^ ]+)/)))||(g=b(c.match(/rv:([^ )]+)/)))}if(8<=g&&10>g)var m=a.a.g.Z(),l=a.a.g.Z(),k=function(b){var c=this.activeElement;(c=c&&a.a.g.get(c,l))&&c(b)},q=function(b,c){var d=b.ownerDocument;a.a.g.get(d,m)||(a.a.g.set(d,m,!0),a.a.H(d,"selectionchange",k));a.a.g.set(b,
	l,c)};a.f.textInput={init:function(b,c,l){function k(c,d){a.a.H(b,c,d)}function m(){var d=a.a.c(c());if(null===d||d===p)d="";L!==p&&d===L?a.a.setTimeout(m,4):b.value!==d&&(x=!0,b.value=d,x=!1,v=b.value)}function t(){w||(L=b.value,w=a.a.setTimeout(B,4))}function B(){clearTimeout(w);L=w=p;var d=b.value;v!==d&&(v=d,a.m.$a(c(),l,"textInput",d))}var v=b.value,w,L,z=9==a.a.W?t:B,x=!1;g&&k("keypress",B);11>g&&k("propertychange",function(a){x||"value"!==a.propertyName||z(a)});8==g&&(k("keyup",B),k("keydown",
	B));q&&(q(b,z),k("dragend",t));(!g||9<=g)&&k("input",z);5>e&&"textarea"===a.a.P(b)?(k("keydown",t),k("paste",t),k("cut",t)):11>d?k("keydown",t):4>f?(k("DOMAutoComplete",B),k("dragdrop",B),k("drop",B)):h&&"number"===b.type&&k("keydown",t);k("change",B);k("blur",B);a.o(m,null,{l:b})}};a.m.va.textInput=!0;a.f.textinput={preprocess:function(a,b,c){c("textInput",a)}}})();a.f.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.f.uniqueName.qd;a.a.Xc(b,d)}}};a.f.uniqueName.qd=0;a.f.using={init:function(b,
	c,d,e,f){var g;d.has("as")&&(g={as:d.get("as"),noChildContext:d.get("noChildContext")});c=f.createChildContext(c,g);a.Pa(c,b);return{controlsDescendantBindings:!0}}};a.h.ea.using=!0;a.f.value={after:["options","foreach"],init:function(b,c,d){var e=a.a.P(b),f="input"==e;if(!f||"checkbox"!=b.type&&"radio"!=b.type){var g=["change"],h=d.get("valueUpdate"),m=!1,l=null;h&&("string"==typeof h&&(h=[h]),a.a.gb(g,h),g=a.a.vc(g));var k=function(){l=null;m=!1;var e=c(),f=a.u.L(b);a.m.$a(e,d,"value",f)};!a.a.W||
	!f||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.A(g,"propertychange")||(a.a.H(b,"propertychange",function(){m=!0}),a.a.H(b,"focus",function(){m=!1}),a.a.H(b,"blur",function(){m&&k()}));a.a.C(g,function(c){var d=k;a.a.Td(c,"after")&&(d=function(){l=a.u.L(b);a.a.setTimeout(k,0)},c=c.substring(5));a.a.H(b,c,d)});var q;q=f&&"file"==b.type?function(){var d=a.a.c(c());null===d||d===p||""===d?b.value="":a.v.K(k)}:function(){var f=a.a.c(c()),g=a.u.L(b);if(null!==l&&
	f===l)a.a.setTimeout(q,0);else if(f!==g||g===p)"select"===e?(g=d.get("valueAllowUnset"),a.u.ya(b,f,g),g||f===a.u.L(b)||a.v.K(k)):a.u.ya(b,f)};a.o(q,null,{l:b})}else a.eb(b,{checkedValue:c})},update:function(){}};a.m.va.value=!0;a.f.visible={update:function(b,c){var d=a.a.c(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};a.f.hidden={update:function(b,c){a.f.visible.update(b,function(){return!a.a.c(c())})}};(function(b){a.f[b]={init:function(c,d,e,f,g){return a.f.event.init.call(this,
	c,function(){var a={};a[b]=d();return a},e,f,g)}}})("click");a.ca=function(){};a.ca.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.ca.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.ca.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.B.D(d)}if(1==b.nodeType||8==b.nodeType)return new a.B.ia(b);
	throw Error("Unknown template type: "+b);};a.ca.prototype.renderTemplate=function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,d,e)};a.ca.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.ca.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.ca);a.ic=function(){function b(b,c,d,h){b=a.m.Zb(b);
	for(var m=a.m.Ra,l=0;l<b.length;l++){var k=b[l].key;if(Object.prototype.hasOwnProperty.call(m,k)){var q=m[k];if("function"===typeof q){if(k=q(b[l].value))throw Error(k);}else if(!q)throw Error("This template engine does not support the '"+k+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.m.ub(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return h.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
	d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{wd:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.ic.Kd(b,c)},d)},Kd:function(a,f){return a.replace(c,function(a,c,d,e,k){return b(k,c,d,f)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",f)})},ld:function(b,c){return a.aa.Wb(function(d,h){var m=d.nextSibling;m&&m.nodeName.toLowerCase()===c&&a.eb(m,b,h)})}}}();a.b("__tr_ambtns",a.ic.ld);(function(){a.B={};a.B.D=function(b){if(this.D=b){var c=
	a.a.P(b);this.Db="script"===c?1:"textarea"===c?2:"template"==c&&b.content&&11===b.content.nodeType?3:4}};a.B.D.prototype.text=function(){var b=1===this.Db?"text":2===this.Db?"value":"innerHTML";if(0==arguments.length)return this.D[b];var c=arguments[0];"innerHTML"===b?a.a.dc(this.D,c):this.D[b]=c};var b=a.a.g.Z()+"_";a.B.D.prototype.data=function(c){if(1===arguments.length)return a.a.g.get(this.D,b+c);a.a.g.set(this.D,b+c,arguments[1])};var c=a.a.g.Z();a.B.D.prototype.nodes=function(){var b=this.D;
	if(0==arguments.length){var e=a.a.g.get(b,c)||{},f=e.jb||(3===this.Db?b.content:4===this.Db?b:p);if(!f||e.hd)if(e=this.text())f=a.a.Ld(e,b.ownerDocument),this.text(""),a.a.g.set(b,c,{jb:f,hd:!0});return f}a.a.g.set(b,c,{jb:arguments[0]})};a.B.ia=function(a){this.D=a};a.B.ia.prototype=new a.B.D;a.B.ia.prototype.constructor=a.B.ia;a.B.ia.prototype.text=function(){if(0==arguments.length){var b=a.a.g.get(this.D,c)||{};b.jc===p&&b.jb&&(b.jc=b.jb.innerHTML);return b.jc}a.a.g.set(this.D,c,{jc:arguments[0]})};
	a.b("templateSources",a.B);a.b("templateSources.domElement",a.B.D);a.b("templateSources.anonymousTemplate",a.B.ia)})();(function(){function b(b,c,d){var e;for(c=a.h.nextSibling(c);b&&(e=b)!==c;)b=a.h.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var e=c[0],f=c[c.length-1],g=e.parentNode,h=a.ga.instance,m=h.preprocessNode;if(m){b(e,f,function(a,b){var c=a.previousSibling,d=m.call(h,a);d&&(a===e&&(e=d[0]||b),a===f&&(f=d[d.length-1]||c))});c.length=0;if(!e)return;e===f?c.push(e):(c.push(e,f),a.a.Ua(c,
	g))}b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.uc(d,b)});b(e,f,function(b){1!==b.nodeType&&8!==b.nodeType||a.aa.bd(b,[d])});a.a.Ua(c,g)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,f,h,m){m=m||{};var p=(b&&d(b)||f||{}).ownerDocument,A=m.templateEngine||g;a.ic.wd(f,A,p);f=A.renderTemplate(f,h,m,p);if("number"!=typeof f.length||0<f.length&&"number"!=typeof f[0].nodeType)throw Error("Template engine must return an array of DOM nodes");p=!1;switch(e){case "replaceChildren":a.h.ua(b,
	f);p=!0;break;case "replaceNode":a.a.Wc(b,f);p=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+e);}p&&(c(f,h),m.afterRender&&a.v.K(m.afterRender,null,[f,h[m.as||"$data"]]),"replaceChildren"==e&&a.j.Ga(b,a.j.T));return f}function f(b,c,d){return a.N(b)?b():"function"===typeof b?b(c,d):b}var g;a.ec=function(b){if(b!=p&&!(b instanceof a.ca))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.bc=function(b,c,h,m,r){h=h||{};if((h.templateEngine||g)==
	p)throw Error("Set a template engine before calling renderTemplate");r=r||"replaceChildren";if(m){var y=d(m);return a.$(function(){var g=c&&c instanceof a.fa?c:new a.fa(c,null,null,null,{exportDependencies:!0}),p=f(b,g.$data,g),g=e(m,r,p,g,h);"replaceNode"==r&&(m=g,y=d(m))},null,{Sa:function(){return!y||!a.a.Rb(y)},l:y&&"replaceNode"==r?y.parentNode:y})}return a.aa.Wb(function(d){a.bc(b,c,h,d,"replaceNode")})};a.Pd=function(b,d,g,h,m){function y(b,c){a.v.K(a.a.cc,null,[h,b,u,g,t,c]);a.j.Ga(h,a.j.T)}
	function t(a,b){c(b,v);g.afterRender&&g.afterRender(b,a);v=null}function u(a,c){v=m.createChildContext(a,{as:B,noChildContext:g.noChildContext,extend:function(a){a.$index=c;B&&(a[B+"Index"]=c)}});var d=f(b,a,v);return e(h,"ignoreTargetNode",d,v,g)}var v,B=g.as,w=!1===g.includeDestroyed||a.options.foreachHidesDestroyed&&!g.includeDestroyed;if(w||g.beforeRemove||!a.Oc(d))return a.$(function(){var b=a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);w&&(b=a.a.fb(b,function(b){return b===p||null===b||
	!a.a.c(b._destroy)}));y(b)},null,{l:h});y(d.w());var z=d.subscribe(function(a){y(d(),a)},null,"arrayChange");z.l(h);return z};var h=a.a.g.Z(),m=a.a.g.Z();a.f.template={init:function(b,c){var d=a.a.c(c());if("string"==typeof d||d.name)a.h.Ea(b);else if("nodes"in d){d=d.nodes||[];if(a.N(d))throw Error('The "nodes" option must be a plain, non-observable array.');var e=d[0]&&d[0].parentNode;e&&a.a.g.get(e,m)||(e=a.a.Xb(d),a.a.g.set(e,m,!0));(new a.B.ia(b)).nodes(e)}else if(d=a.h.childNodes(b),0<d.length)e=
	a.a.Xb(d),(new a.B.ia(b)).nodes(e);else throw Error("Anonymous template defined, but no template content was provided");return{controlsDescendantBindings:!0}},update:function(b,c,d,e,f){var g=c();c=a.a.c(g);d=!0;e=null;"string"==typeof c?c={}:(g=c.name,"if"in c&&(d=a.a.c(c["if"])),d&&"ifnot"in c&&(d=!a.a.c(c.ifnot)));"foreach"in c?e=a.Pd(g||b,d&&c.foreach||[],c,b,f):d?(d=f,"data"in c&&(d=f.createChildContext(c.data,{as:c.as,noChildContext:c.noChildContext,exportDependencies:!0})),e=a.bc(g||b,d,c,
	b)):a.h.Ea(b);f=e;(c=a.a.g.get(b,h))&&"function"==typeof c.s&&c.s();a.a.g.set(b,h,!f||f.ja&&!f.ja()?p:f)}};a.m.Ra.template=function(b){b=a.m.Zb(b);return 1==b.length&&b[0].unknown||a.m.Hd(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.h.ea.template=!0})();a.b("setTemplateEngine",a.ec);a.b("renderTemplate",a.bc);a.a.Jc=function(a,c,d){if(a.length&&c.length){var e,f,g,h,m;for(e=f=0;(!d||e<d)&&(h=a[f]);++f){for(g=0;m=c[g];++g)if(h.value===m.value){h.moved=
	m.index;m.moved=h.index;c.splice(g,1);e=g=0;break}e+=g}}};a.a.Ob=function(){function b(b,d,e,f,g){var h=Math.min,m=Math.max,l=[],k,p=b.length,n,r=d.length,t=r-p||1,A=p+r+1,u,v,w;for(k=0;k<=p;k++)for(v=u,l.push(u=[]),w=h(r,k+t),n=m(0,k-1);n<=w;n++)u[n]=n?k?b[k-1]===d[n-1]?v[n-1]:h(v[n]||A,u[n-1]||A)+1:n+1:k+1;h=[];m=[];t=[];k=p;for(n=r;k||n;)r=l[k][n]-1,n&&r===l[k][n-1]?m.push(h[h.length]={status:e,value:d[--n],index:n}):k&&r===l[k-1][n]?t.push(h[h.length]={status:f,value:b[--k],index:k}):(--n,--k,
	g.sparse||h.push({status:"retained",value:d[n]}));a.a.Jc(t,m,!g.dontLimitMoves&&10*p);return h.reverse()}return function(a,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];d=d||[];return a.length<d.length?b(a,d,"added","deleted",e):b(d,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.Ob);(function(){function b(b,c,d,h,m){var l=[],k=a.$(function(){var k=c(d,m,a.a.Ua(l,b))||[];0<l.length&&(a.a.Wc(l,k),h&&a.v.K(h,null,[d,k,m]));l.length=0;a.a.gb(l,k)},null,{l:b,Sa:function(){return!a.a.jd(l)}});
	return{Y:l,$:k.ja()?k:p}}var c=a.a.g.Z(),d=a.a.g.Z();a.a.cc=function(e,f,g,h,m,l){function k(b){x={Aa:b,nb:a.sa(w++)};v.push(x);t||F.push(x)}function q(b){x=r[b];w!==x.nb.w()&&D.push(x);x.nb(w++);a.a.Ua(x.Y,e);v.push(x)}function n(b,c){if(b)for(var d=0,e=c.length;d<e;d++)a.a.C(c[d].Y,function(a){b(a,d,c[d].Aa)})}f=f||[];"undefined"==typeof f.length&&(f=[f]);h=h||{};var r=a.a.g.get(e,c),t=!r,v=[],u=0,w=0,B=[],z=[],C=[],D=[],F=[],x,I=0;if(t)a.a.C(f,k);else{if(!l||r&&r._countWaitingForRemove){var E=
	a.a.Mb(r,function(a){return a.Aa});l=a.a.Ob(E,f,{dontLimitMoves:h.dontLimitMoves,sparse:!0})}for(var E=0,G,H,K;G=l[E];E++)switch(H=G.moved,K=G.index,G.status){case "deleted":for(;u<K;)q(u++);H===p&&(x=r[u],x.$&&(x.$.s(),x.$=p),a.a.Ua(x.Y,e).length&&(h.beforeRemove&&(v.push(x),I++,x.Aa===d?x=null:C.push(x)),x&&B.push.apply(B,x.Y)));u++;break;case "added":for(;w<K;)q(u++);H!==p?(z.push(v.length),q(H)):k(G.value)}for(;w<f.length;)q(u++);v._countWaitingForRemove=I}a.a.g.set(e,c,v);n(h.beforeMove,D);a.a.C(B,
	h.beforeRemove?a.na:a.removeNode);var M,O,P;try{P=e.ownerDocument.activeElement}catch(N){}if(z.length)for(;(E=z.shift())!=p;){x=v[E];for(M=p;E;)if((O=v[--E].Y)&&O.length){M=O[O.length-1];break}for(f=0;u=x.Y[f];M=u,f++)a.h.Vb(e,u,M)}E=0;for(z=a.h.firstChild(e);x=v[E];E++){x.Y||a.a.extend(x,b(e,g,x.Aa,m,x.nb));for(f=0;u=x.Y[f];z=u.nextSibling,M=u,f++)u!==z&&a.h.Vb(e,u,M);!x.Dd&&m&&(m(x.Aa,x.Y,x.nb),x.Dd=!0,M=x.Y[x.Y.length-1])}P&&e.ownerDocument.activeElement!=P&&P.focus();n(h.beforeRemove,C);for(E=
	0;E<C.length;++E)C[E].Aa=d;n(h.afterMove,D);n(h.afterAdd,F)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.cc);a.ba=function(){this.allowTemplateRewriting=!1};a.ba.prototype=new a.ca;a.ba.prototype.constructor=a.ba;a.ba.prototype.renderTemplateSource=function(b,c,d,e){if(c=(9>a.a.W?0:b.nodes)?b.nodes():null)return a.a.la(c.cloneNode(!0).childNodes);b=b.text();return a.a.ta(b,e)};a.ba.Na=new a.ba;a.ec(a.ba.Na);a.b("nativeTemplateEngine",a.ba);(function(){a.Za=function(){var a=this.Gd=function(){if(!v||
	!v.tmpl)return 0;try{if(0<=v.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,f,g){g=g||w;f=f||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=v.template(null,"{{ko_with $item.koBindingContext}}"+h+"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=v.extend({koBindingContext:e},f.templateOptions);e=v.tmpl(h,b,e);e.appendTo(g.createElement("div"));
	v.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(v.tmpl.tag.ko_code={open:"__.push($1 || '');"},v.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.Za.prototype=new a.ca;a.Za.prototype.constructor=a.Za;var b=new a.Za;0<b.Gd&&a.ec(b);a.b("jqueryTmplTemplateEngine",a.Za)})()})})();})();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);
	
	function ViewModel(options) {
		options || (options = {});
		
		this.options = options;
		this.view = options.view;
	}
	
	// Override the default `getView` logic that Durandal utilises to
	// fetch the view for each ViewModel instance.
	ViewModel.prototype.getView = function() {
		var view = $.trim(this.view);
		return $.parseHTML(view)[0];
	};
	
	module.exports = ViewModel;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The composition module encapsulates all functionality related to visual composition.
	 * @module composition
	 * @requires system
	 * @requires viewLocator
	 * @requires binder
	 * @requires viewEngine
	 * @requires activator
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(14), __webpack_require__(11), __webpack_require__(7), __webpack_require__(8), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, viewLocator, binder, viewEngine, activator, $, ko) {
	    var dummyModel = {},
	        activeViewAttributeName = 'data-active-view',
	        composition,
	        compositionCompleteCallbacks = [],
	        compositionCount = 0,
	        compositionDataKey = 'durandal-composition-data',
	        partAttributeName = 'data-part',
	        bindableSettings = ['model', 'view', 'transition', 'area', 'strategy', 'activationData', 'onError'],
	        visibilityKey = "durandal-visibility-data",
	        composeBindings = ['compose:'];
	    
	    function onError(context, error, element) {
	        try {
	            if (context.onError) {
	                try {
	                    context.onError(error, element);
	                } catch (e) {
	                    system.error(e);
	                }
	            } else {
	                system.error(error);
	            }
	        } finally {
	            endComposition(context, element, true);
	        }
	    }
	
	    function getHostState(parent) {
	        var elements = [];
	        var state = {
	            childElements: elements,
	            activeView: null
	        };
	
	        var child = ko.virtualElements.firstChild(parent);
	
	        while (child) {
	            if (child.nodeType == 1) {
	                elements.push(child);
	                if (child.getAttribute(activeViewAttributeName)) {
	                    state.activeView = child;
	                }
	            }
	
	            child = ko.virtualElements.nextSibling(child);
	        }
	
	        if(!state.activeView){
	            state.activeView = elements[0];
	        }
	
	        return state;
	    }
	
	    function endComposition(context, element, error) {
	        compositionCount--;
	
	        if(compositionCount === 0) {
	            var callBacks = compositionCompleteCallbacks;
	            compositionCompleteCallbacks = [];
	            
	            if (!error) {
	                setTimeout(function () {
	                    var i = callBacks.length;
	
	                    while (i--) {
	                        try {
	                            callBacks[i]();
	                        } catch (e) {
	                            onError(context, e, element);
	                        }
	                    }
	                }, 1);
	            }
	        }
	
	        cleanUp(context);
	    }
	
	    function cleanUp(context){
	        delete context.activeView;
	        delete context.viewElements;
	    }
	
	    function tryActivate(context, successCallback, skipActivation, element) {
	        if(skipActivation){
	            successCallback();
	        } else if (context.activate && context.model && context.model.activate) {
	            var result;
	
	            try{
	                if(system.isArray(context.activationData)) {
	                    result = context.model.activate.apply(context.model, context.activationData);
	                } else {
	                    result = context.model.activate(context.activationData);
	                }
	
	                if(result && result.then) {
	                    result.then(successCallback, function(reason) {
	                        onError(context, reason, element);
	                        successCallback();
	                    });
	                } else if(result || result === undefined) {
	                    successCallback();
	                } else {
	                    endComposition(context, element);
	                }
	            }
	            catch(e){
	                onError(context, e, element);
	            }
	        } else {
	            successCallback();
	        }
	    }
	
	    function triggerAttach(context, element) {
	        var context = this;
	
	        if (context.activeView) {
	            context.activeView.removeAttribute(activeViewAttributeName);
	        }
	
	        if (context.child) {
	            try{
	                if (context.model && context.model.attached) {
	                    if (context.composingNewView || context.alwaysTriggerAttach) {
	                        context.model.attached(context.child, context.parent, context);
	                    }
	                }
	
	                if (context.attached) {
	                    context.attached(context.child, context.parent, context);
	                }
	
	                context.child.setAttribute(activeViewAttributeName, true);
	
	                if (context.composingNewView && context.model && context.model.detached) {
	                    ko.utils.domNodeDisposal.addDisposeCallback(context.child, function () {
	                        try{
	                            context.model.detached(context.child, context.parent, context);
	                        }catch(e2){
	                            onError(context, e2, element);
	                        }
	                    });
	                }
	            }catch(e){
	                onError(context, e, element);
	            }
	        }
	
	        context.triggerAttach = system.noop;
	    }
	
	    function shouldTransition(context) {
	        if (system.isString(context.transition)) {
	            if (context.activeView) {
	                if (context.activeView == context.child) {
	                    return false;
	                }
	
	                if (!context.child) {
	                    return true;
	                }
	
	                if (context.skipTransitionOnSameViewId) {
	                    var currentViewId = context.activeView.getAttribute('data-view');
	                    var newViewId = context.child.getAttribute('data-view');
	                    return currentViewId != newViewId;
	                }
	            }
	
	            return true;
	        }
	
	        return false;
	    }
	
	    function cloneNodes(nodesArray) {
	        for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
	            var clonedNode = nodesArray[i].cloneNode(true);
	            newNodesArray.push(clonedNode);
	        }
	        return newNodesArray;
	    }
	
	    function replaceParts(context){
	        var parts = cloneNodes(context.parts);
	        var replacementParts = composition.getParts(parts);
	        var standardParts = composition.getParts(context.child);
	
	        for (var partId in replacementParts) {
	            var toReplace = standardParts[partId];
	            if (!toReplace) {
	                toReplace = $('[data-part="' + partId + '"]', context.child).get(0);
	                if (!toReplace) {
	                    system.log('Could not find part to override: ' + partId);
	                    continue;
	                }
	            }
	
	            toReplace.parentNode.replaceChild(replacementParts[partId], toReplace);
	        }
	    }
	
	    function removePreviousView(context){
	        var children = ko.virtualElements.childNodes(context.parent), i, len;
	
	        if(!system.isArray(children)){
	            var arrayChildren = [];
	            for(i = 0, len = children.length; i < len; i++){
	                arrayChildren[i] = children[i];
	            }
	            children = arrayChildren;
	        }
	
	        for(i = 1,len = children.length; i < len; i++){
	            ko.removeNode(children[i]);
	        }
	    }
	
	    function hide(view) {
	        ko.utils.domData.set(view, visibilityKey, view.style.display);
	        view.style.display = 'none';
	    }
	
	    function show(view) {
	        var displayStyle = ko.utils.domData.get(view, visibilityKey);
	        view.style.display = displayStyle === 'none' ? 'block' : displayStyle;
	    }
	
	    function hasComposition(element){
	        var dataBind = element.getAttribute('data-bind');
	        if(!dataBind){
	            return false;
	        }
	
	        for(var i = 0, length = composeBindings.length; i < length; i++){
	            if(dataBind.indexOf(composeBindings[i]) > -1){
	                return true;
	            }
	        }
	
	        return false;
	    }
	
	    /**
	     * @class CompositionTransaction
	     * @static
	     */
	    var compositionTransaction = {
	        /**
	         * Registers a callback which will be invoked when the current composition transaction has completed. The transaction includes all parent and children compositions.
	         * @method complete
	         * @param {function} callback The callback to be invoked when composition is complete.
	         */
	        complete: function (callback) {
	            compositionCompleteCallbacks.push(callback);
	        }
	    };
	
	    /**
	     * @class CompositionModule
	     * @static
	     */
	    composition = {
	        /**
	         * An array of all the binding handler names (includeing :) that trigger a composition.
	         * @property {string} composeBindings
	         * @default ['compose:']
	         */
	        composeBindings:composeBindings,
	        /**
	         * Converts a transition name to its moduleId.
	         * @method convertTransitionToModuleId
	         * @param {string} name The name of the transtion.
	         * @return {string} The moduleId.
	         */
	        convertTransitionToModuleId: function (name) {
	            return 'transitions/' + name;
	        },
	        /**
	         * The name of the transition to use in all compositions.
	         * @property {string} defaultTransitionName
	         * @default null
	         */
	        defaultTransitionName: null,
	        /**
	         * Represents the currently executing composition transaction.
	         * @property {CompositionTransaction} current
	         */
	        current: compositionTransaction,
	        /**
	         * Registers a binding handler that will be invoked when the current composition transaction is complete.
	         * @method addBindingHandler
	         * @param {string} name The name of the binding handler.
	         * @param {object} [config] The binding handler instance. If none is provided, the name will be used to look up an existing handler which will then be converted to a composition handler.
	         * @param {function} [initOptionsFactory] If the registered binding needs to return options from its init call back to knockout, this function will server as a factory for those options. It will receive the same parameters that the init function does.
	         */
	        addBindingHandler:function(name, config, initOptionsFactory){
	            var key,
	                dataKey = 'composition-handler-' + name,
	                handler;
	
	            config = config || ko.bindingHandlers[name];
	            initOptionsFactory = initOptionsFactory || function(){ return undefined;  };
	
	            handler = ko.bindingHandlers[name] = {
	                init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    if(compositionCount > 0){
	                        var data = {
	                            trigger:ko.observable(null)
	                        };
	
	                        composition.current.complete(function(){
	                            if(config.init){
	                                config.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                            }
	
	                            if(config.update){
	                                ko.utils.domData.set(element, dataKey, config);
	                                data.trigger('trigger');
	                            }
	                        });
	
	                        ko.utils.domData.set(element, dataKey, data);
	                    }else{
	                        ko.utils.domData.set(element, dataKey, config);
	
	                        if(config.init){
	                            config.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                        }
	                    }
	
	                    return initOptionsFactory(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                },
	                update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    var data = ko.utils.domData.get(element, dataKey);
	
	                    if(data.update){
	                        return data.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	                    }
	
	                    if(data.trigger){
	                        data.trigger();
	                    }
	                }
	            };
	
	            for (key in config) {
	                if (key !== "init" && key !== "update") {
	                    handler[key] = config[key];
	                }
	            }
	        },
	        /**
	         * Gets an object keyed with all the elements that are replacable parts, found within the supplied elements. The key will be the part name and the value will be the element itself.
	         * @method getParts
	         * @param {DOMElement\DOMElement[]} elements The element(s) to search for parts.
	         * @return {object} An object keyed by part.
	         */
	        getParts: function(elements, parts) {
	            parts = parts || {};
	
	            if (!elements) {
	                return parts;
	            }
	
	            if (elements.length === undefined) {
	                elements = [elements];
	            }
	
	            for (var i = 0, length = elements.length; i < length; i++) {
	                var element = elements[i],
	                    id;
	
	                if (element.getAttribute) {
	                    id = element.getAttribute(partAttributeName);
	                    if (id) {
	                        parts[id] = element;
	                    }
	
	                    if (element.hasChildNodes() && !hasComposition(element)) {
	                        composition.getParts(element.childNodes, parts);
	                    }
	                }
	            }
	
	            return parts;
	        },
	        cloneNodes:cloneNodes,
	        finalize: function (context, element) {
	            if(context.transition === undefined) {
	                context.transition = this.defaultTransitionName;
	            }
	
	            if(!context.child && !context.activeView){
	                if (!context.cacheViews) {
	                    ko.virtualElements.emptyNode(context.parent);
	                }
	
	                context.triggerAttach(context, element);
	                endComposition(context, element);
	            } else if (shouldTransition(context)) {
	                var transitionModuleId = this.convertTransitionToModuleId(context.transition);
	
	                system.acquire(transitionModuleId).then(function (transition) {
	                    context.transition = transition;
	
	                    transition(context).then(function () {
	                        if (!context.cacheViews) {
	                            if(!context.child){
	                                ko.virtualElements.emptyNode(context.parent);
	                            }else{
	                                removePreviousView(context);
	                            }
	                        }else if(context.activeView){
	                            var instruction = binder.getBindingInstruction(context.activeView);
	                            if(instruction && instruction.cacheViews != undefined && !instruction.cacheViews){
	                                ko.removeNode(context.activeView);
	                            }else{
	                                hide(context.activeView);
	                            }
	                        }
	
	                        if (context.child) {
	                            show(context.child);
	                        }
	
	                        context.triggerAttach(context, element);
	                        endComposition(context, element);
	                    });
	                }).fail(function(err){
	                    onError(context, 'Failed to load transition (' + transitionModuleId + '). Details: ' + err.message, element);
	                });
	            } else {
	                if (context.child != context.activeView) {
	                    if (context.cacheViews && context.activeView) {
	                        var instruction = binder.getBindingInstruction(context.activeView);
	                        if(!instruction || (instruction.cacheViews != undefined && !instruction.cacheViews)){
	                            ko.removeNode(context.activeView);
	                        }else{
	                            hide(context.activeView);
	                        }
	                    }
	
	                    if (!context.child) {
	                        if (!context.cacheViews) {
	                            ko.virtualElements.emptyNode(context.parent);
	                        }
	                    } else {
	                        if (!context.cacheViews) {
	                            removePreviousView(context);
	                        }
	
	                        show(context.child);
	                    }
	                }
	
	                context.triggerAttach(context, element);
	                endComposition(context, element);
	            }
	        },
	        bindAndShow: function (child, element, context, skipActivation) {
	            context.child = child;
	            context.parent.__composition_context = context;
	
	            if (context.cacheViews) {
	                context.composingNewView = (ko.utils.arrayIndexOf(context.viewElements, child) == -1);
	            } else {
	                context.composingNewView = true;
	            }
	
	            tryActivate(context, function () {
	                if (context.parent.__composition_context == context) {
	                    try {
	                        delete context.parent.__composition_context;
	                    }
	                    catch(e) {
	                        context.parent.__composition_context = undefined;
	                    }
	
	                    if (context.binding) {
	                        context.binding(context.child, context.parent, context);
	                    }
	
	                    if (context.preserveContext && context.bindingContext) {
	                        if (context.composingNewView) {
	                            if(context.parts){
	                                replaceParts(context);
	                            }
	
	                            hide(child);
	                            ko.virtualElements.prepend(context.parent, child);
	
	                        binder.bindContext(context.bindingContext, child, context.model, context.as);
	                        }
	                    } else if (child) {
	                        var modelToBind = context.model || dummyModel;
	                        var currentModel = ko.dataFor(child);
	
	                        if (currentModel != modelToBind) {
	                            if (!context.composingNewView) {
	                                ko.removeNode(child);
	                                viewEngine.createView(child.getAttribute('data-view')).then(function(recreatedView) {
	                                    composition.bindAndShow(recreatedView, element, context, true);
	                                });
	                                return;
	                            }
	
	                            if(context.parts){
	                                replaceParts(context);
	                            }
	
	                            hide(child);
	                            ko.virtualElements.prepend(context.parent, child);
	
	                            binder.bind(modelToBind, child);
	                        }
	                    }
	
	                    composition.finalize(context, element);
	                } else {
	                    endComposition(context, element);
	                }
	            }, skipActivation, element);
	        },
	        /**
	         * Eecutes the default view location strategy.
	         * @method defaultStrategy
	         * @param {object} context The composition context containing the model and possibly existing viewElements.
	         * @return {promise} A promise for the view.
	         */
	        defaultStrategy: function (context) {
	            return viewLocator.locateViewForObject(context.model, context.area, context.viewElements);
	        },
	        getSettings: function (valueAccessor, element) {
	            var value = valueAccessor(),
	                settings = ko.utils.unwrapObservable(value) || {},
	                activatorPresent = activator.isActivator(value),
	                moduleId;
	
	            if (system.isString(settings)) {
	                if (viewEngine.isViewUrl(settings)) {
	                    settings = {
	                        view: settings
	                    };
	                } else {
	                    settings = {
	                        model: settings,
	                        activate: !activatorPresent
	                    };
	                }
	
	                return settings;
	            }
	
	            moduleId = system.getModuleId(settings);
	            if (moduleId) {
	                settings = {
	                    model: settings,
	                    activate: !activatorPresent
	                };
	
	                return settings;
	            }
	
	            if(!activatorPresent && settings.model) {
	                activatorPresent = activator.isActivator(settings.model);
	            }
	
	            for (var attrName in settings) {
	                if (ko.utils.arrayIndexOf(bindableSettings, attrName) != -1) {
	                    settings[attrName] = ko.utils.unwrapObservable(settings[attrName]);
	                } else {
	                    settings[attrName] = settings[attrName];
	                }
	            }
	
	            if (activatorPresent) {
	                settings.activate = false;
	            } else if (settings.activate === undefined) {
	                settings.activate = true;
	            }
	
	            return settings;
	        },
	        executeStrategy: function (context, element) {
	            context.strategy(context).then(function (child) {
	                composition.bindAndShow(child, element, context);
	            });
	        },
	        inject: function (context, element) {
	            if (!context.model) {
	                this.bindAndShow(null, element, context);
	                return;
	            }
	
	            if (context.view) {
	                viewLocator.locateView(context.view, context.area, context.viewElements).then(function (child) {
	                    composition.bindAndShow(child, element, context);
	                });
	                return;
	            }
	
	            if (!context.strategy) {
	                context.strategy = this.defaultStrategy;
	            }
	
	            if (system.isString(context.strategy)) {
	                system.acquire(context.strategy).then(function (strategy) {
	                    context.strategy = strategy;
	                    composition.executeStrategy(context, element);
	                }).fail(function (err) {
	                    onError(context, 'Failed to load view strategy (' + context.strategy + '). Details: ' + err.message, element);
	                });
	            } else {
	                this.executeStrategy(context, element);
	            }
	        },
	        /**
	         * Initiates a composition.
	         * @method compose
	         * @param {DOMElement} element The DOMElement or knockout virtual element that serves as the parent for the composition.
	         * @param {object} settings The composition settings.
	         * @param {object} [bindingContext] The current binding context.
	         */
	        compose: function (element, settings, bindingContext, fromBinding) {
	            compositionCount++;
	
	            if(!fromBinding){
	                settings = composition.getSettings(function() { return settings; }, element);
	            }
	
	            if (settings.compositionComplete) {
	                compositionCompleteCallbacks.push(function () {
	                    settings.compositionComplete(settings.child, settings.parent, settings);
	                });
	            }
	
	            compositionCompleteCallbacks.push(function () {
	                if(settings.composingNewView && settings.model && settings.model.compositionComplete){
	                    settings.model.compositionComplete(settings.child, settings.parent, settings);
	                }
	            });
	
	            var hostState = getHostState(element);
	
	            settings.activeView = hostState.activeView;
	            settings.parent = element;
	            settings.triggerAttach = triggerAttach;
	            settings.bindingContext = bindingContext;
	
	            if (settings.cacheViews && !settings.viewElements) {
	                settings.viewElements = hostState.childElements;
	            }
	
	            if (!settings.model) {
	                if (!settings.view) {
	                    this.bindAndShow(null, element, settings);
	                } else {
	                    settings.area = settings.area || 'partial';
	                    settings.preserveContext = true;
	
	                    viewLocator.locateView(settings.view, settings.area, settings.viewElements).then(function (child) {
	                        composition.bindAndShow(child, element, settings);
	                    });
	                }
	            } else if (system.isString(settings.model)) {
	                system.acquire(settings.model).then(function (module) {
	                    settings.model = system.resolveObject(module);
	                    composition.inject(settings, element);
	                }).fail(function (err) {
	                    onError(settings, 'Failed to load composed module (' + settings.model + '). Details: ' + err.message, element);
	                });
	            } else {
	                composition.inject(settings, element);
	            }
	        }
	    };
	
	    ko.bindingHandlers.compose = {
	        init: function() {
	            return { controlsDescendantBindings: true };
	        },
	        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	            var settings = composition.getSettings(valueAccessor, element);
	            if(settings.mode){
	                var data = ko.utils.domData.get(element, compositionDataKey);
	                if(!data){
	                    var childNodes = ko.virtualElements.childNodes(element);
	                    data = {};
	
	                    if(settings.mode === 'inline'){
	                        data.view = viewEngine.ensureSingleElement(childNodes);
	                    }else if(settings.mode === 'templated'){
	                        data.parts = cloneNodes(childNodes);
	                    }
	
	                    ko.virtualElements.emptyNode(element);
	                    ko.utils.domData.set(element, compositionDataKey, data);
	                }
	
	                if(settings.mode === 'inline'){
	                    settings.view = data.view.cloneNode(true);
	                }else if(settings.mode === 'templated'){
	                    settings.parts = data.parts;
	                }
	
	                settings.preserveContext = true;
	            }
	
	            composition.compose(element, settings, bindingContext, true);
	        }
	    };
	
	    ko.virtualElements.allowedBindings.compose = true;
	
	    return composition;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Connects the history module's url and history tracking support to Durandal's activation and composition engine allowing you to easily build navigation-style applications.
	 * @module router
	 * @requires system
	 * @requires app
	 * @requires activator
	 * @requires events
	 * @requires composition
	 * @requires history
	 * @requires knockout
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(9), __webpack_require__(8), __webpack_require__(12), __webpack_require__(5), __webpack_require__(16), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, app, activator, events, composition, history, ko, $) {
	    var optionalParam = /\((.*?)\)/g;
	    var namedParam = /(\(\?)?:\w+/g;
	    var splatParam = /\*\w+/g;
	    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	    var startDeferred, rootRouter;
	    var trailingSlash = /\/$/;
	    var routesAreCaseSensitive = false;
	    var lastUrl = '/', lastTryUrl = '/';
	
	    function routeStringToRegExp(routeString) {
	        routeString = routeString.replace(escapeRegExp, '\\$&')
	            .replace(optionalParam, '(?:$1)?')
	            .replace(namedParam, function(match, optional) {
	                return optional ? match : '([^\/]+)';
	            })
	            .replace(splatParam, '(.*?)');
	
	        return new RegExp('^' + routeString + '$', routesAreCaseSensitive ? undefined : 'i');
	    }
	
	    function stripParametersFromRoute(route) {
	        var colonIndex = route.indexOf(':');
	        var length = colonIndex > 0 ? colonIndex - 1 : route.length;
	        return route.substring(0, length);
	    }
	
	    function endsWith(str, suffix) {
	        return str.indexOf(suffix, str.length - suffix.length) !== -1;
	    }
	
	    function compareArrays(first, second) {
	        if (!first || !second){
	            return false;
	        }
	
	        if (first.length != second.length) {
	            return false;
	        }
	
	        for (var i = 0, len = first.length; i < len; i++) {
	            if (first[i] != second[i]) {
	                return false;
	            }
	        }
	
	        return true;
	    }
	
	    function reconstructUrl(instruction){
	        if(!instruction.queryString){
	            return instruction.fragment;
	        }
	
	        return instruction.fragment + '?' + instruction.queryString;
	    }
	
	    /**
	     * @class Router
	     * @uses Events
	     */
	
	    /**
	     * Triggered when the navigation logic has completed.
	     * @event router:navigation:complete
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered when the navigation has been cancelled.
	     * @event router:navigation:cancelled
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered when navigation begins.
	     * @event router:navigation:processing
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered right before a route is activated.
	     * @event router:route:activating
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered right before a route is configured.
	     * @event router:route:before-config
	     * @param {object} config The route config.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered just after a route is configured.
	     * @event router:route:after-config
	     * @param {object} config The route config.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered when the view for the activated instance is attached.
	     * @event router:navigation:attached
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered when the composition that the activated instance participates in is complete.
	     * @event router:navigation:composition-complete
	     * @param {object} instance The activated instance.
	     * @param {object} instruction The routing instruction.
	     * @param {Router} router The router.
	     */
	
	    /**
	     * Triggered when the router does not find a matching route.
	     * @event router:route:not-found
	     * @param {string} fragment The url fragment.
	     * @param {Router} router The router.
	     */
	
	    var createRouter = function() {
	        var queue = [],
	            isProcessing = ko.observable(false),
	            currentActivation,
	            currentInstruction,
	            activeItem = activator.create();
	
	        var router = {
	            /**
	             * The route handlers that are registered. Each handler consists of a `routePattern` and a `callback`.
	             * @property {object[]} handlers
	             */
	            handlers: [],
	            /**
	             * The route configs that are registered.
	             * @property {object[]} routes
	             */
	            routes: [],
	            /**
	             * The route configurations that have been designated as displayable in a nav ui (nav:true).
	             * @property {KnockoutObservableArray} navigationModel
	             */
	            navigationModel: ko.observableArray([]),
	            /**
	             * The active item/screen based on the current navigation state.
	             * @property {Activator} activeItem
	             */
	            activeItem: activeItem,
	            /**
	             * Indicates that the router (or a child router) is currently in the process of navigating.
	             * @property {KnockoutComputed} isNavigating
	             */
	            isNavigating: ko.computed(function() {
	                var current = activeItem();
	                var processing = isProcessing();
	                var currentRouterIsProcesing = current
	                    && current.router
	                    && current.router != router
	                    && current.router.isNavigating() ? true : false;
	                return  processing || currentRouterIsProcesing;
	            }),
	            /**
	             * An observable surfacing the active routing instruction that is currently being processed or has recently finished processing.
	             * The instruction object has `config`, `fragment`, `queryString`, `params` and `queryParams` properties.
	             * @property {KnockoutObservable} activeInstruction
	             */
	            activeInstruction:ko.observable(null),
	            __router__:true
	        };
	
	        events.includeIn(router);
	
	        activeItem.settings.areSameItem = function (currentItem, newItem, currentActivationData, newActivationData) {
	            if (currentItem == newItem) {
	                return compareArrays(currentActivationData, newActivationData);
	            }
	
	            return false;
	        };
	
	        activeItem.settings.findChildActivator = function(item) {
	            if (item && item.router && item.router.parent == router) {
	                return item.router.activeItem;
	            }
	
	            return null;
	        };
	
	        function hasChildRouter(instance, parentRouter) {
	            return instance.router && instance.router.parent == parentRouter;
	        }
	
	        function setCurrentInstructionRouteIsActive(flag) {
	            if (currentInstruction && currentInstruction.config.isActive) {
	                currentInstruction.config.isActive(flag);
	            }
	        }
	
	        function completeNavigation(instance, instruction, mode) {
	            system.log('Navigation Complete', instance, instruction);
	
	            var fromModuleId = system.getModuleId(currentActivation);
	            if (fromModuleId) {
	                router.trigger('router:navigation:from:' + fromModuleId);
	            }
	
	            currentActivation = instance;
	
	            setCurrentInstructionRouteIsActive(false);
	            currentInstruction = instruction;
	            setCurrentInstructionRouteIsActive(true);
	
	            var toModuleId = system.getModuleId(currentActivation);
	            if (toModuleId) {
	                router.trigger('router:navigation:to:' + toModuleId);
	            }
	
	            if (!hasChildRouter(instance, router)) {
	                router.updateDocumentTitle(instance, instruction);
	            }
	
	            switch (mode) {
	                case 'rootRouter':
	                    lastUrl = reconstructUrl(currentInstruction);
	                    break;
	                case 'rootRouterWithChild':
	                    lastTryUrl = reconstructUrl(currentInstruction);
	                    break;
	                case 'lastChildRouter':
	                    lastUrl = lastTryUrl;
	                    break;
	            }
	
	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;
	
	            router.trigger('router:navigation:complete', instance, instruction, router);
	        }
	
	        function cancelNavigation(instance, instruction) {
	            system.log('Navigation Cancelled');
	
	            router.activeInstruction(currentInstruction);
	
	            router.navigate(lastUrl, false);
	
	            isProcessing(false);
	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;
	            router.trigger('router:navigation:cancelled', instance, instruction, router);
	        }
	
	        function redirect(url) {
	            system.log('Navigation Redirecting');
	
	            isProcessing(false);
	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;
	            router.navigate(url, { trigger: true, replace: true });
	        }
	
	        function activateRoute(activator, instance, instruction) {
	            rootRouter.navigatingBack = !rootRouter.explicitNavigation && currentActivation != instruction.fragment;
	            router.trigger('router:route:activating', instance, instruction, router);
	
	            var options = {
	                canDeactivate: !router.parent
	            };
	
	            activator.activateItem(instance, instruction.params, options).then(function(succeeded) {
	                if (succeeded) {
	                    var previousActivation = currentActivation;
	                    var withChild = hasChildRouter(instance, router);
	                    var mode = '';
	
	                    if (router.parent) {
	                        if(!withChild) {
	                            mode = 'lastChildRouter';
	                        }
	                    } else {
	                        if (withChild) {
	                            mode = 'rootRouterWithChild';
	                        } else {
	                            mode = 'rootRouter';
	                        }
	                    }
	
	                    completeNavigation(instance, instruction, mode);
	
	                    if (withChild) {
	                        instance.router.trigger('router:route:before-child-routes', instance, instruction, router);
	
	                        var fullFragment = instruction.fragment;
	                        if (instruction.queryString) {
	                            fullFragment += "?" + instruction.queryString;
	                        }
	
	                        instance.router.loadUrl(fullFragment);
	                    }
	
	                    if (previousActivation == instance) {
	                        router.attached();
	                        router.compositionComplete();
	                    }
	                } else if(activator.settings.lifecycleData && activator.settings.lifecycleData.redirect){
	                    redirect(activator.settings.lifecycleData.redirect);
	                }else{
	                    cancelNavigation(instance, instruction);
	                }
	
	                if (startDeferred) {
	                    startDeferred.resolve();
	                    startDeferred = null;
	                }
	            }).fail(function(err){
	                system.error(err);
	            });
	        }
	
	        /**
	         * Inspects routes and modules before activation. Can be used to protect access by cancelling navigation or redirecting.
	         * @method guardRoute
	         * @param {object} instance The module instance that is about to be activated by the router.
	         * @param {object} instruction The route instruction. The instruction object has config, fragment, queryString, params and queryParams properties.
	         * @return {Promise|Boolean|String} If a boolean, determines whether or not the route should activate or be cancelled. If a string, causes a redirect to the specified route. Can also be a promise for either of these value types.
	         */
	        function handleGuardedRoute(activator, instance, instruction) {
	            var resultOrPromise = router.guardRoute(instance, instruction);
	            if (resultOrPromise || resultOrPromise === '') {
	                if (resultOrPromise.then) {
	                    resultOrPromise.then(function(result) {
	                        if (result) {
	                            if (system.isString(result)) {
	                                redirect(result);
	                            } else {
	                                activateRoute(activator, instance, instruction);
	                            }
	                        } else {
	                            cancelNavigation(instance, instruction);
	                        }
	                    });
	                } else {
	                    if (system.isString(resultOrPromise)) {
	                        redirect(resultOrPromise);
	                    } else {
	                        activateRoute(activator, instance, instruction);
	                    }
	                }
	            } else {
	                cancelNavigation(instance, instruction);
	            }
	        }
	
	        function ensureActivation(activator, instance, instruction) {
	            if (router.guardRoute) {
	                handleGuardedRoute(activator, instance, instruction);
	            } else {
	                activateRoute(activator, instance, instruction);
	            }
	        }
	
	        function canReuseCurrentActivation(instruction) {
	            return currentInstruction
	                && currentInstruction.config.moduleId == instruction.config.moduleId
	                && currentActivation
	                && ((currentActivation.canReuseForRoute && currentActivation.canReuseForRoute.apply(currentActivation, instruction.params))
	                || (!currentActivation.canReuseForRoute && currentActivation.router && currentActivation.router.loadUrl));
	        }
	
	        function dequeueInstruction() {
	            if (isProcessing()) {
	                return;
	            }
	
	            var instruction = queue.shift();
	            queue = [];
	
	            if (!instruction) {
	                return;
	            }
	
	            isProcessing(true);
	            router.activeInstruction(instruction);
	            router.trigger('router:navigation:processing', instruction, router);
	
	            if (canReuseCurrentActivation(instruction)) {
	                var tempActivator = activator.create();
	                tempActivator.forceActiveItem(currentActivation); //enforce lifecycle without re-compose
	                tempActivator.settings.areSameItem = activeItem.settings.areSameItem;
	                tempActivator.settings.findChildActivator = activeItem.settings.findChildActivator;
	                ensureActivation(tempActivator, currentActivation, instruction);
	            } else if(!instruction.config.moduleId) {
	                ensureActivation(activeItem, {
	                    viewUrl:instruction.config.viewUrl,
	                    canReuseForRoute:function() {
	                        return true;
	                    }
	                }, instruction);
	            } else {
	                system.acquire(instruction.config.moduleId).then(function(m) {
	                    var instance = system.resolveObject(m);
	
	                    if(instruction.config.viewUrl) {
	                        instance.viewUrl = instruction.config.viewUrl;
	                    }
	
	                    ensureActivation(activeItem, instance, instruction);
	                }).fail(function(err) {
	                    cancelNavigation(null, instruction);
	                    system.error('Failed to load routed module (' + instruction.config.moduleId + '). Details: ' + err.message, err);
	                });
	            }
	        }
	
	        function queueInstruction(instruction) {
	            queue.unshift(instruction);
	            dequeueInstruction();
	        }
	
	        // Given a route, and a URL fragment that it matches, return the array of
	        // extracted decoded parameters. Empty or unmatched parameters will be
	        // treated as `null` to normalize cross-browser behavior.
	        function createParams(routePattern, fragment, queryString) {
	            var params = routePattern.exec(fragment).slice(1);
	
	            for (var i = 0; i < params.length; i++) {
	                var current = params[i];
	                params[i] = current ? decodeURIComponent(current) : null;
	            }
	
	            var queryParams = router.parseQueryString(queryString);
	            if (queryParams) {
	                params.push(queryParams);
	            }
	
	            return {
	                params:params,
	                queryParams:queryParams
	            };
	        }
	
	        function configureRoute(config){
	            router.trigger('router:route:before-config', config, router);
	
	            if (!system.isRegExp(config.route)) {
	                config.title = config.title || router.convertRouteToTitle(config.route);
	
	                if (!config.viewUrl) {
	                    config.moduleId = config.moduleId || router.convertRouteToModuleId(config.route);
	                }
	
	                config.hash = config.hash || router.convertRouteToHash(config.route);
	
	                if (config.hasChildRoutes) {
	                    config.route = config.route + '*childRoutes';
	                }
	
	                config.routePattern = routeStringToRegExp(config.route);
	            }else{
	                config.routePattern = config.route;
	            }
	
	            config.isActive = config.isActive || ko.observable(false);
	            router.trigger('router:route:after-config', config, router);
	            router.routes.push(config);
	
	            router.route(config.routePattern, function(fragment, queryString) {
	                var paramInfo = createParams(config.routePattern, fragment, queryString);
	                queueInstruction({
	                    fragment: fragment,
	                    queryString:queryString,
	                    config: config,
	                    params: paramInfo.params,
	                    queryParams:paramInfo.queryParams
	                });
	            });
	        };
	
	        function mapRoute(config) {
	            if(system.isArray(config.route)){
	                var isActive = config.isActive || ko.observable(false);
	
	                for(var i = 0, length = config.route.length; i < length; i++){
	                    var current = system.extend({}, config);
	
	                    current.route = config.route[i];
	                    current.isActive = isActive;
	
	                    if(i > 0){
	                        delete current.nav;
	                    }
	
	                    configureRoute(current);
	                }
	            }else{
	                configureRoute(config);
	            }
	
	            return router;
	        }
	
	        /**
	         * Parses a query string into an object.
	         * @method parseQueryString
	         * @param {string} queryString The query string to parse.
	         * @return {object} An object keyed according to the query string parameters.
	         */
	        router.parseQueryString = function (queryString) {
	            var queryObject, pairs;
	
	            if (!queryString) {
	                return null;
	            }
	
	            pairs = queryString.split('&');
	
	            if (pairs.length == 0) {
	                return null;
	            }
	
	            queryObject = {};
	
	            for (var i = 0; i < pairs.length; i++) {
	                var pair = pairs[i];
	                if (pair === '') {
	                    continue;
	                }
	
	                var sp = pair.indexOf("="),
	                    key = sp === -1 ? pair : pair.substr(0, sp),
	                    value = sp === -1 ? null : decodeURIComponent(pair.substr(sp + 1).replace(/\+/g, ' '));
	
	                var existing = queryObject[key];
	
	                if (existing) {
	                    if (system.isArray(existing)) {
	                        existing.push(value);
	                    } else {
	                        queryObject[key] = [existing, value];
	                    }
	                }
	                else {
	                    queryObject[key] = value;
	                }
	            }
	
	            return queryObject;
	        };
	
	        /**
	         * Add a route to be tested when the url fragment changes.
	         * @method route
	         * @param {RegEx} routePattern The route pattern to test against.
	         * @param {function} callback The callback to execute when the route pattern is matched.
	         */
	        router.route = function(routePattern, callback) {
	            router.handlers.push({ routePattern: routePattern, callback: callback });
	        };
	
	        /**
	         * Attempt to load the specified URL fragment. If a route succeeds with a match, returns `true`. If no defined routes matches the fragment, returns `false`.
	         * @method loadUrl
	         * @param {string} fragment The URL fragment to find a match for.
	         * @return {boolean} True if a match was found, false otherwise.
	         */
	        router.loadUrl = function(fragment) {
	            var handlers = router.handlers,
	                queryString = null,
	                coreFragment = fragment,
	                queryIndex = fragment.indexOf('?');
	
	            if (queryIndex != -1) {
	                coreFragment = fragment.substring(0, queryIndex);
	                queryString = fragment.substr(queryIndex + 1);
	            }
	
	            if(router.relativeToParentRouter){
	                var instruction = this.parent.activeInstruction();
					coreFragment = queryIndex == -1 ? instruction.params.join('/') : instruction.params.slice(0, -1).join('/');
	
	                if(coreFragment && coreFragment.charAt(0) == '/'){
	                    coreFragment = coreFragment.substr(1);
	                }
	
	                if(!coreFragment){
	                    coreFragment = '';
	                }
	
	                coreFragment = coreFragment.replace('//', '/').replace('//', '/');
	            }
	
	            coreFragment = coreFragment.replace(trailingSlash, '');
	
	            for (var i = 0; i < handlers.length; i++) {
	                var current = handlers[i];
	                if (current.routePattern.test(coreFragment)) {
	                    current.callback(coreFragment, queryString);
	                    return true;
	                }
	            }
	
	            system.log('Route Not Found', fragment, currentInstruction);
	            router.trigger('router:route:not-found', fragment, router);
	
	            if (router.parent) {
	                lastUrl = lastTryUrl;
	            }
	
	            history.navigate(lastUrl, { trigger:false, replace:true });
	
	            rootRouter.explicitNavigation = false;
	            rootRouter.navigatingBack = false;
	
	            return false;
	        };
	
	        var titleSubscription;
	        function setTitle(value) {
	            var appTitle = ko.unwrap(app.title);
	
	            if (appTitle) {
	                document.title = value + " | " + appTitle;
	            } else {
	                document.title = value;
	            }
	        }
	
	        // Allow observable to be used for app.title
	        if(ko.isObservable(app.title)) {
	            app.title.subscribe(function () {
	                var instruction = router.activeInstruction();
	                var title = instruction != null ? ko.unwrap(instruction.config.title) : '';
	                setTitle(title);
	            });
	        }
	
	        /**
	         * Updates the document title based on the activated module instance, the routing instruction and the app.title.
	         * @method updateDocumentTitle
	         * @param {object} instance The activated module.
	         * @param {object} instruction The routing instruction associated with the action. It has a `config` property that references the original route mapping config.
	         */
	        router.updateDocumentTitle = function (instance, instruction) {
	            var appTitle = ko.unwrap(app.title),
	                title = instruction.config.title;
	
	            if (titleSubscription) {
	                titleSubscription.dispose();
	            }
	
	            if (title) {
	                if (ko.isObservable(title)) {
	                    titleSubscription = title.subscribe(setTitle);
	                    setTitle(title());
	                } else {
	                    setTitle(title);
	                }
	            } else if (appTitle) {
	                document.title = appTitle;
	            }
	        };
	
	        /**
	         * Save a fragment into the hash history, or replace the URL state if the
	         * 'replace' option is passed. You are responsible for properly URL-encoding
	         * the fragment in advance.
	         * The options object can contain `trigger: false` if you wish to not have the
	         * route callback be fired, or `replace: true`, if
	         * you wish to modify the current URL without adding an entry to the history.
	         * @method navigate
	         * @param {string} fragment The url fragment to navigate to.
	         * @param {object|boolean} options An options object with optional trigger and replace flags. You can also pass a boolean directly to set the trigger option. Trigger is `true` by default.
	         * @return {boolean} Returns true/false from loading the url.
	         */
	        router.navigate = function(fragment, options) {
	            if(fragment && fragment.indexOf('://') != -1) {
	                window.location.href = fragment;
	                return true;
	            }
	
	            if(options === undefined || (system.isBoolean(options) && options) || (system.isObject(options) && options.trigger)) {
	                rootRouter.explicitNavigation = true;
	            }
	
	            if ((system.isBoolean(options) && !options) || (options && options.trigger != undefined && !options.trigger)) {
	                lastUrl = fragment;
	            }
	
	            return history.navigate(fragment, options);
	        };
	
	        /**
	         * Navigates back in the browser history.
	         * @method navigateBack
	         */
	        router.navigateBack = function() {
	            history.navigateBack();
	        };
	
	        router.attached = function() {
	            router.trigger('router:navigation:attached', currentActivation, currentInstruction, router);
	        };
	
	        router.compositionComplete = function(){
	            isProcessing(false);
	            router.trigger('router:navigation:composition-complete', currentActivation, currentInstruction, router);
	            dequeueInstruction();
	        };
	
	        /**
	         * Converts a route to a hash suitable for binding to a link's href.
	         * @method convertRouteToHash
	         * @param {string} route
	         * @return {string} The hash.
	         */
	        router.convertRouteToHash = function(route) {
	            route = route.replace(/\*.*$/, '');
	
	            if(router.relativeToParentRouter){
	                var instruction = router.parent.activeInstruction(),
	                    hash = route ? instruction.config.hash + '/' + route : instruction.config.hash;
	
	                if(history._hasPushState){
	                    hash = '/' + hash;
	                }
	
	                hash = hash.replace('//', '/').replace('//', '/');
	                return hash;
	            }
	
	            if(history._hasPushState){
	                return route;
	            }
	
	            return "#" + route;
	        };
	
	        /**
	         * Converts a route to a module id. This is only called if no module id is supplied as part of the route mapping.
	         * @method convertRouteToModuleId
	         * @param {string} route
	         * @return {string} The module id.
	         */
	        router.convertRouteToModuleId = function(route) {
	            return stripParametersFromRoute(route);
	        };
	
	        /**
	         * Converts a route to a displayable title. This is only called if no title is specified as part of the route mapping.
	         * @method convertRouteToTitle
	         * @param {string} route
	         * @return {string} The title.
	         */
	        router.convertRouteToTitle = function(route) {
	            var value = stripParametersFromRoute(route);
	            return value.substring(0, 1).toUpperCase() + value.substring(1);
	        };
	
	        /**
	         * Maps route patterns to modules.
	         * @method map
	         * @param {string|object|object[]} route A route, config or array of configs.
	         * @param {object} [config] The config for the specified route.
	         * @chainable
	         * @example
	         router.map([
	         { route: '', title:'Home', moduleId: 'homeScreen', nav: true },
	         { route: 'customer/:id', moduleId: 'customerDetails'}
	         ]);
	         */
	        router.map = function(route, config) {
	            if (system.isArray(route)) {
	                for (var i = 0; i < route.length; i++) {
	                    router.map(route[i]);
	                }
	
	                return router;
	            }
	
	            if (system.isString(route) || system.isRegExp(route)) {
	                if (!config) {
	                    config = {};
	                } else if (system.isString(config)) {
	                    config = { moduleId: config };
	                }
	
	                config.route = route;
	            } else {
	                config = route;
	            }
	
	            return mapRoute(config);
	        };
	
	        /**
	         * Builds an observable array designed to bind a navigation UI to. The model will exist in the `navigationModel` property.
	         * @method buildNavigationModel
	         * @param {number} defaultOrder The default order to use for navigation visible routes that don't specify an order. The default is 100 and each successive route will be one more than that.
	         * @chainable
	         */
	        router.buildNavigationModel = function(defaultOrder) {
	            var nav = [], routes = router.routes;
	            var fallbackOrder = defaultOrder || 100;
	
	            for (var i = 0; i < routes.length; i++) {
	                var current = routes[i];
	
	                if (current.nav) {
	                    if (!system.isNumber(current.nav)) {
	                        current.nav = ++fallbackOrder;
	                    }
	
	                    nav.push(current);
	                }
	            }
	
	            nav.sort(function(a, b) { return a.nav - b.nav; });
	            router.navigationModel(nav);
	
	            return router;
	        };
	
	        /**
	         * Configures how the router will handle unknown routes.
	         * @method mapUnknownRoutes
	         * @param {string|function} [config] If not supplied, then the router will map routes to modules with the same name.
	         * If a string is supplied, it represents the module id to route all unknown routes to.
	         * Finally, if config is a function, it will be called back with the route instruction containing the route info. The function can then modify the instruction by adding a moduleId and the router will take over from there.
	         * @param {string} [replaceRoute] If config is a module id, then you can optionally provide a route to replace the url with.
	         * @chainable
	         */
	        router.mapUnknownRoutes = function(config, replaceRoute) {
	            var catchAllRoute = "*catchall";
	            var catchAllPattern = routeStringToRegExp(catchAllRoute);
	
	            router.route(catchAllPattern, function (fragment, queryString) {
	                var paramInfo = createParams(catchAllPattern, fragment, queryString);
	                var instruction = {
	                    fragment: fragment,
	                    queryString: queryString,
	                    config: {
	                        route: catchAllRoute,
	                        routePattern: catchAllPattern
	                    },
	                    params: paramInfo.params,
	                    queryParams: paramInfo.queryParams
	                };
	
	                if (!config) {
	                    instruction.config.moduleId = fragment;
	                } else if (system.isString(config)) {
	                    instruction.config.moduleId = config;
	                    if(replaceRoute){
	                        history.navigate(replaceRoute, { trigger:false, replace:true });
	                    }
	                } else if (system.isFunction(config)) {
	                    var result = config(instruction);
	                    if (result && result.then) {
	                        result.then(function() {
	                            router.trigger('router:route:before-config', instruction.config, router);
	                            router.trigger('router:route:after-config', instruction.config, router);
	                            queueInstruction(instruction);
	                        });
	                        return;
	                    }
	                } else {
	                    instruction.config = config;
	                    instruction.config.route = catchAllRoute;
	                    instruction.config.routePattern = catchAllPattern;
	                }
	
	                router.trigger('router:route:before-config', instruction.config, router);
	                router.trigger('router:route:after-config', instruction.config, router);
	                queueInstruction(instruction);
	            });
	
	            return router;
	        };
	
	        /**
	         * Resets the router by removing handlers, routes, event handlers and previously configured options.
	         * @method reset
	         * @chainable
	         */
	        router.reset = function() {
	            currentInstruction = currentActivation = undefined;
	            router.handlers = [];
	            router.routes = [];
	            router.off();
	            delete router.options;
	            return router;
	        };
	
	        /**
	         * Makes all configured routes and/or module ids relative to a certain base url.
	         * @method makeRelative
	         * @param {string|object} settings If string, the value is used as the base for routes and module ids. If an object, you can specify `route` and `moduleId` separately. In place of specifying route, you can set `fromParent:true` to make routes automatically relative to the parent router's active route.
	         * @chainable
	         */
	        router.makeRelative = function(settings){
	            if(system.isString(settings)){
	                settings = {
	                    moduleId:settings,
	                    route:settings
	                };
	            }
	
	            if(settings.moduleId && !endsWith(settings.moduleId, '/')){
	                settings.moduleId += '/';
	            }
	
	            if(settings.route && !endsWith(settings.route, '/')){
	                settings.route += '/';
	            }
	
	            if(settings.fromParent){
	                router.relativeToParentRouter = true;
	            }
	
	            router.on('router:route:before-config').then(function(config){
	                if(settings.moduleId){
	                    config.moduleId = settings.moduleId + config.moduleId;
	                }
	
	                if(settings.route){
	                    if(config.route === ''){
	                        config.route = settings.route.substring(0, settings.route.length - 1);
	                    }else{
	                        config.route = settings.route + config.route;
	                    }
	                }
	            });
	
	            if (settings.dynamicHash) {
	                router.on('router:route:after-config').then(function (config) {
	                    config.routePattern = routeStringToRegExp(config.route ? settings.dynamicHash + '/' + config.route : settings.dynamicHash);
	                    config.dynamicHash = config.dynamicHash || ko.observable(config.hash);
	                });
	
	                router.on('router:route:before-child-routes').then(function(instance, instruction, parentRouter) {
	                    var childRouter = instance.router;
	
	                    for(var i = 0; i < childRouter.routes.length; i++) {
	                        var route = childRouter.routes[i];
	                        var params = instruction.params.slice(0);
	
	                        route.hash = childRouter.convertRouteToHash(route.route)
	                            .replace(namedParam, function(match) {
	                                return params.length > 0 ? params.shift() : match;
	                            });
	
	                        route.dynamicHash(route.hash);
	                    }
	                });
	            }
	
	            return router;
	        };
	
	        /**
	         * Creates a child router.
	         * @method createChildRouter
	         * @return {Router} The child router.
	         */
	        router.createChildRouter = function() {
	            var childRouter = createRouter();
	            childRouter.parent = router;
	            return childRouter;
	        };
	
	        return router;
	    };
	
	    /**
	     * @class RouterModule
	     * @extends Router
	     * @static
	     */
	    rootRouter = createRouter();
	    rootRouter.explicitNavigation = false;
	    rootRouter.navigatingBack = false;
	
	    /**
	     * Makes the RegExp generated for routes case sensitive, rather than the default of case insensitive.
	     * @method makeRoutesCaseSensitive
	     */
	    rootRouter.makeRoutesCaseSensitive = function(){
	        routesAreCaseSensitive = true;
	    };
	
	    /**
	     * Verify that the target is the current window
	     * @method targetIsThisWindow
	     * @return {boolean} True if the event's target is the current window, false otherwise.
	     */
	    rootRouter.targetIsThisWindow = function(event) {
	        var targetWindow = $(event.target).attr('target');
	
	        if (!targetWindow ||
	            targetWindow === window.name ||
	            targetWindow === '_self' ||
	            (targetWindow === 'top' && window === window.top)) { return true; }
	
	        return false;
	    };
	
	    /**
	     * Activates the router and the underlying history tracking mechanism.
	     * @method activate
	     * @return {Promise} A promise that resolves when the router is ready.
	     */
	    rootRouter.activate = function(options) {
	        return system.defer(function(dfd) {
	            startDeferred = dfd;
	            rootRouter.options = system.extend({ routeHandler: rootRouter.loadUrl }, rootRouter.options, options);
	
	            history.activate(rootRouter.options);
	
	            if(history._hasPushState){
	                var routes = rootRouter.routes,
	                    i = routes.length;
	
	                while(i--){
	                    var current = routes[i];
	                    current.hash = current.hash.replace('#', '/');
	                }
	            }
	
	            var rootStripper = rootRouter.options.root && new RegExp("^" + rootRouter.options.root + "/");
	
	            $(document).delegate("a", 'click', function(evt){
	                
	                // ignore default prevented since these are not supposed to behave like links anyway
	                if(evt.isDefaultPrevented()){
	                    return;
	                }
	
	                if(history._hasPushState){
	                    if(!evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && rootRouter.targetIsThisWindow(evt)){
	                        var href = $(this).attr("href");
	
	                        // Ensure the protocol is not part of URL, meaning its relative.
	                        // Stop the event bubbling to ensure the link will not cause a page refresh.
	                        if (href != null && !(href.charAt(0) === "#" || /^[a-z]+:/i.test(href))) {
	                            rootRouter.explicitNavigation = true;
	                            evt.preventDefault();
	
	                            if (rootStripper) {
	                                href = href.replace(rootStripper, "");
	                            }
	
	                            history.navigate(href);
	                        }
	                    }
	                }else{
	                    rootRouter.explicitNavigation = true;
	                }
	            });
	
	            if(history.options.silent && startDeferred){
	                startDeferred.resolve();
	                startDeferred = null;
	            }
	        }).promise();
	    };
	
	    /**
	     * Deactivate current items and turn history listening off.
	     * @method deactivate
	     */
	    rootRouter.deactivate = function() {
	        rootRouter.activeItem(null);
	        history.deactivate();
	    };
	
	    /**
	     * Installs the router's custom ko binding handler.
	     * @method install
	     */
	    rootRouter.install = function(){
	        ko.bindingHandlers.router = {
	            init: function() {
	                return { controlsDescendantBindings: true };
	            },
	            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                var settings = ko.utils.unwrapObservable(valueAccessor()) || {};
	
	                if (settings.__router__) {
	                    settings = {
	                        model:settings.activeItem(),
	                        attached:settings.attached,
	                        compositionComplete:settings.compositionComplete,
	                        activate: false
	                    };
	                } else {
	                    var theRouter = ko.utils.unwrapObservable(settings.router || viewModel.router) || rootRouter;
	                    settings.model = theRouter.activeItem();
	                    settings.attached = theRouter.attached;
	                    settings.compositionComplete = theRouter.compositionComplete;
	                    settings.activate = false;
	                }
	
	                composition.compose(element, settings, bindingContext);
	            }
	        };
	
	        ko.virtualElements.allowedBindings.router = true;
	    };
	
	    return rootRouter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The viewEngine module provides information to the viewLocator module which is used to locate the view's source file. The viewEngine also transforms a view id into a view instance.
	 * @module viewEngine
	 * @requires system
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, $) {
	    var parseMarkup;
	
	    if ($.parseHTML) {
	        parseMarkup = function (html) {
	            return $.parseHTML(html);
	        };
	    } else {
	        parseMarkup = function (html) {
	            return $(html).get();
	        };
	    }
	
	    /**
	     * @class ViewEngineModule
	     * @static
	     */
	    return {
	        cache:{},
	        /**
	         * The file extension that view source files are expected to have.
	         * @property {string} viewExtension
	         * @default .html
	         */
	        viewExtension: '.html',
	        /**
	         * The name of the RequireJS loader plugin used by the viewLocator to obtain the view source. (Use requirejs to map the plugin's full path).
	         * @property {string} viewPlugin
	         * @default text
	         */
	        viewPlugin: 'text',
	        /**
	         * Parameters passed to the RequireJS loader plugin used by the viewLocator to obtain the view source.
	         * @property {string} viewPluginParameters
	         * @default The empty string by default.
	         */
	        viewPluginParameters: '',
	        /**
	         * Determines if the url is a url for a view, according to the view engine.
	         * @method isViewUrl
	         * @param {string} url The potential view url.
	         * @return {boolean} True if the url is a view url, false otherwise.
	         */
	        isViewUrl: function (url) {
	            return url.indexOf(this.viewExtension, url.length - this.viewExtension.length) !== -1;
	        },
	        /**
	         * Converts a view url into a view id.
	         * @method convertViewUrlToViewId
	         * @param {string} url The url to convert.
	         * @return {string} The view id.
	         */
	        convertViewUrlToViewId: function (url) {
	            return url.substring(0, url.length - this.viewExtension.length);
	        },
	        /**
	         * Converts a view id into a full RequireJS path.
	         * @method convertViewIdToRequirePath
	         * @param {string} viewId The view id to convert.
	         * @return {string} The require path.
	         */
	        convertViewIdToRequirePath: function (viewId) {
	            var plugin = this.viewPlugin ? this.viewPlugin + '!' : '';
	            return plugin + viewId + this.viewExtension + this.viewPluginParameters;
	        },
	        /**
	         * Parses the view engine recognized markup and returns DOM elements.
	         * @method parseMarkup
	         * @param {string} markup The markup to parse.
	         * @return {DOMElement[]} The elements.
	         */
	        parseMarkup: parseMarkup,
	        /**
	         * Calls `parseMarkup` and then pipes the results through `ensureSingleElement`.
	         * @method processMarkup
	         * @param {string} markup The markup to process.
	         * @return {DOMElement} The view.
	         */
	        processMarkup: function (markup) {
	            var allElements = this.parseMarkup(markup);
	            return this.ensureSingleElement(allElements);
	        },
	        /**
	         * Converts an array of elements into a single element. White space and comments are removed. If a single element does not remain, then the elements are wrapped.
	         * @method ensureSingleElement
	         * @param {DOMElement[]} allElements The elements.
	         * @return {DOMElement} A single element.
	         */
	        ensureSingleElement:function(allElements){
	            if (!allElements) { 
	                $('<div></div>')[0];
	            } else if (allElements.length == 1) {
	                return allElements[0];
	            }
	
	            var withoutCommentsOrEmptyText = [];
	
	            for (var i = 0; i < allElements.length; i++) {
	                var current = allElements[i];
	                if (current.nodeType != 8) {
	                    if (current.nodeType == 3) {
	                        var result = /\S/.test(current.nodeValue);
	                        if (!result) {
	                            continue;
	                        }
	                    }
	
	                    withoutCommentsOrEmptyText.push(current);
	                }
	            }
	
	            if (withoutCommentsOrEmptyText.length > 1) {
	                return $(withoutCommentsOrEmptyText).wrapAll('<div class="durandal-wrapper"></div>').parent().get(0);
	            }
	
	            return withoutCommentsOrEmptyText[0];
	        },
	        /**
	         * Gets the view associated with the id from the cache of parsed views.
	         * @method tryGetViewFromCache
	         * @param {string} id The view id to lookup in the cache.
	         * @return {DOMElement|null} The cached view or null if it's not in the cache.
	         */
	        tryGetViewFromCache:function(id) {
	            return this.cache[id];
	        },
	        /**
	         * Puts the view associated with the id into the cache of parsed views.
	         * @method putViewInCache
	         * @param {string} id The view id whose view should be cached.
	         * @param {DOMElement} view The view to cache.
	         */
	        putViewInCache: function (id, view) {
	            this.cache[id] = view;
	        },
	        /**
	         * Creates the view associated with the view id.
	         * @method createView
	         * @param {string} viewId The view id whose view should be created.
	         * @return {Promise} A promise of the view.
	         */
	        createView: function(viewId) {
	            var that = this;
	            var requirePath = this.convertViewIdToRequirePath(viewId);
	            var existing = this.tryGetViewFromCache(requirePath);
	
	            if (existing) {
	                return system.defer(function(dfd) {
	                    dfd.resolve(existing.cloneNode(true));
	                }).promise();
	            }
	
	            return system.defer(function(dfd) {
	                system.acquire(requirePath).then(function(markup) {
	                    var element = that.processMarkup(markup);
	                    element.setAttribute('data-view', viewId);
	                    that.putViewInCache(requirePath, element);
	                    dfd.resolve(element.cloneNode(true));
	                }).fail(function(err) {
	                    that.createFallbackView(viewId, requirePath, err).then(function(element) {
	                        element.setAttribute('data-view', viewId);
	                        that.cache[requirePath] = element;
	                        dfd.resolve(element.cloneNode(true));
	                    });
	                });
	            }).promise();
	        },
	        /**
	         * Called when a view cannot be found to provide the opportunity to locate or generate a fallback view. Mainly used to ease development.
	         * @method createFallbackView
	         * @param {string} viewId The view id whose view should be created.
	         * @param {string} requirePath The require path that was attempted.
	         * @param {Error} requirePath The error that was returned from the attempt to locate the default view.
	         * @return {Promise} A promise for the fallback view.
	         */
	        createFallbackView: function (viewId, requirePath, err) {
	            var that = this,
	                message = 'View Not Found. Searched for "' + viewId + '" via path "' + requirePath + '".';
	
	            return system.defer(function(dfd) {
	                dfd.resolve(that.processMarkup('<div class="durandal-view-404">' + message + '</div>'));
	            }).promise();
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The activator module encapsulates all logic related to screen/component activation.
	 * An activator is essentially an asynchronous state machine that understands a particular state transition protocol.
	 * The protocol ensures that the following series of events always occur: `canDeactivate` (previous state), `canActivate` (new state), `deactivate` (previous state), `activate` (new state).
	 * Each of the _can_ callbacks may return a boolean, affirmative value or promise for one of those. If either of the _can_ functions yields a false result, then activation halts.
	 * @module activator
	 * @requires system
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, ko) {
	    var activator;
	    var defaultOptions = {
	        canDeactivate:true
	    };
	
	    function ensureSettings(settings) {
	        if (settings == undefined) {
	            settings = {};
	        }
	
	        if (!system.isBoolean(settings.closeOnDeactivate)) {
	            settings.closeOnDeactivate = activator.defaults.closeOnDeactivate;
	        }
	
	        if (!settings.beforeActivate) {
	            settings.beforeActivate = activator.defaults.beforeActivate;
	        }
	
	        if (!settings.afterDeactivate) {
	            settings.afterDeactivate = activator.defaults.afterDeactivate;
	        }
	
	        if(!settings.affirmations){
	            settings.affirmations = activator.defaults.affirmations;
	        }
	
	        if (!settings.interpretResponse) {
	            settings.interpretResponse = activator.defaults.interpretResponse;
	        }
	
	        if (!settings.areSameItem) {
	            settings.areSameItem = activator.defaults.areSameItem;
	        }
	
	        if (!settings.findChildActivator) {
	            settings.findChildActivator = activator.defaults.findChildActivator;
	        }
	
	        return settings;
	    }
	
	    function invoke(target, method, data) {
	        if (system.isArray(data)) {
	            return target[method].apply(target, data);
	        }
	
	        return target[method](data);
	    }
	
	    function deactivate(item, close, settings, dfd, setter) {
	        if (item && item.deactivate) {
	            system.log('Deactivating', item);
	
	            var result;
	            try {
	                result = item.deactivate(close);
	            } catch(error) {
	                system.log('ERROR: ' + error.message, error);
	                dfd.resolve(false);
	                return;
	            }
	
	            if (result && result.then) {
	                result.then(function() {
	                    settings.afterDeactivate(item, close, setter);
	                    dfd.resolve(true);
	                }, function(reason) {
	                    if (reason) {
	                        system.log(reason);
	                    }
	
	                    dfd.resolve(false);
	                });
	            } else {
	                settings.afterDeactivate(item, close, setter);
	                dfd.resolve(true);
	            }
	        } else {
	            if (item) {
	                settings.afterDeactivate(item, close, setter);
	            }
	
	            dfd.resolve(true);
	        }
	    }
	
	    function activate(newItem, activeItem, callback, activationData) {
	        var result;
	
	        if(newItem && newItem.activate) {
	            system.log('Activating', newItem);
	
	            try {
	                result = invoke(newItem, 'activate', activationData);
	            } catch (error) {
	                system.log('ERROR: ' + error.message, error);
	                callback(false);
	                return;
	            }
	        }
	
	        if(result && result.then) {
	            result.then(function() {
	                activeItem(newItem);
	                callback(true);
	            }, function (reason) {
	                if (reason) {
	                    system.log('ERROR: ' + reason.message, reason);
	                }
	
	                callback(false);
	            });
	        } else {
	            activeItem(newItem);
	            callback(true);
	        }
	    }
	
	    function canDeactivateItem(item, close, settings, options) {
	        options = system.extend({}, defaultOptions, options);
	        settings.lifecycleData = null;
	
	        return system.defer(function (dfd) {
	            function continueCanDeactivate() {
	                if (item && item.canDeactivate && options.canDeactivate) {
	                    var resultOrPromise;
	                    try {
	                        resultOrPromise = item.canDeactivate(close);
	                    } catch (error) {
	                        system.log('ERROR: ' + error.message, error);
	                        dfd.resolve(false);
	                        return;
	                    }
	
	                    if (resultOrPromise.then) {
	                        resultOrPromise.then(function (result) {
	                            settings.lifecycleData = result;
	                            dfd.resolve(settings.interpretResponse(result));
	                        }, function (reason) {
	                            if (reason) {
	                                system.log('ERROR: ' + reason.message, reason);
	                            }
	
	                            dfd.resolve(false);
	                        });
	                    } else {
	                        settings.lifecycleData = resultOrPromise;
	                        dfd.resolve(settings.interpretResponse(resultOrPromise));
	                    }
	                } else {
	                    dfd.resolve(true);
	                }
	            }
	
	            var childActivator = settings.findChildActivator(item);
	            if (childActivator) {
	                childActivator.canDeactivate().then(function(result) {
	                    if (result) {
	                        continueCanDeactivate();
	                    } else {
	                        dfd.resolve(false);
	                    }
	                });
	            } else {
	                continueCanDeactivate();
	            }
	        }).promise();
	    };
	
	    function canActivateItem(newItem, activeItem, settings, activeData, newActivationData) {
	        settings.lifecycleData = null;
	
	        return system.defer(function (dfd) {
	            if (settings.areSameItem(activeItem(), newItem, activeData, newActivationData)) {
	                dfd.resolve(true);
	                return;
	            }
	
	            if (newItem && newItem.canActivate) {
	                var resultOrPromise;
	                try {
	                    resultOrPromise = invoke(newItem, 'canActivate', newActivationData);
	                } catch (error) {
	                    system.log('ERROR: ' + error.message, error);
	                    dfd.resolve(false);
	                    return;
	                }
	
	                if (resultOrPromise.then) {
	                    resultOrPromise.then(function(result) {
	                        settings.lifecycleData = result;
	                        dfd.resolve(settings.interpretResponse(result));
	                    }, function(reason) {
	                        if (reason) {
	                            system.log('ERROR: ' + reason.message, reason);
	                        }
	
	                        dfd.resolve(false);
	                    });
	                } else {
	                    settings.lifecycleData = resultOrPromise;
	                    dfd.resolve(settings.interpretResponse(resultOrPromise));
	                }
	            } else {
	                dfd.resolve(true);
	            }
	        }).promise();
	    };
	
	    /**
	     * An activator is a read/write computed observable that enforces the activation lifecycle whenever changing values.
	     * @class Activator
	     */
	    function createActivator(initialActiveItem, settings) {
	        var activeItem = ko.observable(null);
	        var activeData;
	
	        settings = ensureSettings(settings);
	
	        var computed = ko.computed({
	            read: function () {
	                return activeItem();
	            },
	            write: function (newValue) {
	                computed.viaSetter = true;
	                computed.activateItem(newValue);
	            }
	        });
	
	        computed.__activator__ = true;
	
	        /**
	         * The settings for this activator.
	         * @property {ActivatorSettings} settings
	         */
	        computed.settings = settings;
	        settings.activator = computed;
	
	        /**
	         * An observable which indicates whether or not the activator is currently in the process of activating an instance.
	         * @method isActivating
	         * @return {boolean}
	         */
	        computed.isActivating = ko.observable(false);
	
	        computed.forceActiveItem = function (item) {
	            activeItem(item);
	        };
	
	        /**
	         * Determines whether or not the specified item can be deactivated.
	         * @method canDeactivateItem
	         * @param {object} item The item to check.
	         * @param {boolean} close Whether or not to check if close is possible.
	         * @param {object} options Options for controlling the activation process.
	         * @return {promise}
	         */
	        computed.canDeactivateItem = function (item, close, options) {
	            return canDeactivateItem(item, close, settings, options);
	        };
	
	        /**
	         * Deactivates the specified item.
	         * @method deactivateItem
	         * @param {object} item The item to deactivate.
	         * @param {boolean} close Whether or not to close the item.
	         * @return {promise}
	         */
	        computed.deactivateItem = function (item, close) {
	            return system.defer(function(dfd) {
	                computed.canDeactivateItem(item, close).then(function(canDeactivate) {
	                    if (canDeactivate) {
	                        deactivate(item, close, settings, dfd, activeItem);
	                    } else {
	                        computed.notifySubscribers();
	                        dfd.resolve(false);
	                    }
	                });
	            }).promise();
	        };
	
	        /**
	         * Determines whether or not the specified item can be activated.
	         * @method canActivateItem
	         * @param {object} item The item to check.
	         * @param {object} activationData Data associated with the activation.
	         * @return {promise}
	         */
	        computed.canActivateItem = function (newItem, activationData) {
	            return canActivateItem(newItem, activeItem, settings, activeData, activationData);
	        };
	
	        /**
	         * Activates the specified item.
	         * @method activateItem
	         * @param {object} newItem The item to activate.
	         * @param {object} newActivationData Data associated with the activation.
	         * @param {object} options Options for controlling the activation process.
	         * @return {promise}
	         */
	        computed.activateItem = function (newItem, newActivationData, options) {
	            var viaSetter = computed.viaSetter;
	            computed.viaSetter = false;
	
	            return system.defer(function (dfd) {
	                if (computed.isActivating()) {
	                    dfd.resolve(false);
	                    return;
	                }
	
	                computed.isActivating(true);
	
	                var currentItem = activeItem();
	                if (settings.areSameItem(currentItem, newItem, activeData, newActivationData)) {
	                    computed.isActivating(false);
	                    dfd.resolve(true);
	                    return;
	                }
	
	                computed.canDeactivateItem(currentItem, settings.closeOnDeactivate, options).then(function (canDeactivate) {
	                    if (canDeactivate) {
	                        computed.canActivateItem(newItem, newActivationData).then(function (canActivate) {
	                            if (canActivate) {
	                                system.defer(function (dfd2) {
	                                    deactivate(currentItem, settings.closeOnDeactivate, settings, dfd2);
	                                }).promise().then(function () {
	                                        newItem = settings.beforeActivate(newItem, newActivationData);
	                                        activate(newItem, activeItem, function (result) {
	                                            activeData = newActivationData;
	                                            computed.isActivating(false);
	                                            dfd.resolve(result);
	                                        }, newActivationData);
	                                    });
	                            } else {
	                                if (viaSetter) {
	                                    computed.notifySubscribers();
	                                }
	
	                                computed.isActivating(false);
	                                dfd.resolve(false);
	                            }
	                        });
	                    } else {
	                        if (viaSetter) {
	                            computed.notifySubscribers();
	                        }
	
	                        computed.isActivating(false);
	                        dfd.resolve(false);
	                    }
	                });
	            }).promise();
	        };
	
	        /**
	         * Determines whether or not the activator, in its current state, can be activated.
	         * @method canActivate
	         * @return {promise}
	         */
	        computed.canActivate = function () {
	            var toCheck;
	
	            if (initialActiveItem) {
	                toCheck = initialActiveItem;
	                initialActiveItem = false;
	            } else {
	                toCheck = computed();
	            }
	
	            return computed.canActivateItem(toCheck);
	        };
	
	        /**
	         * Activates the activator, in its current state.
	         * @method activate
	         * @return {promise}
	         */
	        computed.activate = function () {
	            var toActivate;
	
	            if (initialActiveItem) {
	                toActivate = initialActiveItem;
	                initialActiveItem = false;
	            } else {
	                toActivate = computed();
	            }
	
	            return computed.activateItem(toActivate);
	        };
	
	        /**
	         * Determines whether or not the activator, in its current state, can be deactivated.
	         * @method canDeactivate
	         * @return {promise}
	         */
	        computed.canDeactivate = function (close) {
	            return computed.canDeactivateItem(computed(), close);
	        };
	
	        /**
	         * Deactivates the activator, in its current state.
	         * @method deactivate
	         * @return {promise}
	         */
	        computed.deactivate = function (close) {
	            return computed.deactivateItem(computed(), close);
	        };
	
	        computed.includeIn = function (includeIn) {
	            includeIn.canActivate = function () {
	                return computed.canActivate();
	            };
	
	            includeIn.activate = function () {
	                return computed.activate();
	            };
	
	            includeIn.canDeactivate = function (close) {
	                return computed.canDeactivate(close);
	            };
	
	            includeIn.deactivate = function (close) {
	                return computed.deactivate(close);
	            };
	        };
	
	        if (settings.includeIn) {
	            computed.includeIn(settings.includeIn);
	        } else if (initialActiveItem) {
	            computed.activate();
	        }
	
	        computed.forItems = function (items) {
	            settings.closeOnDeactivate = false;
	
	            settings.determineNextItemToActivate = function (list, lastIndex) {
	                var toRemoveAt = lastIndex - 1;
	
	                if (toRemoveAt == -1 && list.length > 1) {
	                    return list[1];
	                }
	
	                if (toRemoveAt > -1 && toRemoveAt < list.length - 1) {
	                    return list[toRemoveAt];
	                }
	
	                return null;
	            };
	
	            settings.beforeActivate = function (newItem) {
	                var currentItem = computed();
	
	                if (!newItem) {
	                    newItem = settings.determineNextItemToActivate(items, currentItem ? items.indexOf(currentItem) : 0);
	                } else {
	                    var index = items.indexOf(newItem);
	
	                    if (index == -1) {
	                        items.push(newItem);
	                    } else {
	                        newItem = items()[index];
	                    }
	                }
	
	                return newItem;
	            };
	
	            settings.afterDeactivate = function (oldItem, close) {
	                if (close) {
	                    items.remove(oldItem);
	                }
	            };
	
	            var originalCanDeactivate = computed.canDeactivate;
	            computed.canDeactivate = function (close) {
	                if (close) {
	                    return system.defer(function (dfd) {
	                        var list = items();
	                        var results = [];
	
	                        function finish() {
	                            for (var j = 0; j < results.length; j++) {
	                                if (!results[j]) {
	                                    dfd.resolve(false);
	                                    return;
	                                }
	                            }
	
	                            dfd.resolve(true);
	                        }
	
	                        for (var i = 0; i < list.length; i++) {
	                            computed.canDeactivateItem(list[i], close).then(function (result) {
	                                results.push(result);
	                                if (results.length == list.length) {
	                                    finish();
	                                }
	                            });
	                        }
	                    }).promise();
	                } else {
	                    return originalCanDeactivate();
	                }
	            };
	
	            var originalDeactivate = computed.deactivate;
	            computed.deactivate = function (close) {
	                if (close) {
	                    return system.defer(function (dfd) {
	                        var list = items();
	                        var results = 0;
	                        var listLength = list.length;
	
	                        function doDeactivate(item) {
	                            setTimeout(function () {
	                                computed.deactivateItem(item, close).then(function () {
	                                    results++;
	                                    items.remove(item);
	                                    if (results == listLength) {
	                                        dfd.resolve();
	                                    }
	                                });
	                            }, 1);
	                        }
	
	                        for (var i = 0; i < listLength; i++) {
	                            doDeactivate(list[i]);
	                        }
	                    }).promise();
	                } else {
	                    return originalDeactivate();
	                }
	            };
	
	            return computed;
	        };
	
	        return computed;
	    }
	
	    /**
	     * @class ActivatorSettings
	     * @static
	     */
	    var activatorSettings = {
	        /**
	         * The default value passed to an object's deactivate function as its close parameter.
	         * @property {boolean} closeOnDeactivate
	         * @default true
	         */
	        closeOnDeactivate: true,
	        /**
	         * Lower-cased words which represent a truthy value.
	         * @property {string[]} affirmations
	         * @default ['yes', 'ok', 'true']
	         */
	        affirmations: ['yes', 'ok', 'true'],
	        /**
	         * Interprets the response of a `canActivate` or `canDeactivate` call using the known affirmative values in the `affirmations` array.
	         * @method interpretResponse
	         * @param {object} value
	         * @return {boolean}
	         */
	        interpretResponse: function(value) {
	            if(system.isObject(value)) {
	                value = value.can || false;
	            }
	
	            if(system.isString(value)) {
	                return ko.utils.arrayIndexOf(this.affirmations, value.toLowerCase()) !== -1;
	            }
	
	            return value;
	        },
	        /**
	         * Determines whether or not the current item and the new item are the same.
	         * @method areSameItem
	         * @param {object} currentItem
	         * @param {object} newItem
	         * @param {object} currentActivationData
	         * @param {object} newActivationData
	         * @return {boolean}
	         */
	        areSameItem: function(currentItem, newItem, currentActivationData, newActivationData) {
	            return currentItem == newItem;
	        },
	        /**
	         * Called immediately before the new item is activated.
	         * @method beforeActivate
	         * @param {object} newItem
	         */
	        beforeActivate: function(newItem) {
	            return newItem;
	        },
	        /**
	         * Called immediately after the old item is deactivated.
	         * @method afterDeactivate
	         * @param {object} oldItem The previous item.
	         * @param {boolean} close Whether or not the previous item was closed.
	         * @param {function} setter The activate item setter function.
	         */
	        afterDeactivate: function(oldItem, close, setter) {
	            if(close && setter) {
	                setter(null);
	            }
	        },
	        findChildActivator: function(item){
	            return null;
	        }
	    };
	
	    /**
	     * @class ActivatorModule
	     * @static
	     */
	    activator = {
	        /**
	         * The default settings used by activators.
	         * @property {ActivatorSettings} defaults
	         */
	        defaults: activatorSettings,
	        /**
	         * Creates a new activator.
	         * @method create
	         * @param {object} [initialActiveItem] The item which should be immediately activated upon creation of the ativator.
	         * @param {ActivatorSettings} [settings] Per activator overrides of the default activator settings.
	         * @return {Activator} The created activator.
	         */
	        create: createActivator,
	        /**
	         * Determines whether or not the provided object is an activator or not.
	         * @method isActivator
	         * @param {object} object Any object you wish to verify as an activator or not.
	         * @return {boolean} True if the object is an activator; false otherwise.
	         */
	        isActivator:function(object){
	            return object && object.__activator__;
	        }
	    };
	
	    return activator;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The app module controls app startup, plugin loading/configuration and root visual display.
	 * @module app
	 * @requires system
	 * @requires viewEngine
	 * @requires composition
	 * @requires events
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(5), __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, viewEngine, composition, Events, $) {
	    var app,
	        allPluginIds = [],
	        allPluginConfigs = [];
	
	    function loadPlugins(){
	        return system.defer(function(dfd){
	            if(allPluginIds.length == 0){
	                dfd.resolve();
	                return;
	            }
	
	            system.acquire(allPluginIds).then(function(loaded){
	                for(var i = 0; i < loaded.length; i++){
	                    var currentModule = loaded[i];
	
	                    if(currentModule.install){
	                        var config = allPluginConfigs[i];
	                        if(!system.isObject(config)){
	                            config = {};
	                        }
	
	                        currentModule.install(config);
	                        system.log('Plugin:Installed ' + allPluginIds[i]);
	                    }else{
	                        system.log('Plugin:Loaded ' + allPluginIds[i]);
	                    }
	                }
	
	                dfd.resolve();
	            }).fail(function(err){
	                system.error('Failed to load plugin(s). Details: ' + err.message);
	            });
	        }).promise();
	    }
	
	    /**
	     * @class AppModule
	     * @static
	     * @uses Events
	     */
	    app = {
	        /**
	         * The title of your application.
	         * @property {string} title
	         */
	        title: 'Application',
	        /**
	         * Configures one or more plugins to be loaded and installed into the application.
	         * @method configurePlugins
	         * @param {object} config Keys are plugin names. Values can be truthy, to simply install the plugin, or a configuration object to pass to the plugin.
	         * @param {string} [baseUrl] The base url to load the plugins from.
	         */
	        configurePlugins:function(config, baseUrl){
	            var pluginIds = system.keys(config);
	            baseUrl = baseUrl || 'plugins/';
	
	            if(baseUrl.indexOf('/', baseUrl.length - 1) === -1){
	                baseUrl += '/';
	            }
	
	            for(var i = 0; i < pluginIds.length; i++){
	                var key = pluginIds[i];
	                allPluginIds.push(baseUrl + key);
	                allPluginConfigs.push(config[key]);
	            }
	        },
	        /**
	         * Starts the application.
	         * @method start
	         * @return {promise}
	         */
	        start: function() {
	            system.log('Application:Starting');
	
	            if (this.title) {
	                document.title = this.title;
	            }
	
	            return system.defer(function (dfd) {
	                $(function() {
	                    loadPlugins().then(function(){
	                        dfd.resolve();
	                        system.log('Application:Started');
	                    });
	                });
	            }).promise();
	        },
	        /**
	         * Sets the root module/view for the application.
	         * @method setRoot
	         * @param {string} root The root view or module.
	         * @param {string} [transition] The transition to use from the previous root (or splash screen) into the new root.
	         * @param {string} [applicationHost] The application host element or id. By default the id 'applicationHost' will be used.
	         */
	        setRoot: function(root, transition, applicationHost) {
	            var hostElement, settings = { activate:true, transition: transition };
	
	            if (!applicationHost || system.isString(applicationHost)) {
	                hostElement = document.getElementById(applicationHost || 'applicationHost');
	            } else {
	                hostElement = applicationHost;
	            }
	
	            if (system.isString(root)) {
	                if (viewEngine.isViewUrl(root)) {
	                    settings.view = root;
	                } else {
	                    settings.model = root;
	                }
	            } else {
	                settings.model = root;
	            }
	
	            function finishComposition() {
	                if(settings.model) {
	                    if (settings.model.canActivate) {
	                        try {
	                            var result = settings.model.canActivate();
	                            if (result && result.then) {
	                                result.then(function (actualResult) {
	                                    if (actualResult) {
	                                        composition.compose(hostElement, settings);
	                                    }
	                                }).fail(function (err) {
	                                    system.error(err);
	                                });
	                            } else if (result) {
	                                composition.compose(hostElement, settings);
	                            }
	                        } catch (er) {
	                            system.error(er);
	                        }
	                    } else {
	                        composition.compose(hostElement, settings);
	                    }
	                } else {
	                    composition.compose(hostElement, settings);
	                }
	            }
	
	            if(system.isString(settings.model)) {
	                system.acquire(settings.model).then(function(module) {
	                    settings.model = system.resolveObject(module);
	                    finishComposition();
	                }).fail(function(err) {
	                    system.error('Failed to load root module (' + settings.model + '). Details: ' + err.message);
	                });
	            } else {
	                finishComposition();
	            }
	        }
	    };
	
	    Events.includeIn(app);
	
	    return app;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The dialog module enables the display of message boxes, custom modal dialogs and other overlays or slide-out UI abstractions. Dialogs are constructed by the composition system which interacts with a user defined dialog context. The dialog module enforced the activator lifecycle.
	 * @module dialog
	 * @requires system
	 * @requires app
	 * @requires composition
	 * @requires activator
	 * @requires viewEngine
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(9), __webpack_require__(5), __webpack_require__(8), __webpack_require__(7), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, app, composition, activator, viewEngine, $, ko) {
	    var contexts = {},
	        dialogCount = ko.observable(0),
	        dialog;
	
	    /**
	     * Models a message box's message, title and options.
	     * @class MessageBox
	     */
	    var MessageBox = function (message, title, options, autoclose, settings) {
	        this.message = message;
	        this.title = title || MessageBox.defaultTitle;
	        this.options = options || MessageBox.defaultOptions;
	        this.autoclose = autoclose || false;
	        this.settings = $.extend({}, MessageBox.defaultSettings, settings);
	    };
	
	    /**
	     * Selects an option and closes the message box, returning the selected option through the dialog system's promise.
	     * @method selectOption
	     * @param {string} dialogResult The result to select.
	     */
	    MessageBox.prototype.selectOption = function (dialogResult) {
	        dialog.close(this, dialogResult);
	    };
	
	    /**
	     * Provides the view to the composition system.
	     * @method getView
	     * @return {DOMElement} The view of the message box.
	     */
	    MessageBox.prototype.getView = function () {
	        return viewEngine.processMarkup(MessageBox.defaultViewMarkup);
	    };
	
	    /**
	     * Configures a custom view to use when displaying message boxes.
	     * @method setViewUrl
	     * @param {string} viewUrl The view url relative to the base url which the view locator will use to find the message box's view.
	     * @static
	     */
	    MessageBox.setViewUrl = function (viewUrl) {
	        delete MessageBox.prototype.getView;
	        MessageBox.prototype.viewUrl = viewUrl;
	    };
	
	    /**
	     * The title to be used for the message box if one is not provided.
	     * @property {string} defaultTitle
	     * @default Application
	     * @static
	     */
	    MessageBox.defaultTitle = app.title || 'Application';
	
	    /**
	     * The options to display in the message box if none are specified.
	     * @property {string[]} defaultOptions
	     * @default ['Ok']
	     * @static
	     */
	    MessageBox.defaultOptions = ['Ok'];
	
	    
	    MessageBox.defaultSettings = { buttonClass: "btn btn-default", primaryButtonClass: "btn-primary autofocus", secondaryButtonClass: "", "class": "modal-content messageBox", style: null };
	
	    /**
	    * Sets the classes and styles used throughout the message box markup.
	    * @method setDefaults
	    * @param {object} settings A settings object containing the following optional properties: buttonClass, primaryButtonClass, secondaryButtonClass, class, style.
	    */
	    MessageBox.setDefaults = function (settings) {
	        $.extend(MessageBox.defaultSettings, settings);
	    };
	
	    MessageBox.prototype.getButtonClass = function ($index) {
	        var c = "";
	        if (this.settings) {
	            if (this.settings.buttonClass) {
	                c = this.settings.buttonClass;
	            }
	            if ($index() === 0 && this.settings.primaryButtonClass) {
	                if (c.length > 0) {
	                    c += " ";
	                }
	                c += this.settings.primaryButtonClass;
	            }
	            if ($index() > 0 && this.settings.secondaryButtonClass) {
	                if (c.length > 0) {
	                    c += " ";
	                }
	                c += this.settings.secondaryButtonClass;
	            }
	        }
	        return c;
	    };
	
	    MessageBox.prototype.getClass = function () {
	        if (this.settings) {
	            return this.settings["class"];
	        }
	        return "messageBox";
	    };
	
	    MessageBox.prototype.getStyle = function () {
	        if (this.settings) {
	            return this.settings.style;
	        }
	        return null;
	    };
	
	    MessageBox.prototype.getButtonText = function (stringOrObject) {
	        var t = $.type(stringOrObject);
	        if (t === "string") {
	            return stringOrObject;
	        }
	        else if (t === "object") {
	            if ($.type(stringOrObject.text) === "string") {
	                return stringOrObject.text;
	            } else {
	                system.error('The object for a MessageBox button does not have a text property that is a string.');
	                return null;
	            }
	        }
	        system.error('Object for a MessageBox button is not a string or object but ' + t + '.');
	        return null;
	    };
	
	    MessageBox.prototype.getButtonValue = function (stringOrObject) {
	        var t = $.type(stringOrObject);
	        if (t === "string") {
	            return stringOrObject;
	        }
	        else if (t === "object") {
	            if ($.type(stringOrObject.value) === "undefined") {
	                system.error('The object for a MessageBox button does not have a value property defined.');
	                return null;
	            } else {
	                return stringOrObject.value;
	            }
	        }
	        system.error('Object for a MessageBox button is not a string or object but ' + t + '.');
	        return null;
	    };
	
	    /**
	     * The markup for the message box's view.
	     * @property {string} defaultViewMarkup
	     * @static
	     */
	    MessageBox.defaultViewMarkup = [
	        '<div data-view="plugins/messageBox" data-bind="css: getClass(), style: getStyle()">',
	            '<div class="modal-header">',
	                '<h3 data-bind="html: title"></h3>',
	            '</div>',
	            '<div class="modal-body">',
	                '<p class="message" data-bind="html: message"></p>',
	            '</div>',
	            '<div class="modal-footer">',
	                '<!-- ko foreach: options -->',
	                '<button data-bind="click: function () { $parent.selectOption($parent.getButtonValue($data)); }, text: $parent.getButtonText($data), css: $parent.getButtonClass($index)"></button>',
	                '<!-- /ko -->',
	                '<div style="clear:both;"></div>',
	            '</div>',
	        '</div>'
	    ].join('\n');
	
	    function ensureDialogInstance(objOrModuleId) {
	        return system.defer(function (dfd) {
	            if (system.isString(objOrModuleId)) {
	                system.acquire(objOrModuleId).then(function (module) {
	                    dfd.resolve(system.resolveObject(module));
	                }).fail(function (err) {
	                    system.error('Failed to load dialog module (' + objOrModuleId + '). Details: ' + err.message);
	                });
	            } else {
	                dfd.resolve(objOrModuleId);
	            }
	        }).promise();
	    }
	
	    /**
	     * @class DialogModule
	     * @static
	     */
	    dialog = {
	        /**
	         * The constructor function used to create message boxes.
	         * @property {MessageBox} MessageBox
	         */
	        MessageBox: MessageBox,
	        /**
	         * The css zIndex that the last dialog was displayed at.
	         * @property {number} currentZIndex
	         */
	        currentZIndex: 1050,
	        /**
	         * Gets the next css zIndex at which a dialog should be displayed.
	         * @method getNextZIndex
	         * @return {number} The next usable zIndex.
	         */
	        getNextZIndex: function () {
	            return ++this.currentZIndex;
	        },
	        /**
	         * Determines whether or not there are any dialogs open.
	         * @method isOpen
	         * @return {boolean} True if a dialog is open. false otherwise.
	         */
	        isOpen: ko.computed(function() {
	            return dialogCount() > 0;
	        }),
	        /**
	         * Gets the dialog context by name or returns the default context if no name is specified.
	         * @method getContext
	         * @param {string} [name] The name of the context to retrieve.
	         * @return {DialogContext} True context.
	         */
	        getContext: function (name) {
	            return contexts[name || 'default'];
	        },
	        /**
	         * Adds (or replaces) a dialog context.
	         * @method addContext
	         * @param {string} name The name of the context to add.
	         * @param {DialogContext} dialogContext The context to add.
	         */
	        addContext: function (name, dialogContext) {
	            dialogContext.name = name;
	            contexts[name] = dialogContext;
	
	            var helperName = 'show' + name.substr(0, 1).toUpperCase() + name.substr(1);
	            this[helperName] = function (obj, activationData) {
	                return this.show(obj, activationData, name);
	            };
	        },
	        createCompositionSettings: function (obj, dialogContext) {
	            var settings = {
	                model: obj,
	                activate: false,
	                transition: false
	            };
	
	            if (dialogContext.binding) {
	                settings.binding = dialogContext.binding;
	            }
	
	            if (dialogContext.attached) {
	                settings.attached = dialogContext.attached;
	            }
	
	            if (dialogContext.compositionComplete) {
	                settings.compositionComplete = dialogContext.compositionComplete;
	            }
	
	            return settings;
	        },
	        /**
	         * Gets the dialog model that is associated with the specified object.
	         * @method getDialog
	         * @param {object} obj The object for whom to retrieve the dialog.
	         * @return {Dialog} The dialog model.
	         */
	        getDialog: function (obj) {
	            if (obj) {
	                return obj.__dialog__;
	            }
	
	            return undefined;
	        },
	        /**
	         * Closes the dialog associated with the specified object.
	         * @method close
	         * @param {object} obj The object whose dialog should be closed.
	         * @param {object} results* The results to return back to the dialog caller after closing.
	         */
	        close: function (obj) {
	            var theDialog = this.getDialog(obj);
	            if (theDialog) {
	                var rest = Array.prototype.slice.call(arguments, 1);
	                theDialog.close.apply(theDialog, rest);
	            }
	        },
	        /**
	         * Shows a dialog.
	         * @method show
	         * @param {object|string} obj The object (or moduleId) to display as a dialog.
	         * @param {object} [activationData] The data that should be passed to the object upon activation.
	         * @param {string} [context] The name of the dialog context to use. Uses the default context if none is specified.
	         * @return {Promise} A promise that resolves when the dialog is closed and returns any data passed at the time of closing.
	         */
	        show: function (obj, activationData, context) {
	            var that = this;
	            var dialogContext = contexts[context || 'default'];
	
	            return system.defer(function (dfd) {
	                ensureDialogInstance(obj).then(function (instance) {
	                    var dialogActivator = activator.create();
	
	                    dialogActivator.activateItem(instance, activationData).then(function (success) {
	                        if (success) {
	                            var theDialog = instance.__dialog__ = {
	                                owner: instance,
	                                context: dialogContext,
	                                activator: dialogActivator,
	                                close: function () {
	                                    var args = arguments;
	                                    dialogActivator.deactivateItem(instance, true).then(function (closeSuccess) {
	                                        if (closeSuccess) {
	                                            dialogCount(dialogCount() - 1);
	                                            dialogContext.removeHost(theDialog);
	                                            delete instance.__dialog__;
	
	                                            if (args.length === 0) {
	                                                dfd.resolve();
	                                            } else if (args.length === 1) {
	                                                dfd.resolve(args[0]);
	                                            } else {
	                                                dfd.resolve.apply(dfd, args);
	                                            }
	                                        }
	                                    });
	                                }
	                            };
	
	                            theDialog.settings = that.createCompositionSettings(instance, dialogContext);
	                            dialogContext.addHost(theDialog);
	
	                            dialogCount(dialogCount() + 1);
	                            composition.compose(theDialog.host, theDialog.settings);
	                        } else {
	                            dfd.resolve(false);
	                        }
	                    });
	                });
	            }).promise();
	        },
	        /**
	         * Shows a message box.
	         * @method showMessage
	         * @param {string} message The message to display in the dialog.
	         * @param {string} [title] The title message.
	         * @param {string[]} [options] The options to provide to the user.
	         * @param {boolean} [autoclose] Automatically close the the message box when clicking outside?
	         * @param {Object} [settings] Custom settings for this instance of the messsage box, used to change classes and styles.
	         * @return {Promise} A promise that resolves when the message box is closed and returns the selected option.
	         */
	        showMessage: function (message, title, options, autoclose, settings) {
	            if (system.isString(this.MessageBox)) {
	                return dialog.show(this.MessageBox, [
	                    message,
	                    title || MessageBox.defaultTitle,
	                    options || MessageBox.defaultOptions,
	                    autoclose || false,
	                    settings || {}
	                ]);
	            }
	
	            return dialog.show(new this.MessageBox(message, title, options, autoclose, settings));
	        },
	        /**
	         * Installs this module into Durandal; called by the framework. Adds `app.showDialog` and `app.showMessage` convenience methods.
	         * @method install
	         * @param {object} [config] Add a `messageBox` property to supply a custom message box constructor. Add a `messageBoxView` property to supply custom view markup for the built-in message box. You can also use messageBoxViewUrl to specify the view url.
	         */
	        install: function (config) {
	            app.showDialog = function (obj, activationData, context) {
	                return dialog.show(obj, activationData, context);
	            };
	
	            app.closeDialog = function () {
	                return dialog.close.apply(dialog, arguments);
	            };
	
	            app.showMessage = function (message, title, options, autoclose, settings) {
	                return dialog.showMessage(message, title, options, autoclose, settings);
	            };
	
	            if (config.messageBox) {
	                dialog.MessageBox = config.messageBox;
	            }
	
	            if (config.messageBoxView) {
	                dialog.MessageBox.prototype.getView = function () {
	                    return viewEngine.processMarkup(config.messageBoxView);
	                };
	            }
	
	            if (config.messageBoxViewUrl) {
	                dialog.MessageBox.setViewUrl(config.messageBoxViewUrl);
	            }
	        }
	    };
	
	    /**
	     * @class DialogContext
	     */
	    dialog.addContext('default', {
	        blockoutOpacity: 0.2,
	        removeDelay: 200,
	        minYMargin: 5,
	        minXMargin: 5,
	        /**
	         * In this function, you are expected to add a DOM element to the tree which will serve as the "host" for the modal's composed view. You must add a property called host to the modalWindow object which references the dom element. It is this host which is passed to the composition module.
	         * @method addHost
	         * @param {Dialog} theDialog The dialog model.
	         */
	        addHost: function (theDialog) {
	            var body = $('body');
	            var blockout = $('<div class="modalBlockout"></div>')
	                .css({ 'z-index': dialog.getNextZIndex(), 'opacity': this.blockoutOpacity })
	                .appendTo(body);
	
	            var host = $('<div class="modalHost"></div>')
	                .css({ 'z-index': dialog.getNextZIndex() })
	                .appendTo(body);
	
	            theDialog.host = host.get(0);
	            theDialog.blockout = blockout.get(0);
	
	            if (!dialog.isOpen()) {
	                theDialog.oldBodyMarginRight = body.css("margin-right");
	                theDialog.oldInlineMarginRight = body.get(0).style.marginRight;
	
	                var html = $("html");
	                var oldBodyOuterWidth = body.outerWidth(true);
	                var oldScrollTop = html.scrollTop();
	                $("html").css("overflow-y", "hidden");
	                var newBodyOuterWidth = $("body").outerWidth(true);
	                body.css("margin-right", (newBodyOuterWidth - oldBodyOuterWidth + parseInt(theDialog.oldBodyMarginRight, 10)) + "px");
	                html.scrollTop(oldScrollTop); // necessary for Firefox
	            }
	        },
	        /**
	         * This function is expected to remove any DOM machinery associated with the specified dialog and do any other necessary cleanup.
	         * @method removeHost
	         * @param {Dialog} theDialog The dialog model.
	         */
	        removeHost: function (theDialog) {
	            $(theDialog.host).css('opacity', 0);
	            $(theDialog.blockout).css('opacity', 0);
	
	            setTimeout(function () {
	                ko.removeNode(theDialog.host);
	                ko.removeNode(theDialog.blockout);
	            }, this.removeDelay);
	
	            if (!dialog.isOpen()) {
	                var html = $("html");
	                var oldScrollTop = html.scrollTop(); // necessary for Firefox.
	                html.css("overflow-y", "").scrollTop(oldScrollTop);
	
	                if (theDialog.oldInlineMarginRight) {
	                    $("body").css("margin-right", theDialog.oldBodyMarginRight);
	                } else {
	                    $("body").css("margin-right", '');
	                }
	            }
	        },
	        attached: function (view) {
	            //To prevent flickering in IE8, we set visibility to hidden first, and later restore it
	            $(view).css("visibility", "hidden");
	        },
	        /**
	         * This function is called after the modal is fully composed into the DOM, allowing your implementation to do any final modifications, such as positioning or animation. You can obtain the original dialog object by using `getDialog` on context.model.
	         * @method compositionComplete
	         * @param {DOMElement} child The dialog view.
	         * @param {DOMElement} parent The parent view.
	         * @param {object} context The composition context.
	         */
	        compositionComplete: function (child, parent, context) {
	            var theDialog = dialog.getDialog(context.model);
	            var $child = $(child);
	            var loadables = $child.find("img").filter(function () {
	                //Remove images with known width and height
	                var $this = $(this);
	                return !(this.style.width && this.style.height) && !($this.attr("width") && $this.attr("height"));
	            });
	
	            $child.data("predefinedWidth", $child.get(0).style.width);
	
	            var setDialogPosition = function (childView, objDialog) {
	                //Setting a short timeout is need in IE8, otherwise we could do this straight away
	                setTimeout(function () {
	                    var $childView = $(childView);
	
	                    objDialog.context.reposition(childView);
	
	                    $(objDialog.host).css('opacity', 1);
	                    $childView.css("visibility", "visible");
	
	                    $childView.find('.autofocus').first().focus();
	                }, 1);
	            };
	
	            setDialogPosition(child, theDialog);
	            loadables.load(function () {
	                setDialogPosition(child, theDialog);
	            });
	
	            if ($child.hasClass('autoclose') || context.model.autoclose) {
	                $(theDialog.blockout).click(function () {
	                    theDialog.close();
	                });
	            }
	        },
	        /**
	         * This function is called to reposition the model view.
	         * @method reposition
	         * @param {DOMElement} view The dialog view.
	         */
	        reposition: function (view) {
	            var $view = $(view),
	                $window = $(window);
	
	            //We will clear and then set width for dialogs without width set 
	            if (!$view.data("predefinedWidth")) {
	                $view.css({ width: '' }); //Reset width
	            }
				
				// clear the height
	            $view.css({ height: '' });
	
	            var width = $view.outerWidth(false),
	                height = $view.outerHeight(false),
	                windowHeight = $window.height() - 2 * this.minYMargin, //leave at least some pixels free
	                windowWidth = $window.width() - 2 * this.minXMargin, //leave at least some pixels free
	                constrainedHeight = Math.min(height, windowHeight),
	                constrainedWidth = Math.min(width, windowWidth);
	
	            $view.css({
	                'margin-top': (-constrainedHeight / 2).toString() + 'px',
	                'margin-left': (-constrainedWidth / 2).toString() + 'px'
	            });
	
	            if (height > windowHeight) {
	                $view.css("overflow-y", "auto").outerHeight(windowHeight);
	            } else {
	                $view.css({
	                    "overflow-y": "",
	                    "height": ""
	                });
	            }
	
	            if (width > windowWidth) {
	                $view.css("overflow-x", "auto").outerWidth(windowWidth);
	            } else {
	                $view.css("overflow-x", "");
	
	                if (!$view.data("predefinedWidth")) {
	                    //Ensure the correct width after margin-left has been set
	                    $view.outerWidth(constrainedWidth);
	                } else {
	                    $view.css("width", $view.data("predefinedWidth"));
	                }
	            }
	        }
	    });
	
	    return dialog;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The binder joins an object instance and a DOM element tree by applying databinding and/or invoking binding lifecycle callbacks (binding and bindingComplete).
	 * @module binder
	 * @requires system
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, ko) {
	    var binder,
	        insufficientInfoMessage = 'Insufficient Information to Bind',
	        unexpectedViewMessage = 'Unexpected View Type',
	        bindingInstructionKey = 'durandal-binding-instruction',
	        koBindingContextKey = '__ko_bindingContext__';
	
	    function normalizeBindingInstruction(result){
	        if(result === undefined){
	            return { applyBindings: true };
	        }
	
	        if(system.isBoolean(result)){
	            return { applyBindings:result };
	        }
	
	        if(result.applyBindings === undefined){
	            result.applyBindings = true;
	        }
	
	        return result;
	    }
	
	    function doBind(obj, view, bindingTarget, data){
	        if (!view || !bindingTarget) {
	            if (binder.throwOnErrors) {
	                system.error(insufficientInfoMessage);
	            } else {
	                system.log(insufficientInfoMessage, view, data);
	            }
	            return;
	        }
	
	        if (!view.getAttribute) {
	            if (binder.throwOnErrors) {
	                system.error(unexpectedViewMessage);
	            } else {
	                system.log(unexpectedViewMessage, view, data);
	            }
	            return;
	        }
	
	        var viewName = view.getAttribute('data-view');
	
	        try {
	            var instruction;
	
	            if (obj && obj.binding) {
	                instruction = obj.binding(view);
	            }
	
	            instruction = normalizeBindingInstruction(instruction);
	            binder.binding(data, view, instruction);
	
	            if(instruction.applyBindings){
	                system.log('Binding', viewName, data);
	                ko.applyBindings(bindingTarget, view);
	            }else if(obj){
	                ko.utils.domData.set(view, koBindingContextKey, { $data:obj });
	            }
	
	            binder.bindingComplete(data, view, instruction);
	
	            if (obj && obj.bindingComplete) {
	                obj.bindingComplete(view);
	            }
	
	            ko.utils.domData.set(view, bindingInstructionKey, instruction);
	            return instruction;
	        } catch (e) {
	            e.message = e.message + ';\nView: ' + viewName + ";\nModuleId: " + system.getModuleId(data);
	            if (binder.throwOnErrors) {
	                system.error(e);
	            } else {
	                system.log(e.message);
	            }
	        }
	    }
	
	    /**
	     * @class BinderModule
	     * @static
	     */
	    return binder = {
	        /**
	         * Called before every binding operation. Does nothing by default.
	         * @method binding
	         * @param {object} data The data that is about to be bound.
	         * @param {DOMElement} view The view that is about to be bound.
	         * @param {object} instruction The object that carries the binding instructions.
	         */
	        binding: system.noop,
	        /**
	         * Called after every binding operation. Does nothing by default.
	         * @method bindingComplete
	         * @param {object} data The data that has just been bound.
	         * @param {DOMElement} view The view that has just been bound.
	         * @param {object} instruction The object that carries the binding instructions.
	         */
	        bindingComplete: system.noop,
	        /**
	         * Indicates whether or not the binding system should throw errors or not.
	         * @property {boolean} throwOnErrors
	         * @default false The binding system will not throw errors by default. Instead it will log them.
	         */
	        throwOnErrors: false,
	        /**
	         * Gets the binding instruction that was associated with a view when it was bound.
	         * @method getBindingInstruction
	         * @param {DOMElement} view The view that was previously bound.
	         * @return {object} The object that carries the binding instructions.
	         */
	        getBindingInstruction:function(view){
	            return ko.utils.domData.get(view, bindingInstructionKey);
	        },
	        /**
	         * Binds the view, preserving the existing binding context. Optionally, a new context can be created, parented to the previous context.
	         * @method bindContext
	         * @param {KnockoutBindingContext} bindingContext The current binding context.
	         * @param {DOMElement} view The view to bind.
	         * @param {object} [obj] The data to bind to, causing the creation of a child binding context if present.
	         * @param {string} [dataAlias] An alias for $data if present.
	         */
	        bindContext: function(bindingContext, view, obj, dataAlias) {
	            if (obj && bindingContext) {
	                bindingContext = bindingContext.createChildContext(obj, typeof(dataAlias) === 'string' ? dataAlias : null);
	            }
	
	            return doBind(obj, view, bindingContext, obj || (bindingContext ? bindingContext.$data : null));
	        },
	        /**
	         * Binds the view, preserving the existing binding context. Optionally, a new context can be created, parented to the previous context.
	         * @method bind
	         * @param {object} obj The data to bind to.
	         * @param {DOMElement} view The view to bind.
	         */
	        bind: function(obj, view) {
	            return doBind(obj, view, obj, obj);
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Durandal events originate from backbone.js but also combine some ideas from signals.js as well as some additional improvements.
	 * Events can be installed into any object and are installed into the `app` module by default for convenient app-wide eventing.
	 * @module events
	 * @requires system
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system) {
	    var eventSplitter = /\s+/;
	    var Events = function() { };
	
	    /**
	     * Represents an event subscription.
	     * @class Subscription
	     */
	    var Subscription = function(owner, events) {
	        this.owner = owner;
	        this.events = events;
	    };
	
	    /**
	     * Attaches a callback to the event subscription.
	     * @method then
	     * @param {function} callback The callback function to invoke when the event is triggered.
	     * @param {object} [context] An object to use as `this` when invoking the `callback`.
	     * @chainable
	     */
	    Subscription.prototype.then = function (callback, context) {
	        this.callback = callback || this.callback;
	        this.context = context || this.context;
	        
	        if (!this.callback) {
	            return this;
	        }
	
	        this.owner.on(this.events, this.callback, this.context);
	        return this;
	    };
	
	    /**
	     * Attaches a callback to the event subscription.
	     * @method on
	     * @param {function} [callback] The callback function to invoke when the event is triggered. If `callback` is not provided, the previous callback will be re-activated.
	     * @param {object} [context] An object to use as `this` when invoking the `callback`.
	     * @chainable
	     */
	    Subscription.prototype.on = Subscription.prototype.then;
	
	    /**
	     * Cancels the subscription.
	     * @method off
	     * @chainable
	     */
	    Subscription.prototype.off = function () {
	        this.owner.off(this.events, this.callback, this.context);
	        return this;
	    };
	
	    /**
	     * Creates an object with eventing capabilities.
	     * @class Events
	     */
	
	    /**
	     * Creates a subscription or registers a callback for the specified event.
	     * @method on
	     * @param {string} events One or more events, separated by white space.
	     * @param {function} [callback] The callback function to invoke when the event is triggered. If `callback` is not provided, a subscription instance is returned.
	     * @param {object} [context] An object to use as `this` when invoking the `callback`.
	     * @return {Subscription|Events} A subscription is returned if no callback is supplied, otherwise the events object is returned for chaining.
	     */
	    Events.prototype.on = function(events, callback, context) {
	        var calls, event, list;
	
	        if (!callback) {
	            return new Subscription(this, events);
	        } else {
	            calls = this.callbacks || (this.callbacks = {});
	            events = events.split(eventSplitter);
	
	            while (event = events.shift()) {
	                list = calls[event] || (calls[event] = []);
	                list.push(callback, context);
	            }
	
	            return this;
	        }
	    };
	
	    /**
	     * Removes the callbacks for the specified events.
	     * @method off
	     * @param {string} [events] One or more events, separated by white space to turn off. If no events are specified, then the callbacks will be removed.
	     * @param {function} [callback] The callback function to remove. If `callback` is not provided, all callbacks for the specified events will be removed.
	     * @param {object} [context] The object that was used as `this`. Callbacks with this context will be removed.
	     * @chainable
	     */
	    Events.prototype.off = function(events, callback, context) {
	        var event, calls, list, i;
	
	        // No events
	        if (!(calls = this.callbacks)) {
	            return this;
	        }
	
	        //removing all
	        if (!(events || callback || context)) {
	            delete this.callbacks;
	            return this;
	        }
	
	        events = events ? events.split(eventSplitter) : system.keys(calls);
	
	        // Loop through the callback list, splicing where appropriate.
	        while (event = events.shift()) {
	            if (!(list = calls[event]) || !(callback || context)) {
	                delete calls[event];
	                continue;
	            }
	
	            for (i = list.length - 2; i >= 0; i -= 2) {
	                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
	                    list.splice(i, 2);
	                }
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Triggers the specified events.
	     * @method trigger
	     * @param {string} [events] One or more events, separated by white space to trigger.
	     * @chainable
	     */
	    Events.prototype.trigger = function(events) {
	        var event, calls, list, i, length, args, all, rest;
	        if (!(calls = this.callbacks)) {
	            return this;
	        }
	
	        rest = [];
	        events = events.split(eventSplitter);
	        for (i = 1, length = arguments.length; i < length; i++) {
	            rest[i - 1] = arguments[i];
	        }
	
	        // For each event, walk through the list of callbacks twice, first to
	        // trigger the event, then to trigger any `"all"` callbacks.
	        while (event = events.shift()) {
	            // Copy callback lists to prevent modification.
	            if (all = calls.all) {
	                all = all.slice();
	            }
	
	            if (list = calls[event]) {
	                list = list.slice();
	            }
	
	            // Execute event callbacks.
	            if (list) {
	                for (i = 0, length = list.length; i < length; i += 2) {
	                    list[i].apply(list[i + 1] || this, rest);
	                }
	            }
	
	            // Execute "all" callbacks.
	            if (all) {
	                args = [event].concat(rest);
	                for (i = 0, length = all.length; i < length; i += 2) {
	                    all[i].apply(all[i + 1] || this, args);
	                }
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Creates a function that will trigger the specified events when called. Simplifies proxying jQuery (or other) events through to the events object.
	     * @method proxy
	     * @param {string} events One or more events, separated by white space to trigger by invoking the returned function.
	     * @return {function} Calling the function will invoke the previously specified events on the events object.
	     */
	    Events.prototype.proxy = function(events) {
	        var that = this;
	        return (function(arg) {
	            that.trigger(events, arg);
	        });
	    };
	
	    /**
	     * Creates an object with eventing capabilities.
	     * @class EventsModule
	     * @static
	     */
	
	    /**
	     * Adds eventing capabilities to the specified object.
	     * @method includeIn
	     * @param {object} targetObject The object to add eventing capabilities to.
	     */
	    Events.includeIn = function(targetObject) {
	        targetObject.on = Events.prototype.on;
	        targetObject.off = Events.prototype.off;
	        targetObject.trigger = Events.prototype.trigger;
	        targetObject.proxy = Events.prototype.proxy;
	    };
	
	    return Events;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Layers the widget sugar on top of the composition system.
	 * @module widget
	 * @requires system
	 * @requires composition
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, composition, $, ko) {
	    var kindModuleMaps = {},
	        kindViewMaps = {},
	        bindableSettings = ['model', 'view', 'kind'],
	        widgetDataKey = 'durandal-widget-data';
	
	    function extractParts(element, settings){
	        var data = ko.utils.domData.get(element, widgetDataKey);
	
	        if(!data){
	            data = {
	                parts:composition.cloneNodes(ko.virtualElements.childNodes(element))
	            };
	
	            ko.virtualElements.emptyNode(element);
	            ko.utils.domData.set(element, widgetDataKey, data);
	        }
	
	        settings.parts = data.parts;
	    }
	
	    /**
	     * @class WidgetModule
	     * @static
	     */
	    var widget = {
	        getSettings: function(valueAccessor) {
	            var settings = ko.utils.unwrapObservable(valueAccessor()) || {};
	
	            if (system.isString(settings)) {
	                return { kind: settings };
	            }
	
	            for (var attrName in settings) {
	                if (ko.utils.arrayIndexOf(bindableSettings, attrName) != -1) {
	                    settings[attrName] = ko.utils.unwrapObservable(settings[attrName]);
	                } else {
	                    settings[attrName] = settings[attrName];
	                }
	            }
	
	            return settings;
	        },
	        /**
	         * Creates a ko binding handler for the specified kind.
	         * @method registerKind
	         * @param {string} kind The kind to create a custom binding handler for.
	         */
	        registerKind: function(kind) {
	            ko.bindingHandlers[kind] = {
	                init: function() {
	                    return { controlsDescendantBindings: true };
	                },
	                update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    var settings = widget.getSettings(valueAccessor);
	                    settings.kind = kind;
	                    extractParts(element, settings);
	                    widget.create(element, settings, bindingContext, true);
	                }
	            };
	
	            ko.virtualElements.allowedBindings[kind] = true;
	            composition.composeBindings.push(kind + ':');
	        },
	        /**
	         * Maps views and module to the kind identifier if a non-standard pattern is desired.
	         * @method mapKind
	         * @param {string} kind The kind name.
	         * @param {string} [viewId] The unconventional view id to map the kind to.
	         * @param {string} [moduleId] The unconventional module id to map the kind to.
	         */
	        mapKind: function(kind, viewId, moduleId) {
	            if (viewId) {
	                kindViewMaps[kind] = viewId;
	            }
	
	            if (moduleId) {
	                kindModuleMaps[kind] = moduleId;
	            }
	        },
	        /**
	         * Maps a kind name to it's module id. First it looks up a custom mapped kind, then falls back to `convertKindToModulePath`.
	         * @method mapKindToModuleId
	         * @param {string} kind The kind name.
	         * @return {string} The module id.
	         */
	        mapKindToModuleId: function(kind) {
	            return kindModuleMaps[kind] || widget.convertKindToModulePath(kind);
	        },
	        /**
	         * Converts a kind name to it's module path. Used to conventionally map kinds who aren't explicitly mapped through `mapKind`.
	         * @method convertKindToModulePath
	         * @param {string} kind The kind name.
	         * @return {string} The module path.
	         */
	        convertKindToModulePath: function(kind) {
	            return 'widgets/' + kind + '/viewmodel';
	        },
	        /**
	         * Maps a kind name to it's view id. First it looks up a custom mapped kind, then falls back to `convertKindToViewPath`.
	         * @method mapKindToViewId
	         * @param {string} kind The kind name.
	         * @return {string} The view id.
	         */
	        mapKindToViewId: function(kind) {
	            return kindViewMaps[kind] || widget.convertKindToViewPath(kind);
	        },
	        /**
	         * Converts a kind name to it's view id. Used to conventionally map kinds who aren't explicitly mapped through `mapKind`.
	         * @method convertKindToViewPath
	         * @param {string} kind The kind name.
	         * @return {string} The view id.
	         */
	        convertKindToViewPath: function(kind) {
	            return 'widgets/' + kind + '/view';
	        },
	        createCompositionSettings: function(element, settings) {
	            if (!settings.model) {
	                settings.model = this.mapKindToModuleId(settings.kind);
	            }
	
	            if (!settings.view) {
	                settings.view = this.mapKindToViewId(settings.kind);
	            }
	
	            settings.preserveContext = true;
	            settings.activate = true;
	            settings.activationData = settings;
	            settings.mode = 'templated';
	
	            return settings;
	        },
	        /**
	         * Creates a widget.
	         * @method create
	         * @param {DOMElement} element The DOMElement or knockout virtual element that serves as the target element for the widget.
	         * @param {object} settings The widget settings.
	         * @param {object} [bindingContext] The current binding context.
	         */
	        create: function(element, settings, bindingContext, fromBinding) {
	            if(!fromBinding){
	                settings = widget.getSettings(function() { return settings; }, element);
	            }
	
	            var compositionSettings = widget.createCompositionSettings(element, settings);
	
	            composition.compose(element, compositionSettings, bindingContext);
	        },
	        /**
	         * Installs the widget module by adding the widget binding handler and optionally registering kinds.
	         * @method install
	         * @param {object} config The module config. Add a `kinds` array with the names of widgets to automatically register. You can also specify a `bindingName` if you wish to use another name for the widget binding, such as "control" for example.
	         */
	        install:function(config){
	            config.bindingName = config.bindingName || 'widget';
	
	            if(config.kinds){
	                var toRegister = config.kinds;
	
	                for(var i = 0; i < toRegister.length; i++){
	                    widget.registerKind(toRegister[i]);
	                }
	            }
	
	            ko.bindingHandlers[config.bindingName] = {
	                init: function() {
	                    return { controlsDescendantBindings: true };
	                },
	                update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	                    var settings = widget.getSettings(valueAccessor);
	                    extractParts(element, settings);
	                    widget.create(element, settings, bindingContext, true);
	                }
	            };
	
	            composition.composeBindings.push(config.bindingName + ':');
	            ko.virtualElements.allowedBindings[config.bindingName] = true;
	        }
	    };
	
	    return widget;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The viewLocator module collaborates with the viewEngine module to provide views (literally dom sub-trees) to other parts of the framework as needed. The primary consumer of the viewLocator is the composition module.
	 * @module viewLocator
	 * @requires system
	 * @requires viewEngine
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, viewEngine) {
	    function findInElements(nodes, url) {
	        for (var i = 0; i < nodes.length; i++) {
	            var current = nodes[i];
	            var existingUrl = current.getAttribute('data-view');
	            if (existingUrl == url) {
	                return current;
	            }
	        }
	    }
	    
	    function escape(str) {
	        return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
	    }
	
	    /**
	     * @class ViewLocatorModule
	     * @static
	     */
	    return {
	        /**
	         * Allows you to set up a convention for mapping module folders to view folders. It is a convenience method that customizes `convertModuleIdToViewId` and `translateViewIdToArea` under the covers.
	         * @method useConvention
	         * @param {string} [modulesPath] A string to match in the path and replace with the viewsPath. If not specified, the match is 'viewmodels'.
	         * @param {string} [viewsPath] The replacement for the modulesPath. If not specified, the replacement is 'views'.
	         * @param {string} [areasPath] Partial views are mapped to the "views" folder if not specified. Use this parameter to change their location.
	         */
	        useConvention: function(modulesPath, viewsPath, areasPath) {
	            modulesPath = modulesPath || 'viewmodels';
	            viewsPath = viewsPath || 'views';
	            areasPath = areasPath || viewsPath;
	
	            var reg = new RegExp(escape(modulesPath), 'gi');
	
	            this.convertModuleIdToViewId = function (moduleId) {
	                return moduleId.replace(reg, viewsPath);
	            };
	
	            this.translateViewIdToArea = function (viewId, area) {
	                if (!area || area == 'partial') {
	                    return areasPath + '/' + viewId;
	                }
	                
	                return areasPath + '/' + area + '/' + viewId;
	            };
	        },
	        /**
	         * Maps an object instance to a view instance.
	         * @method locateViewForObject
	         * @param {object} obj The object to locate the view for.
	         * @param {string} [area] The area to translate the view to.
	         * @param {DOMElement[]} [elementsToSearch] An existing set of elements to search first.
	         * @return {Promise} A promise of the view.
	         */
	        locateViewForObject: function(obj, area, elementsToSearch) {
	            var view;
	
	            if (obj.getView) {
	                view = obj.getView();
	                if (view) {
	                    return this.locateView(view, area, elementsToSearch);
	                }
	            }
	
	            if (obj.viewUrl) {
	                return this.locateView(obj.viewUrl, area, elementsToSearch);
	            }
	
	            var id = system.getModuleId(obj);
	            if (id) {
	                return this.locateView(this.convertModuleIdToViewId(id), area, elementsToSearch);
	            }
	
	            return this.locateView(this.determineFallbackViewId(obj), area, elementsToSearch);
	        },
	        /**
	         * Converts a module id into a view id. By default the ids are the same.
	         * @method convertModuleIdToViewId
	         * @param {string} moduleId The module id.
	         * @return {string} The view id.
	         */
	        convertModuleIdToViewId: function(moduleId) {
	            return moduleId;
	        },
	        /**
	         * If no view id can be determined, this function is called to genreate one. By default it attempts to determine the object's type and use that.
	         * @method determineFallbackViewId
	         * @param {object} obj The object to determine the fallback id for.
	         * @return {string} The view id.
	         */
	        determineFallbackViewId: function (obj) {
	            var funcNameRegex = /function (.{1,})\(/;
	            var results = (funcNameRegex).exec((obj).constructor.toString());
	            var typeName = (results && results.length > 1) ? results[1] : "";
	            typeName = typeName.trim();
	            return 'views/' + typeName;
	        },
	        /**
	         * Takes a view id and translates it into a particular area. By default, no translation occurs.
	         * @method translateViewIdToArea
	         * @param {string} viewId The view id.
	         * @param {string} area The area to translate the view to.
	         * @return {string} The translated view id.
	         */
	        translateViewIdToArea: function (viewId, area) {
	            return viewId;
	        },
	        /**
	         * Locates the specified view.
	         * @method locateView
	         * @param {string|DOMElement} viewOrUrlOrId A view, view url or view id to locate.
	         * @param {string} [area] The area to translate the view to.
	         * @param {DOMElement[]} [elementsToSearch] An existing set of elements to search first.
	         * @return {Promise} A promise of the view.
	         */
	        locateView: function(viewOrUrlOrId, area, elementsToSearch) {
	            if (typeof viewOrUrlOrId === 'string') {
	                var viewId;
	
	                if (viewEngine.isViewUrl(viewOrUrlOrId)) {
	                    viewId = viewEngine.convertViewUrlToViewId(viewOrUrlOrId);
	                } else {
	                    viewId = viewOrUrlOrId;
	                }
	
	                if (area) {
	                    viewId = this.translateViewIdToArea(viewId, area);
	                }
	
	                if (elementsToSearch) {
	                    var existing = findInElements(elementsToSearch, viewId);
	                    if (existing) {
	                        return system.defer(function(dfd) {
	                            dfd.resolve(existing);
	                        }).promise();
	                    }
	                }
	
	                return viewEngine.createView(viewId);
	            }
	
	            return system.defer(function(dfd) {
	                dfd.resolve(viewOrUrlOrId);
	            }).promise();
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./activator": 8,
		"./activator.js": 8,
		"./app": 9,
		"./app.js": 9,
		"./binder": 11,
		"./binder.js": 11,
		"./composition": 5,
		"./composition.js": 5,
		"./events": 12,
		"./events.js": 12,
		"./plugins/dialog": 10,
		"./plugins/dialog.js": 10,
		"./plugins/history": 16,
		"./plugins/history.js": 16,
		"./plugins/http": 18,
		"./plugins/http.js": 18,
		"./plugins/observable": 19,
		"./plugins/observable.js": 19,
		"./plugins/router": 6,
		"./plugins/router.js": 6,
		"./plugins/serializer": 20,
		"./plugins/serializer.js": 20,
		"./plugins/widget": 13,
		"./plugins/widget.js": 13,
		"./system": 1,
		"./system.js": 1,
		"./transitions/entrance": 21,
		"./transitions/entrance.js": 21,
		"./viewEngine": 7,
		"./viewEngine.js": 7,
		"./viewLocator": 14,
		"./viewLocator.js": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 15;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * This module is based on Backbone's core history support. It abstracts away the low level details of working with browser history and url changes in order to provide a solid foundation for a router.
	 * @module history
	 * @requires system
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (system, $) {
	    // Cached regex for stripping a leading hash/slash and trailing space.
	    var routeStripper = /^[#\/]|\s+$/g;
	
	    // Cached regex for stripping leading and trailing slashes.
	    var rootStripper = /^\/+|\/+$/g;
	
	    // Cached regex for detecting MSIE.
	    var isExplorer = /msie [\w.]+/;
	
	    // Cached regex for removing a trailing slash.
	    var trailingSlash = /\/$/;
	
	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    function updateHash(location, fragment, replace) {
	        if (replace) {
	            var href = location.href.replace(/(javascript:|#).*$/, '');
	
	            if (history.history.replaceState) {
	                history.history.replaceState({}, document.title, href + '#' + fragment); // using history.replaceState instead of location.replace to work around chrom bug
	            } else {
	                location.replace(href + '#' + fragment);
	            }
	        } else {
	            // Some browsers require that `hash` contains a leading #.
	            location.hash = '#' + fragment;
	        }
	    };
	
	    /**
	     * @class HistoryModule
	     * @static
	     */
	    var history = {
	        /**
	         * The setTimeout interval used when the browser does not support hash change events.
	         * @property {string} interval
	         * @default 50
	         */
	        interval: 50,
	        /**
	         * Indicates whether or not the history module is actively tracking history.
	         * @property {string} active
	         */
	        active: false
	    };
	    
	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	        history.location = window.location;
	        history.history = window.history;
	    }
	
	    /**
	     * Gets the true hash value. Cannot use location.hash directly due to a bug in Firefox where location.hash will always be decoded.
	     * @method getHash
	     * @param {string} [window] The optional window instance
	     * @return {string} The hash.
	     */
	    history.getHash = function(window) {
	        var match = (window || history).location.href.match(/#(.*)$/);
	        return match ? match[1] : '';
	    };
	    
	    /**
	     * Get the cross-browser normalized URL fragment, either from the URL, the hash, or the override.
	     * @method getFragment
	     * @param {string} fragment The fragment.
	     * @param {boolean} forcePushState Should we force push state?
	     * @return {string} he fragment.
	     */
	    history.getFragment = function(fragment, forcePushState) {
	        if (fragment == null) {
	            if (history._hasPushState || !history._wantsHashChange || forcePushState) {
	                fragment = history.location.pathname + history.location.search;
	                var root = history.root.replace(trailingSlash, '');
	                if (!fragment.indexOf(root)) {
	                    fragment = fragment.substr(root.length);
	                }
	            } else {
	                fragment = history.getHash();
	            }
	        }
	        
	        return fragment.replace(routeStripper, '');
	    };
	
	    /**
	     * Activate the hash change handling, returning `true` if the current URL matches an existing route, and `false` otherwise.
	     * @method activate
	     * @param {HistoryOptions} options.
	     * @return {boolean|undefined} Returns true/false from loading the url unless the silent option was selected.
	     */
	    history.activate = function(options) {
	        if (history.active) {
	            system.error("History has already been activated.");
	        }
	
	        history.active = true;
	
	        // Figure out the initial configuration. Do we need an iframe?
	        // Is pushState desired ... is it available?
	        history.options = system.extend({}, { root: '/' }, history.options, options);
	        history.root = history.options.root;
	        history._wantsHashChange = history.options.hashChange !== false;
	        history._wantsPushState = !!history.options.pushState;
	        history._hasPushState = !!(history.options.pushState && history.history && history.history.pushState);
	
	        var fragment = history.getFragment();
	        var docMode = document.documentMode;
	        var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
	
	        // Normalize root to always include a leading and trailing slash.
	        history.root = ('/' + history.root + '/').replace(rootStripper, '/');
	
	        if (oldIE && history._wantsHashChange) {
	            history.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
	            history.navigate(fragment, false);
	        }
	
	        // Depending on whether we're using pushState or hashes, and whether
	        // 'onhashchange' is supported, determine how we check the URL state.
	        if (history._hasPushState) {
	            $(window).on('popstate', history.checkUrl);
	        } else if (history._wantsHashChange && ('onhashchange' in window) && !oldIE) {
	            $(window).on('hashchange', history.checkUrl);
	        } else if (history._wantsHashChange) {
	            history._checkUrlInterval = setInterval(history.checkUrl, history.interval);
	        }
	
	        // Determine if we need to change the base url, for a pushState link
	        // opened by a non-pushState browser.
	        history.fragment = fragment;
	        var loc = history.location;
	        var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === history.root;
	
	        // Transition from hashChange to pushState or vice versa if both are requested.
	        if (history._wantsHashChange && history._wantsPushState) {
	            // If we've started off with a route from a `pushState`-enabled
	            // browser, but we're currently in a browser that doesn't support it...
	            if (!history._hasPushState && !atRoot) {
	                history.fragment = history.getFragment(null, true);
	                history.location.replace(history.root + history.location.search + '#' + history.fragment);
	                // Return immediately as browser will do redirect to new url
	                return true;
	
	            // Or if we've started out with a hash-based route, but we're currently
	            // in a browser where it could be `pushState`-based instead...
	            } else if (history._hasPushState && atRoot && loc.hash) {
	                this.fragment = history.getHash().replace(routeStripper, '');
	                this.history.replaceState({}, document.title, history.root + history.fragment + loc.search);
	            }
	        }
	
	        if (!history.options.silent) {
	            return history.loadUrl(options.startRoute);
	        }
	    };
	
	    /**
	     * Disable history, perhaps temporarily. Not useful in a real app, but possibly useful for unit testing Routers.
	     * @method deactivate
	     */
	    history.deactivate = function() {
	        $(window).off('popstate', history.checkUrl).off('hashchange', history.checkUrl);
	        clearInterval(history._checkUrlInterval);
	        history.active = false;
	    };
	
	    /**
	     * Checks the current URL to see if it has changed, and if it has, calls `loadUrl`, normalizing across the hidden iframe.
	     * @method checkUrl
	     * @return {boolean} Returns true/false from loading the url.
	     */
	    history.checkUrl = function() {
	        var current = history.getFragment();
	        if (current === history.fragment && history.iframe) {
	            current = history.getFragment(history.getHash(history.iframe));
	        }
	
	        if (current === history.fragment) {
	            return false;
	        }
	
	        if (history.iframe) {
	            history.navigate(current, false);
	        }
	        
	        history.loadUrl();
	    };
	    
	    /**
	     * Attempts to load the current URL fragment. A pass-through to options.routeHandler.
	     * @method loadUrl
	     * @return {boolean} Returns true/false from the route handler.
	     */
	    history.loadUrl = function(fragmentOverride) {
	        var fragment = history.fragment = history.getFragment(fragmentOverride);
	
	        return history.options.routeHandler ?
	            history.options.routeHandler(fragment) :
	            false;
	    };
	
	    /**
	     * Save a fragment into the hash history, or replace the URL state if the
	     * 'replace' option is passed. You are responsible for properly URL-encoding
	     * the fragment in advance.
	     * The options object can contain `trigger: false` if you wish to not have the
	     * route callback be fired, or `replace: true`, if
	     * you wish to modify the current URL without adding an entry to the history.
	     * @method navigate
	     * @param {string} fragment The url fragment to navigate to.
	     * @param {object|boolean} options An options object with optional trigger and replace flags. You can also pass a boolean directly to set the trigger option. Trigger is `true` by default.
	     * @return {boolean} Returns true/false from loading the url.
	     */
	    history.navigate = function(fragment, options) {
	        if (!history.active) {
	            return false;
	        }
	
	        if(options === undefined) {
	            options = {
	                trigger: true
	            };
	        }else if(system.isBoolean(options)) {
	            options = {
	                trigger: options
	            };
	        }
	
	        fragment = history.getFragment(fragment || '');
	
	        if (history.fragment === fragment) {
	            return;
	        }
	
	        history.fragment = fragment;
	
	        var url = history.root + fragment;
	
	        // Don't include a trailing slash on the root.
	        if(fragment === '' && url !== '/') {
	            url = url.slice(0, -1);
	        }
	
	        // If pushState is available, we use it to set the fragment as a real URL.
	        if (history._hasPushState) {
	            history.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
	
	            // If hash changes haven't been explicitly disabled, update the hash
	            // fragment to store history.
	        } else if (history._wantsHashChange) {
	            updateHash(history.location, fragment, options.replace);
	            
	            if (history.iframe && (fragment !== history.getFragment(history.getHash(history.iframe)))) {
	                // Opening and closing the iframe tricks IE7 and earlier to push a
	                // history entry on hash-tag change.  When replace is true, we don't
	                // want history.
	                if (!options.replace) {
	                    history.iframe.document.open().close();
	                }
	                
	                updateHash(history.iframe.location, fragment, options.replace);
	            }
	
	            // If you've told us that you explicitly don't want fallback hashchange-
	            // based history, then `navigate` becomes a page refresh.
	        } else {
	            return history.location.assign(url);
	        }
	
	        if (options.trigger) {
	            return history.loadUrl(fragment);
	        }
	    };
	
	    /**
	     * Navigates back in the browser history.
	     * @method navigateBack
	     */
	    history.navigateBack = function() {
	        history.history.back();
	    };
	
	    /**
	     * @class HistoryOptions
	     * @static
	     */
	
	    /**
	     * The function that will be called back when the fragment changes.
	     * @property {function} routeHandler
	     */
	
	    /**
	     * The url root used to extract the fragment when using push state.
	     * @property {string} root
	     */
	
	    /**
	     * Use hash change when present.
	     * @property {boolean} hashChange
	     * @default true
	     */
	
	    /**
	     * Use push state when present.
	     * @property {boolean} pushState
	     * @default false
	     */
	
	    /**
	     * Prevents loading of the current url when activating history.
	     * @property {boolean} silent
	     * @default false
	     */
	
	    return history;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// Note the capitalisation here for widget names. We do this so can 
	// easily distinguish between normal binding handlers and widgets.
	module.exports = {
		Alert: __webpack_require__(39)
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Enables common http request scenarios.
	 * @module http
	 * @requires jquery
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, ko) {
	    /**
	     * @class HTTPModule
	     * @static
	     */
	    return {
	        /**
	         * The name of the callback parameter to inject into jsonp requests by default.
	         * @property {string} callbackParam
	         * @default callback
	         */
	        callbackParam: 'callback',
	        /**
	         * Converts the data to JSON.
	         * @method toJSON
	         * @param {object} data The data to convert to JSON.
	         * @return {string} JSON.
	         */
	        toJSON: function(data) {
	            return ko.toJSON(data);
	        },
	        /**
	         * Makes an HTTP GET request.
	         * @method get
	         * @param {string} url The url to send the get request to.
	         * @param {object} [query] An optional key/value object to transform into query string parameters.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the get response data.
	         */
	        get: function (url, query, headers) {
	            return $.ajax(url, { data: query, headers: ko.toJS(headers) });
	        },
	        /**
	         * Makes an JSONP request.
	         * @method jsonp
	         * @param {string} url The url to send the get request to.
	         * @param {object} [query] An optional key/value object to transform into query string parameters.
	         * @param {string} [callbackParam] The name of the callback parameter the api expects (overrides the default callbackParam).
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the response data.
	         */
	        jsonp: function (url, query, callbackParam, headers) {
	            if (url.indexOf('=?') == -1) {
	                callbackParam = callbackParam || this.callbackParam;
	
	                if (url.indexOf('?') == -1) {
	                    url += '?';
	                } else {
	                    url += '&';
	                }
	
	                url += callbackParam + '=?';
	            }
	
	            return $.ajax({
	                url: url,
	                dataType: 'jsonp',
	                data: query,
	                headers: ko.toJS(headers)
	            });
	        },
	        /**
	         * Makes an HTTP PUT request.
	         * @method put
	         * @param {string} url The url to send the put request to.
	         * @param {object} data The data to put. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the response data.
	         */
	        put:function(url, data, headers) {
	            return $.ajax({
	                url: url,
	                data: this.toJSON(data),
	                type: 'PUT',
	                contentType: 'application/json',
	                dataType: 'json',
	                headers: ko.toJS(headers)
	            });
	        },
	        /**
	         * Makes an HTTP POST request.
	         * @method post
	         * @param {string} url The url to send the post request to.
	         * @param {object} data The data to post. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the response data.
	         */
	        post: function (url, data, headers) {
	            return $.ajax({
	                url: url,
	                data: this.toJSON(data),
	                type: 'POST',
	                contentType: 'application/json',
	                dataType: 'json',
	                headers: ko.toJS(headers)
	            });
	        },
	        /**
	         * Makes an HTTP DELETE request.
	         * @method remove
	         * @param {string} url The url to send the delete request to.
	         * @param {object} [query] An optional key/value object to transform into query string parameters.
	         * @param {object} [headers] The data to add to the request header.  It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
	         * @return {Promise} A promise of the get response data.
	         */
	        remove:function(url, query, headers) {
	            return $.ajax({
	                url: url,
	                data: query,
	                type: 'DELETE',
	                headers: ko.toJS(headers)
	            });
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Enables automatic observability of plain javascript object for ES5 compatible browsers. Also, converts promise properties into observables that are updated when the promise resolves.
	 * @module observable
	 * @requires system
	 * @requires binder
	 * @requires knockout
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, binder, ko) {
	    var observableModule,
	        toString = Object.prototype.toString,
	        nonObservableTypes = ['[object Function]', '[object String]', '[object Boolean]', '[object Number]', '[object Date]', '[object RegExp]'],
	        observableArrayMethods = ['remove', 'removeAll', 'destroy', 'destroyAll', 'replace'],
	        arrayMethods = ['pop', 'reverse', 'sort', 'shift', 'slice'],
	        additiveArrayFunctions = ['push', 'unshift'],
	        es5Functions = ['filter', 'map', 'reduce', 'reduceRight', 'forEach', 'every', 'some'],
	        arrayProto = Array.prototype,
	        observableArrayFunctions = ko.observableArray.fn,
	        logConversion = false,
	        changeDetectionMethod = undefined,
	        skipPromises = false,
	        shouldIgnorePropertyName;
	
	    /**
	     * You can call observable(obj, propertyName) to get the observable function for the specified property on the object.
	     * @class ObservableModule
	     */
	
	    if (!('getPropertyDescriptor' in Object)) {
	        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	        var getPrototypeOf = Object.getPrototypeOf;
	
	        Object['getPropertyDescriptor'] = function(o, name) {
	            var proto = o, descriptor;
	
	            while(proto && !(descriptor = getOwnPropertyDescriptor(proto, name))) {
	                proto = getPrototypeOf(proto);
	            }
	
	            return descriptor;
	        };
	    }
	
	    function defaultShouldIgnorePropertyName(propertyName){
	        var first = propertyName[0];
	        return first === '_' || first === '$' || (changeDetectionMethod && propertyName === changeDetectionMethod);
	    }
	
	    function isNode(obj) {
	        return !!(obj && obj.nodeType !== undefined && system.isNumber(obj.nodeType));
	    }
	
	    function canConvertType(value) {
	        if (!value || isNode(value) || value.ko === ko || value.jquery) {
	            return false;
	        }
	
	        var type = toString.call(value);
	
	        return nonObservableTypes.indexOf(type) == -1 && !(value === true || value === false);
	    }
	
	    function createLookup(obj) {
	        var value = {};
	
	        Object.defineProperty(obj, "__observable__", {
	            enumerable: false,
	            configurable: false,
	            writable: false,
	            value: value
	        });
	
	        return value;
	    }
	
	    function makeObservableArray(original, observable, hasChanged) {
	        var lookup = original.__observable__, notify = true;
	
	        if(lookup && lookup.__full__){
	            return;
	        }
	
	        lookup = lookup || createLookup(original);
	        lookup.__full__ = true;
	
	        es5Functions.forEach(function (methodName) {
	            observable[methodName] = function () {
	                return arrayProto[methodName].apply(original, arguments);
	            };
	        });
	
	        observableArrayMethods.forEach(function(methodName) {
	            original[methodName] = function() {
	                notify = false;
	                var methodCallResult = observableArrayFunctions[methodName].apply(observable, arguments);
	                notify = true;
	                return methodCallResult;
	            };
	        });
	
	        arrayMethods.forEach(function(methodName) {
	            original[methodName] = function() {
	                if(notify){
	                    observable.valueWillMutate();
	                }
	
	                var methodCallResult = arrayProto[methodName].apply(original, arguments);
	
	                if(notify){
	                    observable.valueHasMutated();
	                }
	
	                return methodCallResult;
	            };
	        });
	
	        additiveArrayFunctions.forEach(function(methodName){
	            original[methodName] = function() {
	                for (var i = 0, len = arguments.length; i < len; i++) {
	                    convertObject(arguments[i], hasChanged);
	                }
	
	                if(notify){
	                    observable.valueWillMutate();
	                }
	
	                var methodCallResult = arrayProto[methodName].apply(original, arguments);
	
	                if(notify){
	                    observable.valueHasMutated();
	                }
	
	                return methodCallResult;
	            };
	        });
	
	        original['splice'] = function() {
	            for (var i = 2, len = arguments.length; i < len; i++) {
	                convertObject(arguments[i], hasChanged);
	            }
	
	            if(notify){
	                observable.valueWillMutate();
	            }
	
	            var methodCallResult = arrayProto['splice'].apply(original, arguments);
	
	            if(notify){
	                observable.valueHasMutated();
	            }
	
	            return methodCallResult;
	        };
	
	        for (var i = 0, len = original.length; i < len; i++) {
	            convertObject(original[i], hasChanged);
	        }
	    }
	
	    /**
	     * Converts an entire object into an observable object by re-writing its attributes using ES5 getters and setters. Attributes beginning with '_' or '$' are ignored.
	     * @method convertObject
	     * @param {object} obj The target object to convert.
	     */
	    function convertObject(obj, hasChanged) {
	        var lookup, value;
	
	        if (changeDetectionMethod) {
	            if(obj && obj[changeDetectionMethod]) {
	                if (hasChanged) {
	                    hasChanged = hasChanged.slice(0);
	                } else {
	                    hasChanged = [];
	                }
	                hasChanged.push(obj[changeDetectionMethod]);
	            }
	        }
	
	        if(!canConvertType(obj)){
	            return;
	        }
	
	        lookup = obj.__observable__;
	
	        if(lookup && lookup.__full__){
	            return;
	        }
	
	        lookup = lookup || createLookup(obj);
	        lookup.__full__ = true;
	
	        if (system.isArray(obj)) {
	            var observable = ko.observableArray(obj);
	            makeObservableArray(obj, observable, hasChanged);
	        } else {
	            for (var propertyName in obj) {
	                if(shouldIgnorePropertyName(propertyName)){
	                    continue;
	                }
	
	                if (!lookup[propertyName]) {
	                    var descriptor = Object.getPropertyDescriptor(obj, propertyName);
	                    if (descriptor && (descriptor.get || descriptor.set)) {
	                        defineProperty(obj, propertyName, {
	                            get:descriptor.get,
	                            set:descriptor.set
	                        });
	                    } else {
	                        value = obj[propertyName];
	
	                        if(!system.isFunction(value)) {
	                            convertProperty(obj, propertyName, value, hasChanged);
	                        }
	                    }
	                }
	            }
	        }
	
	        if(logConversion) {
	            system.log('Converted', obj);
	        }
	    }
	
	    function innerSetter(observable, newValue, isArray) {
	        //if this was originally an observableArray, then always check to see if we need to add/replace the array methods (if newValue was an entirely new array)
	        if (isArray) {
	            if (!newValue) {
	                //don't allow null, force to an empty array
	                newValue = [];
	                makeObservableArray(newValue, observable);
	            }
	            else if (!newValue.destroyAll) {
	                makeObservableArray(newValue, observable);
	            }
	        } else {
	            convertObject(newValue);
	        }
	
	        //call the update to the observable after the array as been updated.
	        observable(newValue);
	    }
	
	    /**
	     * Converts a normal property into an observable property using ES5 getters and setters.
	     * @method convertProperty
	     * @param {object} obj The target object on which the property to convert lives.
	     * @param {string} propertyName The name of the property to convert.
	     * @param {object} [original] The original value of the property. If not specified, it will be retrieved from the object.
	     * @return {KnockoutObservable} The underlying observable.
	     */
	    function convertProperty(obj, propertyName, original, hasChanged) {
	        var observable,
	            isArray,
	            lookup = obj.__observable__ || createLookup(obj);
	
	        if(original === undefined){
	            original = obj[propertyName];
	        }
	
	        if (system.isArray(original)) {
	            observable = ko.observableArray(original);
	            makeObservableArray(original, observable, hasChanged);
	            isArray = true;
	        } else if (typeof original == "function") {
	            if(ko.isObservable(original)){
	                observable = original;
	            }else{
	                return null;
	            }
	        } else if(!skipPromises && system.isPromise(original)) {
	            observable = ko.observable();
	
	            original.then(function (result) {
	                if(system.isArray(result)) {
	                    var oa = ko.observableArray(result);
	                    makeObservableArray(result, oa, hasChanged);
	                    result = oa;
	                }
	
	                observable(result);
	            });
	        } else {
	            observable = ko.observable(original);
	            convertObject(original, hasChanged);
	        }
	
	        if (hasChanged && hasChanged.length > 0) {
	            hasChanged.forEach(function (func) {
	                if (system.isArray(original)) {
	                    observable.subscribe(function (arrayChanges) {
	                        func(obj, propertyName, null, arrayChanges);
	                    }, null, "arrayChange");
	                } else {
	                    observable.subscribe(function (newValue) {
	                        func(obj, propertyName, newValue, null);
	                    });
	                }
	            });
	        }
	
	        Object.defineProperty(obj, propertyName, {
	            configurable: true,
	            enumerable: true,
	            get: observable,
	            set: ko.isWriteableObservable(observable) ? (function (newValue) {
	                if (newValue && system.isPromise(newValue) && !skipPromises) {
	                    newValue.then(function (result) {
	                        innerSetter(observable, result, system.isArray(result));
	                    });
	                } else {
	                    innerSetter(observable, newValue, isArray);
	                }
	            }) : undefined
	        });
	
	        lookup[propertyName] = observable;
	        return observable;
	    }
	
	    /**
	     * Defines a computed property using ES5 getters and setters.
	     * @method defineProperty
	     * @param {object} obj The target object on which to create the property.
	     * @param {string} propertyName The name of the property to define.
	     * @param {function|object} evaluatorOrOptions The Knockout computed function or computed options object.
	     * @return {KnockoutObservable} The underlying computed observable.
	     */
	    function defineProperty(obj, propertyName, evaluatorOrOptions) {
	        var computedOptions = { owner: obj, deferEvaluation: true },
	            computed;
	
	        if (typeof evaluatorOrOptions === 'function') {
	            computedOptions.read = evaluatorOrOptions;
	        } else {
	            if ('value' in evaluatorOrOptions) {
	                system.error('For defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');
	            }
	
	            if (typeof evaluatorOrOptions.get !== 'function' && typeof evaluatorOrOptions.read !== 'function') {
	                system.error('For defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');
	            }
	
	            computedOptions.read = evaluatorOrOptions.get || evaluatorOrOptions.read;
	            computedOptions.write = evaluatorOrOptions.set || evaluatorOrOptions.write;
	        }
	
	        computed = ko.computed(computedOptions);
	
	        Object.defineProperty(obj, propertyName, {
	            configurable: true,
	            enumerable: true,
	            value: computed
	        });
	
	        return convertProperty(obj, propertyName, computed);
	    }
	
	    observableModule = function(obj, propertyName){
	        var lookup, observable, value;
	
	        if (!obj) {
	            return null;
	        }
	
	        lookup = obj.__observable__;
	        if(lookup){
	            observable = lookup[propertyName];
	            if(observable){
	                return observable;
	            }
	        }
	
	        value = obj[propertyName];
	
	        if(ko.isObservable(value)){
	            return value;
	        }
	
	        return convertProperty(obj, propertyName, value);
	    };
	
	    observableModule.defineProperty = defineProperty;
	    observableModule.convertProperty = convertProperty;
	    observableModule.convertObject = convertObject;
	
	    /**
	     * Installs the plugin into the view model binder's `beforeBind` hook so that objects are automatically converted before being bound.
	     * @method install
	     */
	    observableModule.install = function(options) {
	        var original = binder.binding;
	
	        binder.binding = function(obj, view, instruction) {
	            if(instruction.applyBindings && !instruction.skipConversion){
	                convertObject(obj);
	            }
	
	            original(obj, view);
	        };
	
	        logConversion = options.logConversion;
	        if (options.changeDetection) {
	            changeDetectionMethod = options.changeDetection;
	        }
	
	        skipPromises = options.skipPromises;
	        shouldIgnorePropertyName = options.shouldIgnorePropertyName || defaultShouldIgnorePropertyName;
	    };
	
	    return observableModule;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * Serializes and deserializes data to/from JSON.
	 * @module serializer
	 * @requires system
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system) {
	    /**
	     * @class SerializerModule
	     * @static
	     */
	    return {
	        /**
	         * The name of the attribute that the serializer should use to identify an object's type.
	         * @property {string} typeAttribute
	         * @default type
	         */
	        typeAttribute: 'type',
	        /**
	         * The amount of space to use for indentation when writing out JSON.
	         * @property {string|number} space
	         * @default undefined
	         */
	        space:undefined,
	        /**
	         * The default replacer function used during serialization. By default properties starting with '_' or '$' are removed from the serialized object.
	         * @method replacer
	         * @param {string} key The object key to check.
	         * @param {object} value The object value to check.
	         * @return {object} The value to serialize.
	         */
	        replacer: function(key, value) {
	            if(key){
	                var first = key[0];
	                if(first === '_' || first === '$'){
	                    return undefined;
	                }
	            }
	
	            return value;
	        },
	        /**
	         * Serializes the object.
	         * @method serialize
	         * @param {object} object The object to serialize.
	         * @param {object} [settings] Settings can specify a replacer or space to override the serializer defaults.
	         * @return {string} The JSON string.
	         */
	        serialize: function(object, settings) {
	            settings = (settings === undefined) ? {} : settings;
	
	            if(system.isString(settings) || system.isNumber(settings)) {
	                settings = { space: settings };
	            }
	
	            return JSON.stringify(object, settings.replacer || this.replacer, settings.space || this.space);
	        },
	        /**
	         * Gets the type id for an object instance, using the configured `typeAttribute`.
	         * @method getTypeId
	         * @param {object} object The object to serialize.
	         * @return {string} The type.
	         */
	        getTypeId: function(object) {
	            if (object) {
	                return object[this.typeAttribute];
	            }
	
	            return undefined;
	        },
	        /**
	         * Maps type ids to object constructor functions. Keys are type ids and values are functions.
	         * @property {object} typeMap.
	         */
	        typeMap: {},
	        /**
	         * Adds a type id/constructor function mampping to the `typeMap`.
	         * @method registerType
	         * @param {string} typeId The type id.
	         * @param {function} constructor The constructor.
	         */
	        registerType: function() {
	            var first = arguments[0];
	
	            if (arguments.length == 1) {
	                var id = first[this.typeAttribute] || system.getModuleId(first);
	                this.typeMap[id] = first;
	            } else {
	                this.typeMap[first] = arguments[1];
	            }
	        },
	        /**
	         * The default reviver function used during deserialization. By default is detects type properties on objects and uses them to re-construct the correct object using the provided constructor mapping.
	         * @method reviver
	         * @param {string} key The attribute key.
	         * @param {object} value The object value associated with the key.
	         * @param {function} getTypeId A custom function used to get the type id from a value.
	         * @param {object} getConstructor A custom function used to get the constructor function associated with a type id.
	         * @return {object} The value.
	         */
	        reviver: function(key, value, getTypeId, getConstructor) {
	            var typeId = getTypeId(value);
	            if (typeId) {
	                var ctor = getConstructor(typeId);
	                if (ctor) {
	                    if (ctor.fromJSON) {
	                        return ctor.fromJSON(value);
	                    }
	
	                    return new ctor(value);
	                }
	            }
	
	            return value;
	        },
	        /**
	         * Deserialize the JSON.
	         * @method deserialize
	         * @param {string} text The JSON string.
	         * @param {object} [settings] Settings can specify a reviver, getTypeId function or getConstructor function.
	         * @return {object} The deserialized object.
	         */
	        deserialize: function(text, settings) {
	            var that = this;
	            settings = settings || {};
	
	            var getTypeId = settings.getTypeId || function(object) { return that.getTypeId(object); };
	            var getConstructor = settings.getConstructor || function(id) { return that.typeMap[id]; };
	            var reviver = settings.reviver || function(key, value) { return that.reviver(key, value, getTypeId, getConstructor); };
	
	            return JSON.parse(text, reviver);
	        },
	        /**
	         * Clone the object.
	         * @method clone
	         * @param {object} obj The object to clone.
	         * @param {object} [settings] Settings can specify any of the options allowed by the serialize or deserialize methods.
	         * @return {object} The new clone.
	         */
	        clone:function(obj, settings) {
	            return this.deserialize(this.serialize(obj, settings), settings);
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Durandal 2.2.0 Copyright (c) 2010-2016 Blue Spire Consulting, Inc. All Rights Reserved.
	 * Available via the MIT license.
	 * see: http://durandaljs.com or https://github.com/BlueSpire/Durandal for details.
	 */
	/**
	 * The entrance transition module.
	 * @module entrance
	 * @requires system
	 * @requires composition
	 * @requires jquery
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(system, composition, $) {
	    var fadeOutDuration = 100;
	    var endValues = {
	        left: '0px',
	        opacity: 1
	    };
	    var clearValues = {
	        left: '',
	        top: '',
	        right: '',
	        bottom:'',
	        position:'',
	        opacity: ''
	    };
	
	    var isIE = navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/MSIE/);
	
	    var animation = false,
	        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
	        elm = document.createElement('div');
	
	    if(elm.style.animationName !== undefined) {
	        animation = true;
	    }
	
	    if(!animation) {
	        for(var i = 0; i < domPrefixes.length; i++) {
	            if(elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
	                animation = true;
	                break;
	            }
	        }
	    }
	
	    if(animation) {
	        if(isIE){
	            system.log('Using CSS3/jQuery mixed animations.');
	        }else{
	            system.log('Using CSS3 animations.');
	        }
	    } else {
	        system.log('Using jQuery animations.');
	    }
	
	    function removeAnimationClasses(ele, fadeOnly){
	        ele.classList.remove(fadeOnly ? 'entrance-in-fade' : 'entrance-in');
	        ele.classList.remove('entrance-out');
	    }
	
	    /**
	     * @class EntranceModule
	     * @constructor
	     */
	    var entrance = function(context) {
	        return system.defer(function(dfd) {
	            function endTransition() {
	                dfd.resolve();
	            }
	
	            function scrollIfNeeded() {
	                if (!context.keepScrollPosition) {
	                    $(document).scrollTop(0);
	                }
	            }
	
	            if (!context.child) {
	                $(context.activeView).fadeOut(fadeOutDuration, endTransition);
	            } else {
	                var duration = context.duration || 500;
	                var $child = $(context.child);
	                var fadeOnly = !!context.fadeOnly;
	                var startValues = {
	                    display: 'block',
	                    opacity: 0,
	                    position: 'absolute',
	                    left: fadeOnly || animation ? '0px' : '20px',
	                    right: 0,
	                    top: 0,
	                    bottom: 0
	                };
	
	                function startTransition() {
	                    scrollIfNeeded();
	                    context.triggerAttach();
	
	                    if (animation) {
	                        removeAnimationClasses(context.child, fadeOnly);
	                        context.child.classList.add(fadeOnly ? 'entrance-in-fade' : 'entrance-in');
	                        setTimeout(function () {
	                            removeAnimationClasses(context.child, fadeOnly);
	                            if(context.activeView){
	                                removeAnimationClasses(context.activeView, fadeOnly);
	                            }
	                            $child.css(clearValues);
	                            endTransition();
	                        }, duration);
	                    } else {
	                        $child.animate(endValues, {
	                            duration: duration,
	                            easing: 'swing',
	                            always: function() {
	                                $child.css(clearValues);
	                                endTransition();
	                            }
	                        });
	                    }
	                }
	
	                $child.css(startValues);
	
	                if(context.activeView) {
	                    if (animation && !isIE) {
	                        removeAnimationClasses(context.activeView, fadeOnly);
	                        context.activeView.classList.add('entrance-out');
	                        setTimeout(startTransition, fadeOutDuration);
	                    } else {
	                        $(context.activeView).fadeOut({ duration: fadeOutDuration, always: startTransition });
	                    }
	                } else {
	                    startTransition();
	                }
	            }
	        }).promise();
	    };
	
	    return entrance;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var app = __webpack_require__(9);
	var system = __webpack_require__(1);
	var widget = __webpack_require__(13);
	
	// Durandal core overrides - Required for Webpack
	__webpack_require__(25);
	__webpack_require__(24);
	__webpack_require__(26);
	__webpack_require__(27);
	
	// Webpack sets this __DEV__ variable. See `webpack.config.js` file
	if(true) {
		system.debug(true);
	
		window.ko = ko;
		window.app = app;
		window.router = router;
	}
	
	// Install the router
	var router = __webpack_require__(6);
	router.install({});
	
	
	// Install widgets
	var widgets = __webpack_require__(17);
	widget.install({
		kinds: Object.keys(widgets)
	});
	
	// Start the appliction
	app.start().then(function () {
		// Set the title
		app.title = 'Durandal + Webpack';
	
		// Show the app by setting the root view model for our application with a transition.
		var shell = __webpack_require__(29);
		return app.setRoot(shell);
	});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);
	var composition = __webpack_require__(5);
	
	var compose = composition.compose;
	composition.compose = function(element, settings) {
		// If the `model` isn't a `moduleId` string, assume it's the module
		// itself and resolve it using the `system` module
		if('string' !== typeof settings.model) {
			settings.model = system.resolveObject(settings.model);
		}
	
		// super()
		return compose.apply(this, arguments);
	};
	


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);
	
	var acquire = system.acquire;
	system.acquire = function(moduleIdOrModule) {
		var isModule = typeof moduleIdOrModule !== 'string' && !(moduleIdOrModule instanceof Array);
		if(isModule) {
			return system.defer(function(dfd) {
				// If the moduleId is a function...
				if(moduleIdOrModule instanceof Function) {
					// Execute the function, passing a callback that should be 
					// called when the (possibly) async operation is finished
					var result = moduleIdOrModule(function(err, module) {
						if(err) { dfd.reject(err); }
						dfd.resolve(module);
					});
	
					// Also allow shorthand `return` from the funcction, which 
					// resolves the Promise with whatever was immediately returned
					if(result !== undefined) {
						dfd.resolve(result);
					}
				}
	
				// If the moduleId is actually an object, simply resolve with it
				else {
					dfd.resolve(moduleIdOrModule);
				}
			});
		}
	
		// super()
		return acquire.apply(this, arguments);
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);
	var system = __webpack_require__(1);
	var viewLocator = __webpack_require__(14);
	
	// Allow using `function` or bare HTML string as a view
	var locateView = viewLocator.locateView;
	viewLocator.locateView = function(viewOrUrlOrId, area) {
		var viewId;
	
		// HTML here will be passed into `processMarkup`
		if('string' === typeof viewOrUrlOrId && $.trim(viewOrUrlOrId).charAt(0) === '<') {
			return system.defer(function(dfd) {
				dfd.resolve(viewOrUrlOrId);
			});
		}
	
		// super()
		return locateView.apply(this, arguments);
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var widget = __webpack_require__(13);
	
	// Import the widgets index module, which should export an object
	// whose keys are the names of the Widgets to register and the
	// values the Widget modules
	var widgets = __webpack_require__(17);
	
	// Widgets usually require a `moduleId` to resolve. We'll override this so
	// we return the ViewModel class directly, by looking it up in the `widgets/index`
	// file by key. 
	widget.convertKindToModulePath = function(name) {
		var widget = widgets[ name ];
		if(!widget) {
			console.error('Missing or invalid widget requested: ' + name);
		}
		
		return widget;
	};
	
	// By default, Durandal will attempt to retrieve the view for a widget using
	// the `mapKindToViewId` and pass it along to the `composition` engine. We'll
	// do away with this, and force it to use the notmal `getView` method instead.
	widget.mapKindToViewId = function() { };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);
	
	module.exports = [
		// Here we define our routes as usual, but with one important distinction.
		// Our `moduleId` is no longer a string that points to the module, but rather 
		// the module itself, as an inline, static dependency. This will bundle the
		// modules into your main app, but still work as expected in Durandal!
		{
			route: '', 
			title: 'About',
			moduleId: function() {
				return __webpack_require__(30);
			},
			nav: true
		},
	
		// An async route, which lets us define certain "Code Splitting" points
		// which shouldn't be distributed in the main app.js file, but bundled
		// alongside it to be fetched once the user actually goes to this route
		//
		// Check the Network tab when navigating to this page, you'll see it load
		// asynchronously, just like your old Require.js setup.
		{
			route: 'router*details',
			hash: '#router',
			title: 'Router',
			moduleId: function(cb) {
				__webpack_require__.e/* require */(1, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(34)]; (function(module) {
					cb(null, module);
				}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)(module)))});
			},
			nav: true
		},
	
		{
			route: 'dialogs',
			title: 'Dialogs',
			moduleId: function() {
				return __webpack_require__(31);
			},
			nav: true
		},
		
		{
			route: 'widgets',
			title: 'Widgets',
			moduleId: function() {
				return __webpack_require__(38);
			},
			nav: true
		}
	];


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var router = __webpack_require__(6);
	var ViewModel = __webpack_require__(4);
	
	var Shell = new ViewModel({
		view: __webpack_require__(40)
	});
	
	Shell.router = router.map(
		__webpack_require__(28)
	)
	.buildNavigationModel();
	
	Shell.activate = function() {
		return router.activate();
	};
	
	module.exports = Shell;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var ViewModel = __webpack_require__(4);
	
	var Home = new ViewModel({
		view: __webpack_require__(41)
	});
	
	module.exports = Home;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var system = __webpack_require__(1);
	var dialog = __webpack_require__(10);
	var ViewModel = __webpack_require__(4);
	
	var Dialogs = new ViewModel({
		view: __webpack_require__(42)
	});
	
	Dialogs.alert = function() {
		return dialog.showMessage('Sample alert message', 'Alert!');
	};
	
	Dialogs.confirm = function() {
		return dialog.showMessage('Sample confirmation dialog', 'Confirm', ['OK', 'Cancel']);
	};
	
	Dialogs.prompt = function() {
		var Dialog = __webpack_require__(33);
	
		return dialog.show( new Dialog(), [
			'Enter some text'
		])
	
		.then(function(result) {
			console.info('User entered: ', result);
		});
	};
	
	Dialogs.hello = function() {
		return system.defer(function(dfd) {
			__webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(32)]; (dfd.resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
		})
	
		.then(function(Dialog) {
			return dialog.show( new Dialog(), [
				'Enter some text'
			]);
		})
	
		.then(function(result) {
			console.info('User entered: ', result);
		});
	};
	
	module.exports = Dialogs;


/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var dialog = __webpack_require__(10);
	var ViewModel = __webpack_require__(4);
	
	function Prompt() {
		this.message = ko.observable('');
		this.text = ko.observable('');
		this.title = ko.observable('');
		this.canClose = ko.observable(true);
	};
	
	Prompt.prototype.view = __webpack_require__(44);
	
	Prompt.prototype.getView = ViewModel.prototype.getView;
	
	Prompt.prototype.activate = function(message, initialText, canClose) {
		this.message(message);
		this.text(initialText);
		this.canClose(canClose !== false);
	};
	
	Prompt.prototype.selectOption = function(result) { 
		if(result === true) {
			result = this.text();
		}
	
		return dialog.close(this, result);
	};
	
	Prompt.prototype.close = function() {
		return dialog.close(this, null);
	};
	
	module.exports = Prompt;

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var ViewModel = __webpack_require__(4);
	
	var Widgets = new ViewModel({
		view: __webpack_require__(48)
	});
	
	module.exports = Widgets;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var ko = __webpack_require__(2);
	var ViewModel = __webpack_require__(4);
	
	var Alert = function() {
		this.variant = ko.observable('');
		this.text = ko.observable('');
		this.title = ko.observable('');
		this.canClose = ko.observable(true);
	
		this.className = ko.pureComputed(function() {
			var classes = [
				'alert-' + this.variant()
			];
	
			if(this.canClose()) {
				classes.push('alert-dismissable');
			}
	
			return classes.join(' ');
		},
		this);
	};
	
	Alert.prototype.view = __webpack_require__(49);
	
	Alert.prototype.getView = ViewModel.prototype.getView;
	
	Alert.prototype.activate = function(settings) {
		this.variant(settings.variant || 'danger');
		this.text(settings.text);
		this.title(settings.title);
		this.canClose(settings.canClose !== false);
	};
	
	module.exports = Alert;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	module.exports = "<main id=\"shell\">\n\t<div class=\"navbar navbar-default\">\n\t\t<div class=\"container-fluid\">\n\t\t\t<div class=\"navbar-header\">\n\t\t\t\t<a class=\"navbar-brand\" data-bind=\"attr: { href: router.navigationModel()[0].hash }\">\n\t\t\t\t\t<i class=\"icon-home\"></i>\n\t\t\t\t\t<span>Durandal + Webpack</span>\n\t\t\t\t</a>\n\t\t\t</div>\n\n\t\t\t<ul class=\"nav navbar-nav\" data-bind=\"foreach: router.navigationModel\">\n\t\t\t\t<li data-bind=\"css: { active: isActive }\">\n\t\t\t\t\t<a data-bind=\"attr: { href: hash }, html: title\"></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t<li>\n\t\t\t\t\t<a href=\"http://blog.craigsworks.com/durandal-and-webpack-introduction\" title=\"Read the Guide\" target=\"_blank\">\n\t\t\t\t\t\t<span class=\"fa fa-book\"></span>\n\t\t\t\t\t\t<span class=\"visible-xs-inline\">Read the Guide</span>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<a href=\"http://github.com/Craga89/durandal-webpack\" title=\"Read the Guide\" target=\"_blank\">\n\t\t\t\t\t\t<span class=\"fa fa-github\"></span>\n\t\t\t\t\t\t<span class=\"visible-xs-inline\">View the Source</span>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<div class=\"loader navbar-right\" data-bind=\"css: { active: router.isNavigating }\">\n\t\t\t\t<i class=\"icon-spinner icon-2x icon-spin\"></i>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div id=\"page\" class=\"container\" data-bind=\"router: {}\"></div>\n</main>";

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	module.exports = "<section id=\"about\">\n\t<header><h3>What is this?</h3></header>\n\t<p>\n\t\tThis is a sample project that demonstrates the use of Webpack with Durandal together to bundle your SPA.\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Why would I use it?</h4></header>\n\t\t<p>\n\t\t\tDurandal is a SPA framework\n\t\t\tbuilt atop the popular Require.js specification, allowing users to modularise their code and asynchronously\n\t\t\tfetch their dependenices on request.\n\t\t</p>\n\t\t<p>\n\t\t\tUtilising Webpack in place of Require.js provides many benefits, including allowing us to smarly bundle our application\n\t\t\tinto distinct chunks, as opposed to completely individual files. This is great for caching, and can give a good boost\n\t\t\tto performance, especially on high latency networks.\n\t\t</p>\n\t\t<p>\n\t\t\tThere are plenty of other benefits, including transpilation support, CSS bundling and more!\n\t\t</p>\n\t</article>\n\t<br />\n\n\t<article>\n\t\t<header><h4>How do you do it?</h4></header>\n\n\t\t<p>\n\t\t\tThis project is supported by an in-depth Blog series title \"Durandal + Webpack\", which should answer any questions\n\t\t\tyou have about how this was achieved. Make sure to check-out the source for a technical view of what's going on.\n\t\t</p>\n\n\t\t<a class=\"btn btn-primary\" href=\"http://blog.craigsworks.com/durandal-and-webpack-introduction\">\n\t\t\t<span class=\"fa fa-book\"></span>\n\t\t\tRead the Guide\n\t\t</a>\n\t\t<a class=\"btn btn-default\" href=\"http://github.com/Craga89/durandal-webpack\">\n\t\t\t<span class=\"fa fa-github\"></span>\n\t\t\tView the Source\n\t\t</a>\n\n\t</article>\n\n</section>";

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = "<section id=\"dialogs\">\n\t<header><h3>Dialogs</h3></header>\n\t<p>\n\t\tDialogs can be easily integrate into the Webpack build by referencing the ViewModel\n\t\tas a direct dependency, and passing it to <code>dialog.show</code> as the first\n\t\tparameter, instead of the usual <code>moduleId</code>.\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Examples</h4></header>\n\t\t<p>\n\t\t\t<a class=\"btn btn-danger\" data-bind=\"click: alert\">Alert</a>\n\t\t\t<a class=\"btn btn-warning\" data-bind=\"click: alert\">Confirm</a>\n\t\t\t<a class=\"btn btn-info\" data-bind=\"click: prompt\">Prompt</a>\n\t\t</p>\n\t</article>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Asynchronous</h4></header>\n\t\t<p>\n\t\t\tWe can also fetch dialogs on request using Webpacks <code>require.ensure</code> Code Splitting\n\t\t\tfunctionality!\n\t\t</p>\n\t\t<p>\n\t\t\t<a class=\"btn btn-danger\" data-bind=\"click: hello\">Alert</a>\n\t\t</p>\n\t</article>\n</div>";

/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"modal-dialog\">\n\t<div class=\"modal-content\">\n\t\t<div class=\"modal-header\">\n\t\t\t<!-- ko if: canClose -->\n\t\t\t\t<a role=\"button\" title=\"Close Dialog\" class=\"close\" data-bind=\"click: close\">\n\t\t\t\t\t&times;\n\t\t\t\t</a>\n\t\t\t<!-- /ko-->\n\n\t\t\t<h4 class=\"modal-title\">Prompt</h4>\n\t\t</div>\n\n\t\t<div class=\"modal-body\">\n\t\t\t<p class=\"message\" data-bind=\"text: message\"></p>\n\n\t\t\t<input type=\"text\" class=\"form-control\" data-bind=\"value: text\" />\n\t\t</div>\n\n\t\t<div class=\"modal-footer\">\n\t\t\t<a class=\"btn btn-primary\" data-bind=\"click: function() { selectOption(true); }\">OK</a>\n\t\t\t<a class=\"btn btn-default\" data-bind=\"click: close\">Cancel</a>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports) {

	module.exports = "<section id=\"widgets\">\n\t<header><h3>Widgets</h3></header>\n\t<p>\n\t\tUtilising Durandals <code>widget</code> functionality is simply a case of re-using the same\n\t\t<code>getView</code> logic discussed in the <code>Composition</code> section!\n\t</p>\n\t<br />\n\n\t<article>\n\t\t<header><h4>Alerts</h4></header>\n\n\t\t<!-- ko Alert: {\n\t\t\ttitle: \"Reusable, bundled widgets!\",\n\t\t\ttext: \"This widget is re-usable, and uses the same `getView` functionality as the ViewModels!\",\n\t\t\tvariant: \"info\"\n\t\t} \n\t\t--> <!-- /ko -->\n\n\t\t<!-- ko Alert: {\n\t\t\ttitle: \"Same Widget, different options\",\n\t\t\ttext: \"So swish\",\n\t\t\tvariant: \"warning\"\n\t\t} \n\t\t--> <!-- /ko -->\n\t</article>\n</div>";

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"alert fade in\" role=\"alert\" data-bind=\"css: className\">\n\t<!-- ko if: canClose -->\n\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n\t\t<span aria-hidden=\"true\">×</span>\n\t</button>\n\t<!-- /ko -->\n\n\t<h4 data-bind=\"text: title\"></h4>\n\t<p data-bind=\"text: text\"></p>\n</div>";

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
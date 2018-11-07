module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/app.js":
/*!**********************!*\
  !*** ./pages/app.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var grommet_components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grommet/components/App */ "grommet/components/App");
/* harmony import */ var grommet_components_App__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(grommet_components_App__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var grommet_components_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grommet/components/Box */ "grommet/components/Box");
/* harmony import */ var grommet_components_Box__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(grommet_components_Box__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var grommet_components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grommet/components/Header */ "grommet/components/Header");
/* harmony import */ var grommet_components_Header__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(grommet_components_Header__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var grommet_components_Footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! grommet/components/Footer */ "grommet/components/Footer");
/* harmony import */ var grommet_components_Footer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(grommet_components_Footer__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var grommet_components_Meter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! grommet/components/Meter */ "grommet/components/Meter");
/* harmony import */ var grommet_components_Meter__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(grommet_components_Meter__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var grommet_components_Title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! grommet/components/Title */ "grommet/components/Title");
/* harmony import */ var grommet_components_Title__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(grommet_components_Title__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var grommet_components_Value__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! grommet/components/Value */ "grommet/components/Value");
/* harmony import */ var grommet_components_Value__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(grommet_components_Value__WEBPACK_IMPORTED_MODULE_9__);










/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
    href: "//cdnjs.cloudflare.com/ajax/libs/grommet/1.0.1/grommet.min.css",
    rel: "stylesheet",
    type: "text/css"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(grommet_components_App__WEBPACK_IMPORTED_MODULE_3___default.a, {
    centered: false
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(grommet_components_Header__WEBPACK_IMPORTED_MODULE_5___default.a, {
    direction: "row",
    justify: "between",
    pad: {
      horizontal: 'medium'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(grommet_components_Title__WEBPACK_IMPORTED_MODULE_8___default.a, null, "Grommet standalone")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(grommet_components_Box__WEBPACK_IMPORTED_MODULE_4___default.a, {
    pad: "medium"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(grommet_components_Meter__WEBPACK_IMPORTED_MODULE_7___default.a, {
    value: 40
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(grommet_components_Footer__WEBPACK_IMPORTED_MODULE_6___default.a, {
    primary: true,
    appCentered: true,
    direction: "column",
    align: "center",
    pad: "small",
    colorIndex: "grey-1"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Build your ideas with ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "http://grommet.io",
    target: "_blank"
  }, "Grommet"), "!"))));
});

/***/ }),

/***/ 3:
/*!****************************!*\
  !*** multi ./pages/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/app.js */"./pages/app.js");


/***/ }),

/***/ "grommet/components/App":
/*!*****************************************!*\
  !*** external "grommet/components/App" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/App");

/***/ }),

/***/ "grommet/components/Box":
/*!*****************************************!*\
  !*** external "grommet/components/Box" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/Box");

/***/ }),

/***/ "grommet/components/Footer":
/*!********************************************!*\
  !*** external "grommet/components/Footer" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/Footer");

/***/ }),

/***/ "grommet/components/Header":
/*!********************************************!*\
  !*** external "grommet/components/Header" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/Header");

/***/ }),

/***/ "grommet/components/Meter":
/*!*******************************************!*\
  !*** external "grommet/components/Meter" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/Meter");

/***/ }),

/***/ "grommet/components/Title":
/*!*******************************************!*\
  !*** external "grommet/components/Title" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/Title");

/***/ }),

/***/ "grommet/components/Value":
/*!*******************************************!*\
  !*** external "grommet/components/Value" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("grommet/components/Value");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map
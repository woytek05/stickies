/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./note */ \"./src/note.ts\");\n\ndocument.getElementById(\"addPage\").addEventListener('click', function () {\n    var a = new _note__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById(\"container\"));\n    console.log(a);\n});\n\n\n//# sourceURL=webpack://fridge/./src/main.ts?");

/***/ }),

/***/ "./src/note.ts":
/*!*********************!*\
  !*** ./src/note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Note = /** @class */ (function () {\n    function Note(fridgeContainer) {\n        this.text = \"\";\n        this.active = false;\n        this.xOffset = 0;\n        this.yOffset = 0;\n        this.fridgeContainer = fridgeContainer;\n        this.noteContainer = this.createNoteContainer();\n        this.fridgeContainer.appendChild(this.noteContainer);\n        this.fridgeContainer.addEventListener(\"touchstart\", this.dragStart.bind(this), false);\n        this.fridgeContainer.addEventListener(\"touchend\", this.dragEnd.bind(this), false);\n        this.fridgeContainer.addEventListener(\"touchmove\", this.drag.bind(this), false);\n        this.fridgeContainer.addEventListener(\"mousedown\", this.dragStart.bind(this), false);\n        this.fridgeContainer.addEventListener(\"mouseup\", this.dragEnd.bind(this), false);\n        this.fridgeContainer.addEventListener(\"mousemove\", this.drag.bind(this), false);\n    }\n    Note.prototype.dragStart = function (e) {\n        if (e.type === \"touchstart\") {\n            this.initialX = e.touches[0].clientX - this.xOffset;\n            this.initialY = e.touches[0].clientY - this.yOffset;\n        }\n        else {\n            this.initialX = e.clientX - this.xOffset;\n            this.initialY = e.clientY - this.yOffset;\n        }\n        if (e.target === this.noteContainer) {\n            this.active = true;\n        }\n    };\n    Note.prototype.dragEnd = function (e) {\n        this.initialX = this.currentX;\n        this.initialY = this.currentY;\n        this.active = false;\n    };\n    Note.prototype.drag = function (e) {\n        if (this.active) {\n            e.preventDefault();\n            if (e.type === \"touchmove\") {\n                this.currentX = e.touches[0].clientX - this.initialX;\n                this.currentY = e.touches[0].clientY - this.initialY;\n            }\n            else {\n                this.currentX = e.clientX - this.initialX;\n                this.currentY = e.clientY - this.initialY;\n            }\n            this.xOffset = this.currentX;\n            this.yOffset = this.currentY;\n            this.setTranslate(this.currentX, this.currentY, this.noteContainer);\n        }\n    };\n    Note.prototype.setTranslate = function (xPos, yPos, div) {\n        div.style.transform = \"translate3d(\" + xPos + \"px, \" + yPos + \"px, 0)\";\n    };\n    Note.prototype.createNoteContainer = function () {\n        var div = document.createElement(\"div\");\n        div.classList.add(\"note\");\n        return div;\n    };\n    return Note;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Note);\n//https://www.kirupa.com/html5/drag.htm\n\n\n//# sourceURL=webpack://fridge/./src/note.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
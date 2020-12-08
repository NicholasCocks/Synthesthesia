/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);
 //import things from scripts
//import things from scss
// const Tone = require('tone')

var NOTES = [20.60172, 21.82676, 24.49971, 27.50000, 30.86771, 32.70320, 36.70810, 41.20344, 43.65353, 48.99943, 55.00000, 61.73541, 65.40639, 73.41619, 82.40689, 87.30706, 97.99886, 110.0000, 123.4708, 130.8128, 146.8324, 164.8138, 174.6141, 195.9977, 220.0000, 246.9417, 261.6256, 293.6648, 329.6276, 349.2282, 391.9954, 440.0000, 493.8833, 523.2511, 587.3295, 659.2551, 698.4565, 783.9909, 880.0000, 987.7666, 1046.502, 1174.659, 1318.510, 1396.913, 1567.982, 1760.000];

function closest(needle, haystack) {
  return haystack.reduce(function (a, b) {
    var aDiff = Math.abs(a - Math.abs(needle));
    var bDiff = Math.abs(b - Math.abs(needle));

    if (aDiff == bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
}

window.addEventListener('load', function () {
  //ppts
  var ppts = []; //canvas

  var canvas = document.querySelector('#canvas');
  var visualizer = document.querySelector('#visualizer1');
  var container = document.querySelector('#page_container');
  var size = 500;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  var scale = window.devicePixelRatio;
  canvas.width = Math.floor(size * scale);
  canvas.height = Math.floor(size * scale); //ctx

  var ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowBlur = 5; //oscillator

  var oscillator;
  var oscillator2;
  var ac = new AudioContext();
  var ac2 = new AudioContext();
  var analyserNode = new AnalyserNode(ac, {
    fftSize: 512
  });
  var analyserNode2 = new AnalyserNode(ac2, {
    fftSize: 512
  });
  var panNode = ac.createStereoPanner();
  var panNode2 = ac2.createStereoPanner();
  var gainNode = ac.createGain();
  var gainNode2 = ac2.createGain();
  panNode.pan.value = 1;
  panNode2.pan.value = -1;
  panNode.connect(gainNode);
  panNode2.connect(gainNode2);
  gainNode.connect(ac.destination);
  gainNode2.connect(ac2.destination); //drawing

  var drawing = false; //speed

  var timestamp = null;
  drawVisualizer();
  resizeVisualizer();

  function startPosition(e) {
    drawing = true;
    oscillator = ac.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.connect(panNode);
    oscillator.connect(analyserNode);
    oscillator.start(0);
    oscillator2 = ac2.createOscillator();
    oscillator2.type = 'sawtooth';
    oscillator2.connect(panNode2);
    oscillator2.connect(analyserNode2);
    oscillator2.start(0);
    draw(e);
  }

  function finishedPosition() {
    drawing = false;
    ppts = [];
    oscillator.stop(0.1);
    oscillator.disconnect(0.1);
    oscillator2.stop(0.1);
    oscillator2.disconnect(0.1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  }

  function draw(e) {
    if (!drawing) return;
    var mouse = {
      x: 0,
      y: 0
    };
    mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    ppts.push({
      x: mouse.x,
      y: mouse.y
    });

    if (mouse.x > 500 || mouse.x < 0 || mouse.y > 500 || mouse.y < 0) {
      finishedPosition();
    } //speed


    if (timestamp === null) {
      timestamp = Date.now();
      lastMouseX = e.screenX;
      lastMouseY = e.screenY;
      return;
    }

    gainNode.gain.exponentialRampToValueAtTime(mouse.x / size * 0.1, 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(mouse.y / size * 0.1, 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(closest(mouse.x - 20, NOTES), ac.currentTime + 0.01);
    oscillator2.frequency.exponentialRampToValueAtTime(closest(mouse.y - 20, NOTES), ac2.currentTime + 0.01);
    ctx.strokeStyle = "rgb(".concat(255 / size * mouse.x, ", ").concat(255 / size * mouse.y, ", 155)");
    ctx.shadowColor = "rgba(".concat(255 / size * mouse.y, ", 0, ").concat(255 / size * mouse.x, ", .5)");
    var now = Date.now();
    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;

    if (ppts.length < 6) {
      var b = ppts[0];
      ctx.beginPath(), ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0), ctx.closePath(), ctx.fill();
      return;
    }

    ctx.beginPath(), ctx.moveTo(ppts[0].x, ppts[0].y); // draw a bunch of quadratics, using the average of two ppts as the control point

    for (i = 1; i < ppts.length - 2; i++) {
      var c = (ppts[i].x + ppts[i + 1].x) / 2,
          d = (ppts[i].y + ppts[i + 1].y) / 2;
      ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
    }

    ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, ppts[i + 1].x, ppts[i + 1].y), ctx.stroke();
  }

  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    var bufferLength = analyserNode2.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyserNode2.getByteFrequencyData(dataArray);
    console.log(dataArray);
    var width = visualizer.width;
    var height = visualizer.height;
    var barWidth = width / bufferLength;
    var canvasContext = visualizer.getContext('2d');
    canvasContext.clearRect(0, 0, width, height);
    dataArray.forEach(function (item, index) {
      var y = item / 255 * height;
      var x = barWidth * index;
      canvasContext.fillStyle = "hsl(".concat(y / height * 70, ", 100%, 50%)");
      canvasContext.fillRect(x, height - y, barWidth, y);
    });
  }

  function resizeVisualizer() {
    visualizer.width = visualizer.clientWidth * scale;
    visualizer.height = visualizer.clientHeight * scale;
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishedPosition);
  canvas.addEventListener('mousemove', draw);
  container.addEventListener('mouseover', finishedPosition);
});

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nError: Missing binding /mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/node-sass/vendor/linux-x64-64/binding.node\nNode Sass could not find a binding for your current environment: Linux 64-bit with Node.js 10.x\n\nFound bindings for the following environments:\n  - Linux 64-bit with Node.js 14.x\n\nThis usually happens because your environment has changed since running `npm install`.\nRun `npm rebuild node-sass` to download the binding for your current environment.\n    at module.exports (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/node-sass/lib/binding.js:15:13)\n    at Object.<anonymous> (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/node-sass/lib/index.js:14:35)\n    at Module._compile (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:529:3)\n    at Module.require (internal/modules/cjs/loader.js:636:17)\n    at require (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/v8-compile-cache/v8-compile-cache.js:159:20)\n    at getDefaultSassImplementation (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/sass-loader/dist/getDefaultSassImplementation.js:24:10)\n    at getSassImplementation (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/sass-loader/dist/getSassImplementation.js:19:72)\n    at Object.loader (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/sass-loader/dist/index.js:40:61)\n    at runLoaders (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/webpack/lib/NormalModule.js:316:20)\n    at /mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at runSyncOrAsync (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:143:3)\n    at iterateNormalLoaders (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:232:2)\n    at iterateNormalLoaders (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:221:10)\n    at /mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:236:3\n    at context.callback (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at postcss.process.then (/mnt/c/Users/nickc/Desktop/App Academy/aA-Projects/js_project_skeleton-master/node_modules/postcss-loader/src/index.js:197:9)");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIk5PVEVTIiwiY2xvc2VzdCIsIm5lZWRsZSIsImhheXN0YWNrIiwicmVkdWNlIiwiYSIsImIiLCJhRGlmZiIsIk1hdGgiLCJhYnMiLCJiRGlmZiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcHRzIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidmlzdWFsaXplciIsImNvbnRhaW5lciIsInNpemUiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2NhbGUiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZmxvb3IiLCJjdHgiLCJnZXRDb250ZXh0IiwibGluZVdpZHRoIiwibGluZUNhcCIsImxpbmVKb2luIiwic2hhZG93Qmx1ciIsIm9zY2lsbGF0b3IiLCJvc2NpbGxhdG9yMiIsImFjIiwiQXVkaW9Db250ZXh0IiwiYWMyIiwiYW5hbHlzZXJOb2RlIiwiQW5hbHlzZXJOb2RlIiwiZmZ0U2l6ZSIsImFuYWx5c2VyTm9kZTIiLCJwYW5Ob2RlIiwiY3JlYXRlU3RlcmVvUGFubmVyIiwicGFuTm9kZTIiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJnYWluTm9kZTIiLCJwYW4iLCJ2YWx1ZSIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsImRyYXdpbmciLCJ0aW1lc3RhbXAiLCJkcmF3VmlzdWFsaXplciIsInJlc2l6ZVZpc3VhbGl6ZXIiLCJzdGFydFBvc2l0aW9uIiwiZSIsImNyZWF0ZU9zY2lsbGF0b3IiLCJ0eXBlIiwic3RhcnQiLCJkcmF3IiwiZmluaXNoZWRQb3NpdGlvbiIsInN0b3AiLCJkaXNjb25uZWN0IiwiY2xlYXJSZWN0IiwiYmVnaW5QYXRoIiwibW91c2UiLCJ4IiwieSIsIm9mZnNldFgiLCJsYXllclgiLCJvZmZzZXRZIiwibGF5ZXJZIiwicHVzaCIsIkRhdGUiLCJub3ciLCJsYXN0TW91c2VYIiwic2NyZWVuWCIsImxhc3RNb3VzZVkiLCJzY3JlZW5ZIiwiZ2FpbiIsImV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUiLCJmcmVxdWVuY3kiLCJjdXJyZW50VGltZSIsInN0cm9rZVN0eWxlIiwic2hhZG93Q29sb3IiLCJsZW5ndGgiLCJhcmMiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJtb3ZlVG8iLCJpIiwiYyIsImQiLCJxdWFkcmF0aWNDdXJ2ZVRvIiwic3Ryb2tlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYnVmZmVyTGVuZ3RoIiwiZnJlcXVlbmN5QmluQ291bnQiLCJkYXRhQXJyYXkiLCJVaW50OEFycmF5IiwiZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEiLCJjb25zb2xlIiwibG9nIiwiYmFyV2lkdGgiLCJjYW52YXNDb250ZXh0IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwr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aEQ7QUFDSCxLQU5EO0FBT0g7O0FBRUQsV0FBU2QsZ0JBQVQsR0FBNEI7QUFDeEJyQyxjQUFVLENBQUNJLEtBQVgsR0FBbUJKLFVBQVUsQ0FBQytGLFdBQVgsR0FBeUJ6RixLQUE1QztBQUNBTixjQUFVLENBQUNLLE1BQVgsR0FBb0JMLFVBQVUsQ0FBQ2dHLFlBQVgsR0FBMEIxRixLQUE5QztBQUNIOztBQUVEVCxRQUFNLENBQUNGLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDMkMsYUFBckM7QUFDQXpDLFFBQU0sQ0FBQ0YsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNpRCxnQkFBbkM7QUFDQS9DLFFBQU0sQ0FBQ0YsZ0JBQVAsQ0FBd0IsV0FBeEIsRUFBcUNnRCxJQUFyQztBQUNBMUMsV0FBUyxDQUFDTixnQkFBVixDQUEyQixXQUEzQixFQUF3Q2lELGdCQUF4QztBQUVILENBcktELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuLy9pbXBvcnQgdGhpbmdzIGZyb20gc2NyaXB0c1xuLy9pbXBvcnQgdGhpbmdzIGZyb20gc2Nzc1xuXG4vLyBjb25zdCBUb25lID0gcmVxdWlyZSgndG9uZScpXG5cbmNvbnN0IE5PVEVTID0gW1xuICAgIDIwLjYwMTcyLFxuICAgIDIxLjgyNjc2LFxuICAgIDI0LjQ5OTcxLFxuICAgIDI3LjUwMDAwLFxuICAgIDMwLjg2NzcxLFxuICAgIDMyLjcwMzIwLFxuICAgIDM2LjcwODEwLFxuICAgIDQxLjIwMzQ0LFxuICAgIDQzLjY1MzUzLFxuICAgIDQ4Ljk5OTQzLFxuICAgIDU1LjAwMDAwLFxuICAgIDYxLjczNTQxLFxuICAgIDY1LjQwNjM5LFxuICAgIDczLjQxNjE5LFxuICAgIDgyLjQwNjg5LFxuICAgIDg3LjMwNzA2LFxuICAgIDk3Ljk5ODg2LFxuICAgIDExMC4wMDAwLFxuICAgIDEyMy40NzA4LFxuICAgIDEzMC44MTI4LFxuICAgIDE0Ni44MzI0LFxuICAgIDE2NC44MTM4LFxuICAgIDE3NC42MTQxLFxuICAgIDE5NS45OTc3LFxuICAgIDIyMC4wMDAwLFxuICAgIDI0Ni45NDE3LFxuICAgIDI2MS42MjU2LFxuICAgIDI5My42NjQ4LFxuICAgIDMyOS42Mjc2LFxuICAgIDM0OS4yMjgyLFxuICAgIDM5MS45OTU0LFxuICAgIDQ0MC4wMDAwLFxuICAgIDQ5My44ODMzLFxuICAgIDUyMy4yNTExLFxuICAgIDU4Ny4zMjk1LFxuICAgIDY1OS4yNTUxLFxuICAgIDY5OC40NTY1LFxuICAgIDc4My45OTA5LFxuICAgIDg4MC4wMDAwLFxuICAgIDk4Ny43NjY2LFxuICAgIDEwNDYuNTAyLFxuICAgIDExNzQuNjU5LFxuICAgIDEzMTguNTEwLFxuICAgIDEzOTYuOTEzLFxuICAgIDE1NjcuOTgyLFxuICAgIDE3NjAuMDAwLFxuXVxuZnVuY3Rpb24gY2xvc2VzdChuZWVkbGUsIGhheXN0YWNrKSB7XG4gICAgcmV0dXJuIGhheXN0YWNrLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgICBsZXQgYURpZmYgPSBNYXRoLmFicyhhIC0gTWF0aC5hYnMobmVlZGxlKSk7XG4gICAgICAgIGxldCBiRGlmZiA9IE1hdGguYWJzKGIgLSBNYXRoLmFicyhuZWVkbGUpKTtcblxuICAgICAgICBpZiAoYURpZmYgPT0gYkRpZmYpIHtcbiAgICAgICAgICAgIHJldHVybiBhID4gYiA/IGEgOiBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGJEaWZmIDwgYURpZmYgPyBiIDogYTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgIC8vcHB0c1xuICAgIGxldCBwcHRzID0gW107XG5cbiAgICAvL2NhbnZhc1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMnKVxuICAgIGNvbnN0IHZpc3VhbGl6ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlzdWFsaXplcjEnKVxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlX2NvbnRhaW5lcicpXG4gICAgY29uc3Qgc2l6ZSA9IDUwMDtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBzaXplICsgXCJweFwiO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBzaXplICsgXCJweFwiO1xuICAgIGxldCBzY2FsZSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgIGNhbnZhcy53aWR0aCA9IE1hdGguZmxvb3Ioc2l6ZSAqIHNjYWxlKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcihzaXplICogc2NhbGUpO1xuICAgIFxuICAgIC8vY3R4XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LnNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xuICAgIGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XG4gICAgY3R4LnNoYWRvd0JsdXIgPSA1O1xuICAgIFxuICAgIC8vb3NjaWxsYXRvclxuICAgIGxldCBvc2NpbGxhdG9yO1xuICAgIGxldCBvc2NpbGxhdG9yMjtcbiAgICBjb25zdCBhYyA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICBjb25zdCBhYzIgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgY29uc3QgYW5hbHlzZXJOb2RlID0gbmV3IEFuYWx5c2VyTm9kZShhYywgeyBmZnRTaXplOiA1MTIgfSlcbiAgICBjb25zdCBhbmFseXNlck5vZGUyID0gbmV3IEFuYWx5c2VyTm9kZShhYzIsIHsgZmZ0U2l6ZTogNTEyIH0pXG4gICAgY29uc3QgcGFuTm9kZSA9IGFjLmNyZWF0ZVN0ZXJlb1Bhbm5lcigpO1xuICAgIGNvbnN0IHBhbk5vZGUyID0gYWMyLmNyZWF0ZVN0ZXJlb1Bhbm5lcigpO1xuICAgIGNvbnN0IGdhaW5Ob2RlID0gYWMuY3JlYXRlR2FpbigpO1xuICAgIGNvbnN0IGdhaW5Ob2RlMiA9IGFjMi5jcmVhdGVHYWluKCk7XG4gICAgcGFuTm9kZS5wYW4udmFsdWUgPSAxO1xuICAgIHBhbk5vZGUyLnBhbi52YWx1ZSA9IC0xO1xuICAgIHBhbk5vZGUuY29ubmVjdChnYWluTm9kZSk7XG4gICAgcGFuTm9kZTIuY29ubmVjdChnYWluTm9kZTIpO1xuICAgIGdhaW5Ob2RlLmNvbm5lY3QoYWMuZGVzdGluYXRpb24pO1xuICAgIGdhaW5Ob2RlMi5jb25uZWN0KGFjMi5kZXN0aW5hdGlvbik7XG4gICAgXG4gICAgLy9kcmF3aW5nXG4gICAgbGV0IGRyYXdpbmcgPSBmYWxzZTtcblxuICAgIC8vc3BlZWRcbiAgICBsZXQgdGltZXN0YW1wID0gbnVsbDtcbiAgICBcbiAgICBkcmF3VmlzdWFsaXplcigpXG4gICAgcmVzaXplVmlzdWFsaXplcigpXG5cbiAgICBmdW5jdGlvbiBzdGFydFBvc2l0aW9uKGUpIHtcbiAgICAgICAgZHJhd2luZyA9IHRydWU7XG5cbiAgICAgICAgb3NjaWxsYXRvciA9IGFjLmNyZWF0ZU9zY2lsbGF0b3IoKVxuICAgICAgICBvc2NpbGxhdG9yLnR5cGUgPSAnc2F3dG9vdGgnXG4gICAgICAgIG9zY2lsbGF0b3IuY29ubmVjdChwYW5Ob2RlKVxuICAgICAgICBvc2NpbGxhdG9yLmNvbm5lY3QoYW5hbHlzZXJOb2RlKVxuICAgICAgICBvc2NpbGxhdG9yLnN0YXJ0KDApXG4gICAgICBcblxuICAgICAgICBvc2NpbGxhdG9yMiA9IGFjMi5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zY2lsbGF0b3IyLnR5cGUgPSAnc2F3dG9vdGgnXG4gICAgICAgIG9zY2lsbGF0b3IyLmNvbm5lY3QocGFuTm9kZTIpXG4gICAgICAgIG9zY2lsbGF0b3IyLmNvbm5lY3QoYW5hbHlzZXJOb2RlMilcbiAgICAgICAgb3NjaWxsYXRvcjIuc3RhcnQoMClcbiAgICAgXG5cbiAgICAgICAgZHJhdyhlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5pc2hlZFBvc2l0aW9uKCkge1xuICAgICAgICBkcmF3aW5nID0gZmFsc2U7XG4gICAgICAgIHBwdHMgPSBbXTtcbiAgICAgICAgb3NjaWxsYXRvci5zdG9wKDAuMSlcbiAgICAgICAgb3NjaWxsYXRvci5kaXNjb25uZWN0KDAuMSk7XG4gICAgICAgIG9zY2lsbGF0b3IyLnN0b3AoMC4xKVxuICAgICAgICBvc2NpbGxhdG9yMi5kaXNjb25uZWN0KDAuMSk7XG4gXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGRyYXcoZSkge1xuICAgICAgICBpZighZHJhd2luZykgcmV0dXJuIDtcbiAgICAgICAgY29uc3QgbW91c2UgPSB7eDogMCwgeTogMH07XG4gICAgICAgIG1vdXNlLnggPSB0eXBlb2YgZS5vZmZzZXRYICE9PSAndW5kZWZpbmVkJyA/IGUub2Zmc2V0WCA6IGUubGF5ZXJYO1xuICAgICAgICBtb3VzZS55ID0gdHlwZW9mIGUub2Zmc2V0WSAhPT0gJ3VuZGVmaW5lZCcgPyBlLm9mZnNldFkgOiBlLmxheWVyWTtcbiAgICAgICAgcHB0cy5wdXNoKHt4OiBtb3VzZS54LCB5OiBtb3VzZS55fSk7XG4gICAgICAgIGlmICgobW91c2UueCA+IDUwMCB8fCBtb3VzZS54IDwgMCkgfHwgKG1vdXNlLnkgPiA1MDAgfHwgbW91c2UueSA8IDApKSB7XG4gICAgICAgICAgICBmaW5pc2hlZFBvc2l0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgLy9zcGVlZFxuICAgICAgIGlmICh0aW1lc3RhbXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBsYXN0TW91c2VYID0gZS5zY3JlZW5YO1xuICAgICAgICAgICAgbGFzdE1vdXNlWSA9IGUuc2NyZWVuWTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICBnYWluTm9kZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoKChtb3VzZS54IC8gc2l6ZSkgKiAwLjEpLCAwLjEpO1xuICAgICAgICBnYWluTm9kZTIuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKCgobW91c2UueSAvIHNpemUpICogMC4xKSwgMC4xKTtcblxuICAgICAgICBvc2NpbGxhdG9yLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGNsb3Nlc3QobW91c2UueCAtIDIwLCBOT1RFUyksIGFjLmN1cnJlbnRUaW1lICsgMC4wMSk7XG4gICAgICAgIG9zY2lsbGF0b3IyLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGNsb3Nlc3QobW91c2UueSAtIDIwLCBOT1RFUyksIGFjMi5jdXJyZW50VGltZSArIDAuMDEpO1xuICAgICAgIFxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBgcmdiKCR7KDI1NS8gc2l6ZSkgKiBtb3VzZS54fSwgJHsoMjU1LyBzaXplKSAqIG1vdXNlLnl9LCAxNTUpYDtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gYHJnYmEoJHsoMjU1LyBzaXplKSAqIG1vdXNlLnl9LCAwLCAkeygyNTUvIHNpemUpICogbW91c2UueH0sIC41KWA7XG4gICAgICAgXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgICAgIGxhc3RNb3VzZVggPSBlLnNjcmVlblg7XG4gICAgICAgIGxhc3RNb3VzZVkgPSBlLnNjcmVlblk7XG4gICBcbiAgICAgICAgaWYgKHBwdHMubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgbGV0IGIgPSBwcHRzWzBdO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpLCBjdHguYXJjKGIueCwgYi55LCBjdHgubGluZVdpZHRoIC8gMiwgMCwgTWF0aC5QSSAqIDIsICEwKSwgY3R4LmNsb3NlUGF0aCgpLCBjdHguZmlsbCgpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpLCBjdHgubW92ZVRvKHBwdHNbMF0ueCwgcHB0c1swXS55KTtcbiAgICAgICAgLy8gZHJhdyBhIGJ1bmNoIG9mIHF1YWRyYXRpY3MsIHVzaW5nIHRoZSBhdmVyYWdlIG9mIHR3byBwcHRzIGFzIHRoZSBjb250cm9sIHBvaW50XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBwcHRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgICAgbGV0IGMgPSAocHB0c1tpXS54ICsgcHB0c1tpICsgMV0ueCkgLyAyLFxuICAgICAgICAgICAgICAgIGQgPSAocHB0c1tpXS55ICsgcHB0c1tpICsgMV0ueSkgLyAyO1xuICAgICAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8ocHB0c1tpXS54LCBwcHRzW2ldLnksIGMsIGQpXG4gICAgICAgIH1cbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8ocHB0c1tpXS54LCBwcHRzW2ldLnksIHBwdHNbaSArIDFdLngsIHBwdHNbaSArIDFdLnkpLCBjdHguc3Ryb2tlKClcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd1Zpc3VhbGl6ZXIoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3VmlzdWFsaXplcilcbiAgICBcbiAgICAgICAgY29uc3QgYnVmZmVyTGVuZ3RoID0gYW5hbHlzZXJOb2RlMi5mcmVxdWVuY3lCaW5Db3VudFxuICAgICAgICBjb25zdCBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpXG4gICAgICAgIGFuYWx5c2VyTm9kZTIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZGF0YUFycmF5KVxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhQXJyYXkpXG4gICAgICAgIGNvbnN0IHdpZHRoID0gdmlzdWFsaXplci53aWR0aFxuICAgICAgICBjb25zdCBoZWlnaHQgPSB2aXN1YWxpemVyLmhlaWdodFxuICAgICAgICBjb25zdCBiYXJXaWR0aCA9IHdpZHRoIC8gYnVmZmVyTGVuZ3RoXG5cbiAgICAgICAgY29uc3QgY2FudmFzQ29udGV4dCA9IHZpc3VhbGl6ZXIuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBjYW52YXNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICBcblxuICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpdGVtIC8gMjU1ICogaGVpZ2h0XG4gICAgICAgICAgICBjb25zdCB4ID0gYmFyV2lkdGggKiBpbmRleCBcblxuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSBgaHNsKCR7eSAvIGhlaWdodCAqIDcwfSwgMTAwJSwgNTAlKWBcbiAgICAgICAgICAgIGNhbnZhc0NvbnRleHQuZmlsbFJlY3QoeCwgaGVpZ2h0IC0geSwgYmFyV2lkdGgsIHkpXG4gICAgICAgIH0pXG4gICAgfSAgICBcblxuICAgIGZ1bmN0aW9uIHJlc2l6ZVZpc3VhbGl6ZXIoKSB7XG4gICAgICAgIHZpc3VhbGl6ZXIud2lkdGggPSB2aXN1YWxpemVyLmNsaWVudFdpZHRoICogc2NhbGVcbiAgICAgICAgdmlzdWFsaXplci5oZWlnaHQgPSB2aXN1YWxpemVyLmNsaWVudEhlaWdodCAqIHNjYWxlXG4gICAgfVxuICAgIFxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzdGFydFBvc2l0aW9uKVxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZmluaXNoZWRQb3NpdGlvbilcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhdylcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZmluaXNoZWRQb3NpdGlvbilcbiAgIFxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./src\\bg.jpg":[["bg.71a744d5.jpg","src/src/bg.jpg"],"src/src/bg.jpg"],"./src\\brik.jpg":[["brik.91577472.jpg","src/src/brik.jpg"],"src/src/brik.jpg"],"./src\\mush.png":[["mush.58ebb4ff.png","src/src/mush.png"],"src/src/mush.png"],"./src\\mushlife.png":[["mushlife.be0a9cbf.png","src/src/mushlife.png"],"src/src/mushlife.png"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var board = document.querySelector(".game");
var holes = document.querySelectorAll(".hole"); //const moles = document.querySelectorAll(".mole");

var vie = 5;
var lvl = 1;
var lastHole;
var timeUp;
var vitMin = 1400;
var vitMax = 2800; //Head Board

document.getElementById("app").innerHTML = "\n<h2>Vie(s) &#9825 : <span class=\"vie\"></span></h2><h2>Level: <span class=\"lvl\"></span> </h2>\n<button class=\"start\">Start</button><button disabled class=\"next\">Next lvl</button>\n"; //Button

var startButton = document.querySelector(".start");
var nextButton = document.querySelector(".next"); //Sound

var coin = new Audio('./src/src/Coin_Sound.mp3'); // buffers automatically when created

var Bump = new Audio("./src/src/Bump_Sound.mp3");
var startSound = new Audio("./src/src/Mario_Sound_Effect.mp3");
var nextSound = new Audio("./src/src/Woo_Hoo.mp3");
var endSound = new Audio("./src/src§/Game_Over.mp3"); //random time

function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
} //Random trou


function randHole(holes) {
  var idx = Math.floor(Math.random() * holes.length);
  var hole = holes[idx];

  if (hole === lastHole) {
    //si identique au dernier alors on relance
    return randHole(holes);
  }

  lastHole = hole;
  return hole;
} //vitesse et animation du Mush


function peep() {
  var time = randTime(vitMin, vitMax);
  var hole = randHole(holes);
  hole.classList.add("up"); //console.log("peep", time, hole);

  setTimeout(function () {
    var vieBoard = document.querySelector(".vie");
    var thend = document.querySelector(".thend");

    if (hole.classList.contains("up")) {
      Bump.play();
      vie = vie - 1;
      vieBoard.innerHTML = vie;
    }

    hole.classList.remove("up");

    if (vie < 0) {
      endSound.play();
      vieBoard.innerHTML = "Game Over";
      thend.style.top = "-90%";
      return;
    } //console.log(vie);


    if (!timeUp) peep();
  }, time);
} //gain onelife


function oneLife() {
  var time = randTime(vitMin, vitMax);
  var hole = randHole(holes);
  hole.classList.add("up2"); //console.log("peep", time, hole);

  setTimeout(function () {
    var vieBoard = document.querySelector(".vie");
    var thend = document.querySelector(".thend");

    if (hole.classList.contains("up2")) {
      Bump.play();
    }

    hole.classList.remove("up2");

    if (vie < 0) {
      endSound.play();
      vieBoard.innerHTML = "Game Over";
      thend.style.top = "-90%";
      return;
    } //console.log(vie);


    if (!timeUp) peep();
  }, time);
} //Start & setup game


startButton.addEventListener("click", function () {
  startSound.playbackRate = 1.2;
  startSound.play();
  startButton.disabled = true;
  var lvlBoard = document.querySelector(".lvl");
  var vieBoard = document.querySelector(".vie");
  var thend = document.querySelector(".thend");
  vieBoard.innerHTML = 5;
  thend.style.top = "90%";
  timeUp = false;
  vie = 5;
  lvl = 1;
  vitMin = 1400;
  vitMax = 2200;
  lvlBoard.innerHTML = lvl;
  peep();
  setTimeout(function () {
    oneLife();
  }, randTime(1500, 8000));
  setTimeout(function () {
    timeUp = true;
    startButton.disabled = false;

    if (vie >= 0) {
      lvl = lvl + 1;
      startButton.disabled = true;
      nextButton.disabled = false;
      lvlBoard.innerHTML = lvl;
    }
  }, 10000);
}); //Next LVL

nextButton.addEventListener("click", function () {
  var lvlBoard = document.querySelector(".lvl");
  nextSound.play();
  nextButton.disabled = true;
  timeUp = false;
  peep();
  setTimeout(function () {
    oneLife();
  }, randTime(1500, 8000));
  vitMax = vitMax / 1.2;
  vitMin = vitMin / 1.2;
  setTimeout(function () {
    timeUp = true;
    startButton.disabled = false;

    if (vie >= 0) {
      lvl = lvl + 1;
      startButton.disabled = true;
      nextButton.disabled = false;
      lvlBoard.innerHTML = lvl;
    }
  }, 10000);
}); //ecoute des events Plateau

board.addEventListener("click", function (e) {
  var vieBoard = document.querySelector(".vie");
  var thend = document.querySelector(".thend"); // console.log(e.target.parentElement.classList);

  if (e.target.classList.contains("mole") && e.target.parentElement.classList.contains("up")) {
    coin.playbackRate = 2.2;
    coin.play();
    e.target.parentElement.classList.remove("up");
  } else if (e.target.classList.contains("mole") && e.target.parentElement.classList.contains("up2")) {
    coin.playbackRate = 2.2;
    coin.play(); //console.log("vie", e.target.parentElement);

    vie = vie + 1;
    vieBoard.innerHTML = vie;
    e.target.parentElement.classList.remove("up2");
  } else {
    //console.log("Noooooo!");
    Bump.play();
    vie = vie - 1;
    vieBoard.innerHTML = vie; //console.log(vie);
  }

  if (vie < 0) {
    endSound.play();
    vieBoard.innerHTML = "Game Over";
    thend.style.top = "-90%";
  }
});
},{"./styles.css":"src/styles.css"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "18736" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map
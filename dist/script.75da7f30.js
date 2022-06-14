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
})({"factoryFunctions/GameArena.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameArena = void 0;

var GameArena = function GameArena(board) {
  var _board = board;
  var _turn = "Player";

  var setGameBoard = function setGameBoard(board) {
    return _board = board;
  };

  var getGameBoard = function getGameBoard() {
    return _board;
  }; //  Print the game board


  var printFormattedBoard = function printFormattedBoard() {
    var formattedBoard = "";

    _board.forEach(function (cell, index) {
      formattedBoard += cell ? " ".concat(cell, " |") : "   |";

      if ((index + 1) % 3 === 0) {
        formattedBoard = formattedBoard.slice(0, -1);
        if (index < 8) formattedBoard += "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    });

    console.log('%c' + formattedBoard, 'color: #c11dd4;font-size:16px');
  }; //  Check if the board is empty


  var isEmpty = function isEmpty() {
    return _board.every(function (cell) {
      return !cell;
    });
  }; //  Check if the board is filled


  var isFull = function isFull() {
    return _board.every(function (cell) {
      return cell;
    });
  };
  /*  Inserts a symbol at the specified position
      @param {String} symbol specifies a symbol either 'X' or 'O' choosen by the user
      @param {Number} position specifies a position to insert the symbol
      @return {Boolean} determines the outcome of insert operation 
  */


  var insert = function insert(symbol, position) {
    if (![0, 1, 2,, 3, 4, 5, 6, 7, 8].includes(position)) {
      return false;
    }

    if (!['x', 'o'].includes(symbol)) {
      return false;
    }

    if (_board[position]) {
      return false;
    }

    _board[position] = symbol;
    return true;
  }; // Clear the board


  var clearBoard = function clearBoard() {
    _board.forEach(function (cell, index) {
      return _board[index] = "";
    });
  };
  /*  Checks if the board is at the terminal state i.e either someone is a winner or it's a draw
      @return {Object} returns an object containing the winner, direction of winning and row/column/diagonal number
  */


  var isTerminal = function isTerminal() {
    if (isEmpty()) {
      return false;
    } // Checking rows


    if (_board[0] && _board[0] === _board[1] && _board[0] === _board[2]) {
      return {
        'winner': _board[0],
        'direction': 'H',
        'row': 0
      };
    }

    if (_board[3] && _board[3] === _board[4] && _board[3] === _board[5]) {
      return {
        'winner': _board[3],
        'direction': 'H',
        'row': 1
      };
    }

    if (_board[6] && _board[6] === _board[7] && _board[6] === _board[8]) {
      return {
        'winner': _board[6],
        'direction': 'H',
        'row': 2
      };
    } // Checking columns


    if (_board[0] && _board[0] === _board[3] && _board[0] === _board[6]) {
      return {
        'winner': _board[0],
        'direction': 'V',
        'column': 0
      };
    }

    if (_board[1] && _board[1] === _board[4] && _board[1] === _board[7]) {
      return {
        'winner': _board[1],
        'direction': 'V',
        'column': 1
      };
    }

    if (_board[2] && _board[2] === _board[5] && _board[2] === _board[8]) {
      return {
        'winner': _board[2],
        'direction': 'V',
        'column': 2
      };
    } // Checking diagonals


    if (_board[0] && _board[0] === _board[4] && _board[0] === _board[8]) {
      return {
        'winner': _board[0],
        'direction': 'D',
        'diagonal': 1
      };
    }

    if (_board[2] && _board[2] === _board[4] && _board[2] === _board[6]) {
      return {
        'winner': _board[1],
        'direction': 'D',
        'diagonal': 2
      };
    }

    if (isFull()) {
      return {
        'winner': 'draw'
      };
    }

    return false;
  };
  /* Returns an array containing available moves for the current state */


  var getAvailableMoves = function getAvailableMoves() {
    var moves = [];

    _board.forEach(function (cell, index) {
      if (!cell) {
        moves.push(index);
      }
    });

    return moves;
  };
  /* Toggles the turn between the player and AI */


  var toggleTurn = function toggleTurn() {
    if (_turn === "Player") {
      _turn = "AI";
    } else {
      _turn = "Player";
    }
  };

  var getTurn = function getTurn() {
    return _turn;
  };

  return {
    setGameBoard: setGameBoard,
    getGameBoard: getGameBoard,
    printFormattedBoard: printFormattedBoard,
    isEmpty: isEmpty,
    isFull: isFull,
    insert: insert,
    clearBoard: clearBoard,
    isTerminal: isTerminal,
    getAvailableMoves: getAvailableMoves,
    toggleTurn: toggleTurn,
    getTurn: getTurn
  };
};

exports.GameArena = GameArena;
},{}],"factoryFunctions/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _GameArena = require("./GameArena");

var Player = function Player() {
  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
  var maxDepth = depth;
  var nodesMap = new Map();

  var getMaxDepth = function getMaxDepth() {
    return maxDepth;
  };

  var getNodesMap = function getNodesMap() {
    return nodesMap;
  };

  var getBestMove = function getBestMove(gameBoard) {
    var isMaximizing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    if (depth === 0) {
      nodesMap.clear();
    }

    if (gameBoard.isTerminal() || depth === maxDepth) {
      if (gameBoard.isTerminal().winner === "x") {
        return 100 - depth;
      } else if (gameBoard.isTerminal().winner === "o") {
        return -100 + depth;
      }

      return 0;
    }

    if (isMaximizing) {
      var best = -100;
      gameBoard.getAvailableMoves().forEach(function (index) {
        var newGameBoard = (0, _GameArena.GameArena)(gameBoard.getGameBoard());
        newGameBoard.insert('x', index);
        var nodeValue = getBestMove(newGameBoard, !isMaximizing, depth + 1, callback);
        best = Math.max(best, nodeValue);

        if (depth === 0) {
          var moves = nodesMap.has(nodeValue) ? "".concat(nodesMap.get(nodeValue), ", ").concat(index, " ") : index;
          nodesMap.set(nodeValue, moves);
        }
      });

      if (depth === 0) {
        var bestIndex = "";

        if (typeof nodesMap.get(best) === 'string') {
          var arr = nodesMap.get(best).split(',');
          var rand = Math.floor(Math.random() * arr.length);
          bestIndex = arr[rand];
        } else {
          bestIndex = nodesMap.get(best);
        }

        callback(bestIndex);
        return bestIndex;
      }

      return best;
    } else {
      var _best = 100;
      gameBoard.getAvailableMoves().forEach(function (index) {
        var newGameBoard = (0, _GameArena.GameArena)(gameBoard.getGameBoard());
        newGameBoard.insert('o', index);
        var nodeValue = getBestMove(newGameBoard, !isMaximizing, depth + 1, callback);
        _best = Math.min(_best, nodeValue);

        if (depth === 0) {
          var moves = nodesMap.has(nodeValue) ? "".concat(nodesMap.get(nodeValue), ",").concat(index) : index;
          nodesMap.set(nodeValue, moves);
        }
      });

      if (depth === 0) {
        var _bestIndex = "";

        if (typeof nodesMap.get(_best) === "string") {
          var _arr = nodesMap.get(_best).split(',');

          var _rand = Math.floor(Math.random() * _arr.length);

          _bestIndex = _arr[_rand];
        } else {
          _bestIndex = nodesMap.get(_best);
        }

        callback(_bestIndex);
        return _bestIndex;
      }

      return _best;
    }
  };

  return {
    getMaxDepth: getMaxDepth,
    getNodesMap: getNodesMap,
    getBestMove: getBestMove
  };
};

exports.Player = Player;
},{"./GameArena":"factoryFunctions/GameArena.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _GameArena = require("./factoryFunctions/GameArena");

var _Player = require("./factoryFunctions/Player");

var gameArena = (0, _GameArena.GameArena)(["x", "o", "", "", "", "", "o", "", "x"]);
gameArena.printFormattedBoard();
var player = (0, _Player.Player)();
console.log(player.getBestMove(gameArena, false));
console.log(player.getNodesMap());
},{"./factoryFunctions/GameArena":"factoryFunctions/GameArena.js","./factoryFunctions/Player":"factoryFunctions/Player.js"}],"../../../../../home/vaibhavsethia07/.nvm/versions/node/v16.13.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59652" + '/');

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
},{}]},{},["../../../../../home/vaibhavsethia07/.nvm/versions/node/v16.13.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map
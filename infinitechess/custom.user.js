// ==UserScript==
// @name         InfinityChess Custom
// @namespace    http://github.com/ScorpioneOrzion/tampermonkey
// @version      0.1
// @description  custom infiniteChess
// @author       ScorpioneOrzion
// @match        https://www.infinitechess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=infinitechess.org
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ScorpioneOrzion/tampermonkey/master/infinitechess/custom.user.js
// @downloadURL  https://raw.githubusercontent.com/ScorpioneOrzion/tampermonkey/master/infinitechess/custom.user.js
// ==/UserScript==

(function() {
    'use strict';
    legalmoves.moves_RemoveOccupiedByFriendlyPiece = function (gamefile, moves, color) {

    for (let i = moves.length - 1; i >= 0; i--) {
      const thisMove = moves[i]

      // Is there a piece on this square?
      const pieceAtSquare = gamefile.getPieceTypeAtCoords(thisMove)
      if (!pieceAtSquare) continue; // Next move if there is no square here

      // Do the colors match?
      const pieceAtSquareColor = pieces.getPieceColor(pieceAtSquare)

      // If they match colors, move is illegal because we cannot capture friendly pieces. Remove the move.
      if (color === pieceAtSquareColor || color === "grey") moves.splice(i, 1)
    }

    return moves;
  }
    
    legalmoves.queens = function () {
      return {
        individual: [
          [-2, 1], [-1, 2], [1, 2], [2, 1],
          [-2, -1], [-1, -2], [1, -2], [2, -1]
        ],
        horizontal: [-Infinity, Infinity],
        vertical: [-Infinity, Infinity],
        diagonalUp: [-Infinity, Infinity], // These represent the x limit of the piece sliding diagonally
        diagonalDown: [-Infinity, Infinity]
      }
    }
})();

exports.id = "react-syntax-highlighter_languages_refractor_brainfuck";
exports.ids = ["react-syntax-highlighter_languages_refractor_brainfuck"];
exports.modules = {

/***/ "./node_modules/refractor/lang/brainfuck.js":
/*!**************************************************!*\
  !*** ./node_modules/refractor/lang/brainfuck.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


module.exports = brainfuck
brainfuck.displayName = 'brainfuck'
brainfuck.aliases = []
function brainfuck(Prism) {
  Prism.languages.brainfuck = {
    pointer: {
      pattern: /<|>/,
      alias: 'keyword'
    },
    increment: {
      pattern: /\+/,
      alias: 'inserted'
    },
    decrement: {
      pattern: /-/,
      alias: 'deleted'
    },
    branching: {
      pattern: /\[|\]/,
      alias: 'important'
    },
    operator: /[.,]/,
    comment: /\S+/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_brainfuck.render-page.js.map
exports.id = "react-syntax-highlighter_languages_refractor_oz";
exports.ids = ["react-syntax-highlighter_languages_refractor_oz"];
exports.modules = {

/***/ "./node_modules/refractor/lang/oz.js":
/*!*******************************************!*\
  !*** ./node_modules/refractor/lang/oz.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = oz
oz.displayName = 'oz'
oz.aliases = []
function oz(Prism) {
  Prism.languages.oz = {
    comment: /\/\*[\s\S]*?\*\/|%.*/,
    string: {
      pattern: /"(?:[^"\\]|\\[\s\S])*"/,
      greedy: true
    },
    atom: {
      pattern: /'(?:[^'\\]|\\[\s\S])*'/,
      greedy: true,
      alias: 'builtin'
    },
    keyword: /\$|\[\]|\b(?:_|at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\b/,
    function: [
      /\b[a-z][A-Za-z\d]*(?=\()/,
      {
        pattern: /(\{)[A-Z][A-Za-z\d]*\b/,
        lookbehind: true
      }
    ],
    number: /\b(?:0[bx][\da-f]+|\d+(?:\.\d*)?(?:e~?\d+)?)\b|&(?:[^\\]|\\(?:\d{3}|.))/i,
    variable: /\b[A-Z][A-Za-z\d]*|`(?:[^`\\]|\\.)+`/,
    'attr-name': /\w+(?=:)/,
    operator: /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!!?|[|#+\-*\/,~^@]|\b(?:andthen|div|mod|orelse)\b/,
    punctuation: /[\[\](){}.:;?]/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_oz.render-page.js.map
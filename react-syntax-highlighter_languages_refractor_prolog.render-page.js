exports.id = "react-syntax-highlighter_languages_refractor_prolog";
exports.ids = ["react-syntax-highlighter_languages_refractor_prolog"];
exports.modules = {

/***/ "./node_modules/refractor/lang/prolog.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/prolog.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


module.exports = prolog
prolog.displayName = 'prolog'
prolog.aliases = []
function prolog(Prism) {
  Prism.languages.prolog = {
    // Syntax depends on the implementation
    comment: [/%.+/, /\/\*[\s\S]*?\*\//],
    // Depending on the implementation, strings may allow escaped newlines and quote-escape
    string: {
      pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
    variable: /\b[A-Z_]\w*/,
    // FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?
    function: /\b[a-z]\w*(?:(?=\()|\/\d+)/,
    number: /\b\d+(?:\.\d*)?/,
    // Custom operators are allowed
    operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
    punctuation: /[(){}\[\],]/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_prolog.render-page.js.map
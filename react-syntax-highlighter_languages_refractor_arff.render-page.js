exports.id = "react-syntax-highlighter_languages_refractor_arff";
exports.ids = ["react-syntax-highlighter_languages_refractor_arff"];
exports.modules = {

/***/ "./node_modules/refractor/lang/arff.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/arff.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


module.exports = arff
arff.displayName = 'arff'
arff.aliases = []
function arff(Prism) {
  Prism.languages.arff = {
    comment: /%.*/,
    string: {
      pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    keyword: /@(?:attribute|data|end|relation)\b/i,
    number: /\b\d+(?:\.\d+)?\b/,
    punctuation: /[{},]/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_arff.render-page.js.map
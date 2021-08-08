exports.id = "react-syntax-highlighter_languages_refractor_bnf";
exports.ids = ["react-syntax-highlighter_languages_refractor_bnf"];
exports.modules = {

/***/ "./node_modules/refractor/lang/bnf.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/bnf.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


module.exports = bnf
bnf.displayName = 'bnf'
bnf.aliases = ['rbnf']
function bnf(Prism) {
  Prism.languages.bnf = {
    string: {
      pattern: /"[^\r\n"]*"|'[^\r\n']*'/
    },
    definition: {
      pattern: /<[^<>\r\n\t]+>(?=\s*::=)/,
      alias: ['rule', 'keyword'],
      inside: {
        punctuation: /^<|>$/
      }
    },
    rule: {
      pattern: /<[^<>\r\n\t]+>/,
      inside: {
        punctuation: /^<|>$/
      }
    },
    operator: /::=|[|()[\]{}*+?]|\.{3}/
  }
  Prism.languages.rbnf = Prism.languages.bnf
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_bnf.render-page.js.map
exports.id = "react-syntax-highlighter_languages_refractor_yang";
exports.ids = ["react-syntax-highlighter_languages_refractor_yang"];
exports.modules = {

/***/ "./node_modules/refractor/lang/yang.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/yang.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


module.exports = yang
yang.displayName = 'yang'
yang.aliases = []
function yang(Prism) {
  Prism.languages.yang = {
    // https://tools.ietf.org/html/rfc6020#page-34
    // http://www.yang-central.org/twiki/bin/view/Main/YangExamples
    comment: /\/\*[\s\S]*?\*\/|\/\/.*/,
    string: {
      pattern: /"(?:[^\\"]|\\.)*"|'[^']*'/,
      greedy: true
    },
    keyword: {
      pattern: /(^|[{};\r\n][ \t]*)[a-z_][\w.-]*/i,
      lookbehind: true
    },
    namespace: {
      pattern: /(\s)[a-z_][\w.-]*(?=:)/i,
      lookbehind: true
    },
    boolean: /\b(?:false|true)\b/,
    operator: /\+/,
    punctuation: /[{};:]/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_yang.render-page.js.map
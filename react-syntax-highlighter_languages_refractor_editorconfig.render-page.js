exports.id = "react-syntax-highlighter_languages_refractor_editorconfig";
exports.ids = ["react-syntax-highlighter_languages_refractor_editorconfig"];
exports.modules = {

/***/ "./node_modules/refractor/lang/editorconfig.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/editorconfig.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


module.exports = editorconfig
editorconfig.displayName = 'editorconfig'
editorconfig.aliases = []
function editorconfig(Prism) {
  Prism.languages.editorconfig = {
    // https://editorconfig-specification.readthedocs.io/en/latest/
    comment: /[;#].*/,
    section: {
      pattern: /(^[ \t]*)\[.+]/m,
      lookbehind: true,
      alias: 'keyword',
      inside: {
        regex: /\\\\[\[\]{},!?.*]/,
        // Escape special characters with '\\'
        operator: /[!?]|\.\.|\*{1,2}/,
        punctuation: /[\[\]{},]/
      }
    },
    property: {
      pattern: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m,
      lookbehind: true
    },
    value: {
      pattern: /=.*/,
      alias: 'string',
      inside: {
        punctuation: /^=/
      }
    }
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_editorconfig.render-page.js.map
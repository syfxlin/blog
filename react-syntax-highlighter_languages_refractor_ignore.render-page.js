exports.id = "react-syntax-highlighter_languages_refractor_ignore";
exports.ids = ["react-syntax-highlighter_languages_refractor_ignore"];
exports.modules = {

/***/ "./node_modules/refractor/lang/ignore.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/ignore.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


module.exports = ignore
ignore.displayName = 'ignore'
ignore.aliases = []
function ignore(Prism) {
  ;(function (Prism) {
    Prism.languages.ignore = {
      // https://git-scm.com/docs/gitignore
      comment: /^#.*/m,
      entry: {
        pattern: /\S(?:.*(?:(?:\\ )|\S))?/,
        alias: 'string',
        inside: {
          operator: /^!|\*\*?|\?/,
          regex: {
            pattern: /(^|[^\\])\[[^\[\]]*\]/,
            lookbehind: true
          },
          punctuation: /\//
        }
      }
    }
    Prism.languages.gitignore = Prism.languages.ignore
    Prism.languages.hgignore = Prism.languages.ignore
    Prism.languages.npmignore = Prism.languages.ignore
  })(Prism)
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_ignore.render-page.js.map
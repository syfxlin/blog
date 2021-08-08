exports.id = "react-syntax-highlighter_languages_refractor_hsts";
exports.ids = ["react-syntax-highlighter_languages_refractor_hsts"];
exports.modules = {

/***/ "./node_modules/refractor/lang/hsts.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/hsts.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


module.exports = hsts
hsts.displayName = 'hsts'
hsts.aliases = []
function hsts(Prism) {
  /**
   * Original by Scott Helme.
   *
   * Reference: https://scotthelme.co.uk/hsts-cheat-sheet/
   */
  Prism.languages.hsts = {
    directive: {
      pattern: /\b(?:max-age=|includeSubDomains|preload)/,
      alias: 'keyword'
    },
    safe: {
      pattern: /\b\d{8,}\b/,
      alias: 'selector'
    },
    unsafe: {
      pattern: /\b\d{1,7}\b/,
      alias: 'function'
    }
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_hsts.render-page.js.map
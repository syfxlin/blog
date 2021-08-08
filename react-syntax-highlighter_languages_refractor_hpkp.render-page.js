exports.id = "react-syntax-highlighter_languages_refractor_hpkp";
exports.ids = ["react-syntax-highlighter_languages_refractor_hpkp"];
exports.modules = {

/***/ "./node_modules/refractor/lang/hpkp.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/hpkp.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


module.exports = hpkp
hpkp.displayName = 'hpkp'
hpkp.aliases = []
function hpkp(Prism) {
  /**
   * Original by Scott Helme.
   *
   * Reference: https://scotthelme.co.uk/hpkp-cheat-sheet/
   */
  Prism.languages.hpkp = {
    directive: {
      pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
      alias: 'keyword'
    },
    safe: {
      pattern: /\b\d{7,}\b/,
      alias: 'selector'
    },
    unsafe: {
      pattern: /\b\d{1,6}\b/,
      alias: 'function'
    }
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_hpkp.render-page.js.map
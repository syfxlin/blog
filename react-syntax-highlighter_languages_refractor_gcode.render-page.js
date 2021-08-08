exports.id = "react-syntax-highlighter_languages_refractor_gcode";
exports.ids = ["react-syntax-highlighter_languages_refractor_gcode"];
exports.modules = {

/***/ "./node_modules/refractor/lang/gcode.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/gcode.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = gcode
gcode.displayName = 'gcode'
gcode.aliases = []
function gcode(Prism) {
  Prism.languages.gcode = {
    comment: /;.*|\B\(.*?\)\B/,
    string: {
      pattern: /"(?:""|[^"])*"/,
      greedy: true
    },
    keyword: /\b[GM]\d+(?:\.\d+)?\b/,
    property: /\b[A-Z]/,
    checksum: {
      pattern: /\*\d+/,
      alias: 'punctuation'
    },
    // T0:0:0
    punctuation: /:/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_gcode.render-page.js.map
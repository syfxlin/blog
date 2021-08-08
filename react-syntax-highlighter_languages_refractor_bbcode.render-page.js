exports.id = "react-syntax-highlighter_languages_refractor_bbcode";
exports.ids = ["react-syntax-highlighter_languages_refractor_bbcode"];
exports.modules = {

/***/ "./node_modules/refractor/lang/bbcode.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/bbcode.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


module.exports = bbcode
bbcode.displayName = 'bbcode'
bbcode.aliases = ['shortcode']
function bbcode(Prism) {
  Prism.languages.bbcode = {
    tag: {
      pattern: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))*\s*\]/,
      inside: {
        tag: {
          pattern: /^\[\/?[^\s=\]]+/,
          inside: {
            punctuation: /^\[\/?/
          }
        },
        'attr-value': {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+)/i,
          inside: {
            punctuation: [
              /^=/,
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: true
              }
            ]
          }
        },
        punctuation: /\]/,
        'attr-name': /[^\s=\]]+/
      }
    }
  }
  Prism.languages.shortcode = Prism.languages.bbcode
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_bbcode.render-page.js.map
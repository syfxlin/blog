exports.id = "react-syntax-highlighter_languages_refractor_phpExtras";
exports.ids = ["react-syntax-highlighter_languages_refractor_phpExtras"];
exports.modules = {

/***/ "./node_modules/refractor/lang/php-extras.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/php-extras.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var refractorPhp = __webpack_require__(/*! ./php.js */ "./node_modules/refractor/lang/php.js")
module.exports = phpExtras
phpExtras.displayName = 'phpExtras'
phpExtras.aliases = []
function phpExtras(Prism) {
  Prism.register(refractorPhp)
  Prism.languages.insertBefore('php', 'variable', {
    this: /\$this\b/,
    global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
    scope: {
      pattern: /\b[\w\\]+::/,
      inside: {
        keyword: /static|self|parent/,
        punctuation: /::|\\/
      }
    }
  })
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_phpExtras.render-page.js.map
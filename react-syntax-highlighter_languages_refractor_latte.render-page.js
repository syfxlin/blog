exports.id = "react-syntax-highlighter_languages_refractor_latte";
exports.ids = ["react-syntax-highlighter_languages_refractor_latte"];
exports.modules = {

/***/ "./node_modules/refractor/lang/latte.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/latte.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var refractorMarkupTemplating = __webpack_require__(/*! ./markup-templating.js */ "./node_modules/refractor/lang/markup-templating.js")
var refractorPhp = __webpack_require__(/*! ./php.js */ "./node_modules/refractor/lang/php.js")
module.exports = latte
latte.displayName = 'latte'
latte.aliases = []
function latte(Prism) {
  Prism.register(refractorMarkupTemplating)
  Prism.register(refractorPhp)
  ;(function (Prism) {
    Prism.languages.latte = {
      comment: /^\{\*[\s\S]*/,
      ld: {
        pattern: /^\{(?:[=_]|\/?(?!\d|\w+\()\w+|)/,
        inside: {
          punctuation: /^\{\/?/,
          tag: {
            pattern: /.+/,
            alias: 'important'
          }
        }
      },
      rd: {
        pattern: /\}$/,
        inside: {
          punctuation: /.+/
        }
      },
      php: {
        pattern: /\S(?:[\s\S]*\S)?/,
        alias: 'language-php',
        inside: Prism.languages.php
      }
    }
    var markupLatte = Prism.languages.extend('markup', {})
    Prism.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'n-attr': {
          pattern: /n:[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+))?/,
          inside: {
            'attr-name': {
              pattern: /^[^\s=]+/,
              alias: 'important'
            },
            'attr-value': {
              pattern: /=[\s\S]+/,
              inside: {
                punctuation: [
                  /^=/,
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ],
                php: {
                  pattern: /\S(?:[\s\S]*\S)?/,
                  inside: Prism.languages.php
                }
              }
            }
          }
        }
      },
      markupLatte.tag
    )
    Prism.hooks.add('before-tokenize', function (env) {
      if (env.language !== 'latte') {
        return
      }
      var lattePattern = /\{\*[\s\S]*?\*\}|\{[^'"\s{}*](?:[^"'/{}]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|\/\*(?:[^*]|\*(?!\/))*\*\/)*?\}/g
      Prism.languages['markup-templating'].buildPlaceholders(
        env,
        'latte',
        lattePattern
      )
      env.grammar = markupLatte
    })
    Prism.hooks.add('after-tokenize', function (env) {
      Prism.languages['markup-templating'].tokenizePlaceholders(env, 'latte')
    })
  })(Prism)
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_latte.render-page.js.map
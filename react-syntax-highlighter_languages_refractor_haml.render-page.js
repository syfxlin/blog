exports.id = "react-syntax-highlighter_languages_refractor_haml";
exports.ids = ["react-syntax-highlighter_languages_refractor_haml"];
exports.modules = {

/***/ "./node_modules/refractor/lang/haml.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/haml.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var refractorRuby = __webpack_require__(/*! ./ruby.js */ "./node_modules/refractor/lang/ruby.js")
module.exports = haml
haml.displayName = 'haml'
haml.aliases = []
function haml(Prism) {
  Prism.register(refractorRuby)
  /* TODO
Handle multiline code after tag
%foo= some |
multiline |
code |
*/
  ;(function (Prism) {
    Prism.languages.haml = {
      // Multiline stuff should appear before the rest
      'multiline-comment': {
        pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ].+)*/,
        lookbehind: true,
        alias: 'comment'
      },
      'multiline-code': [
        {
          pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ].*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ].+)/,
          lookbehind: true,
          inside: Prism.languages.ruby
        },
        {
          pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ].*\|[\t ]*)*/,
          lookbehind: true,
          inside: Prism.languages.ruby
        }
      ],
      // See at the end of the file for known filters
      filter: {
        pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/,
        lookbehind: true,
        inside: {
          'filter-name': {
            pattern: /^:[\w-]+/,
            alias: 'variable'
          }
        }
      },
      markup: {
        pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
        lookbehind: true,
        inside: Prism.languages.markup
      },
      doctype: {
        pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
        lookbehind: true
      },
      tag: {
        // Allows for one nested group of braces
        pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^{}])+\}|\[[^\]]+\])*[\/<>]*/,
        lookbehind: true,
        inside: {
          attributes: [
            {
              // Lookbehind tries to prevent interpolations from breaking it all
              // Allows for one nested group of braces
              pattern: /(^|[^#])\{(?:\{[^}]+\}|[^{}])+\}/,
              lookbehind: true,
              inside: Prism.languages.ruby
            },
            {
              pattern: /\([^)]+\)/,
              inside: {
                'attr-value': {
                  pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                  lookbehind: true
                },
                'attr-name': /[\w:-]+(?=\s*!?=|\s*[,)])/,
                punctuation: /[=(),]/
              }
            },
            {
              pattern: /\[[^\]]+\]/,
              inside: Prism.languages.ruby
            }
          ],
          punctuation: /[<>]/
        }
      },
      code: {
        pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
        lookbehind: true,
        inside: Prism.languages.ruby
      },
      // Interpolations in plain text
      interpolation: {
        pattern: /#\{[^}]+\}/,
        inside: {
          delimiter: {
            pattern: /^#\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.ruby
        }
      },
      punctuation: {
        pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
        lookbehind: true
      }
    }
    var filter_pattern =
      '((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+' // Non exhaustive list of available filters and associated languages
    var filters = [
      'css',
      {
        filter: 'coffee',
        language: 'coffeescript'
      },
      'erb',
      'javascript',
      'less',
      'markdown',
      'ruby',
      'scss',
      'textile'
    ]
    var all_filters = {}
    for (var i = 0, l = filters.length; i < l; i++) {
      var filter = filters[i]
      filter =
        typeof filter === 'string'
          ? {
              filter: filter,
              language: filter
            }
          : filter
      if (Prism.languages[filter.language]) {
        all_filters['filter-' + filter.filter] = {
          pattern: RegExp(
            filter_pattern.replace('{{filter_name}}', function () {
              return filter.filter
            })
          ),
          lookbehind: true,
          inside: {
            'filter-name': {
              pattern: /^:[\w-]+/,
              alias: 'variable'
            },
            rest: Prism.languages[filter.language]
          }
        }
      }
    }
    Prism.languages.insertBefore('haml', 'filter', all_filters)
  })(Prism)
}


/***/ }),

/***/ "./node_modules/refractor/lang/ruby.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/ruby.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


module.exports = ruby
ruby.displayName = 'ruby'
ruby.aliases = ['rb']
function ruby(Prism) {
  /**
   * Original by Samuel Flores
   *
   * Adds the following new token classes:
   *     constant, builtin, variable, symbol, regex
   */
  ;(function (Prism) {
    Prism.languages.ruby = Prism.languages.extend('clike', {
      comment: [
        /#.*/,
        {
          pattern: /^=begin\s[\s\S]*?^=end/m,
          greedy: true
        }
      ],
      'class-name': {
        pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
    })
    var interpolation = {
      pattern: /#\{[^}]+\}/,
      inside: {
        delimiter: {
          pattern: /^#\{|\}$/,
          alias: 'tag'
        },
        rest: Prism.languages.ruby
      }
    }
    delete Prism.languages.ruby.function
    Prism.languages.insertBefore('ruby', 'keyword', {
      regex: [
        {
          pattern: RegExp(
            /%r/.source +
              '(?:' +
              [
                /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/
                  .source,
                /\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/.source, // Here we need to specifically allow interpolation
                /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/.source,
                /\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/.source,
                /<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/.source
              ].join('|') +
              ')'
          ),
          greedy: true,
          inside: {
            interpolation: interpolation
          }
        },
        {
          pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
          lookbehind: true,
          greedy: true
        }
      ],
      variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
      symbol: {
        pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
        lookbehind: true
      },
      'method-definition': {
        pattern: /(\bdef\s+)[\w.]+/,
        lookbehind: true,
        inside: {
          function: /\w+$/,
          rest: Prism.languages.ruby
        }
      }
    })
    Prism.languages.insertBefore('ruby', 'number', {
      builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
      constant: /\b[A-Z]\w*(?:[?!]|\b)/
    })
    Prism.languages.ruby.string = [
      {
        pattern: RegExp(
          /%[qQiIwWxs]?/.source +
            '(?:' +
            [
              /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
              /\((?:[^()\\]|\\[\s\S])*\)/.source, // Here we need to specifically allow interpolation
              /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/.source,
              /\[(?:[^\[\]\\]|\\[\s\S])*\]/.source,
              /<(?:[^<>\\]|\\[\s\S])*>/.source
            ].join('|') +
            ')'
        ),
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
        greedy: true,
        inside: {
          interpolation: interpolation
        }
      }
    ]
    Prism.languages.rb = Prism.languages.ruby
  })(Prism)
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_haml.render-page.js.map
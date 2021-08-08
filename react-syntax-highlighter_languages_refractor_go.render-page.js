exports.id = "react-syntax-highlighter_languages_refractor_go";
exports.ids = ["react-syntax-highlighter_languages_refractor_go"];
exports.modules = {

/***/ "./node_modules/refractor/lang/go.js":
/*!*******************************************!*\
  !*** ./node_modules/refractor/lang/go.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = go
go.displayName = 'go'
go.aliases = []
function go(Prism) {
  Prism.languages.go = Prism.languages.extend('clike', {
    string: {
      pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      greedy: true
    },
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/
  })
  delete Prism.languages.go['class-name']
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_go.render-page.js.map
exports.id = "react-syntax-highlighter_languages_refractor_nand2tetrisHdl";
exports.ids = ["react-syntax-highlighter_languages_refractor_nand2tetrisHdl"];
exports.modules = {

/***/ "./node_modules/refractor/lang/nand2tetris-hdl.js":
/*!********************************************************!*\
  !*** ./node_modules/refractor/lang/nand2tetris-hdl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = nand2tetrisHdl
nand2tetrisHdl.displayName = 'nand2tetrisHdl'
nand2tetrisHdl.aliases = []
function nand2tetrisHdl(Prism) {
  Prism.languages['nand2tetris-hdl'] = {
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    keyword: /\b(?:CHIP|IN|OUT|PARTS|BUILTIN|CLOCKED)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /[A-Za-z][A-Za-z0-9]*(?=\()/,
    number: /\b\d+\b/,
    operator: /=|\.\./,
    punctuation: /[{}[\];(),:]/
  }
}


/***/ })

};
;
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_nand2tetrisHdl.render-page.js.map
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.blockEditor}()},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(2),l=n(1);Object(o.registerBlockType)("namespace/blockname",{title:"Sample Block",icon:"smiley",category:"layout",attributes:{content:{type:"array",source:"children",selector:"p"},alignment:{type:"string",default:"none"}},example:{attributes:{content:"Hello World",alignment:"right"}},edit:function(e){var t=e.attributes,n=t.content,o=t.alignment,c=e.setAttributes,i=e.className;return Object(r.createElement)("div",null,Object(r.createElement)(l.BlockControls,null,Object(r.createElement)(l.AlignmentToolbar,{value:o,onChange:function(e){c({alignment:void 0===e?"none":e})}})),Object(r.createElement)(l.RichText,{tagName:"p",className:i,onChange:function(e){c({content:e})},value:n,style:{textAlign:o}}))},save:function(e){return Object(r.createElement)(l.RichText.Content,{tagName:"p",value:e.attributes.content,className:"gutenberg-examples-align-".concat(e.attributes.alignment)})}})}]);
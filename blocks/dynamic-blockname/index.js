!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.blocks}()},,function(e,t){!function(){e.exports=this.wp.data}()},,,,,function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(1),i=n(3);Object(o.registerBlockType)("namespace/dynamic-blockname",{title:"Sample Dynamic Block",icon:"megaphone",category:"widgets",edit:Object(i.withSelect)((function(e){return{posts:e("core").getEntityRecords("postType","post")}}))((function(e){var t=e.posts,n=e.className;if(!t)return"Loading…";if(t&&0===t.length)return"No posts";var o=t[0];return Object(r.createElement)("a",{className:n,href:o.link},o.title.rendered)}))})}]);
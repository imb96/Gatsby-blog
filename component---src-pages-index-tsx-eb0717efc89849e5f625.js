(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[691],{7091:function(t){"use strict";var e="%[a-f0-9]{2}",r=new RegExp("("+e+")|([^%]+?)","gi"),n=new RegExp("("+e+")+","gi");function o(t,e){try{return[decodeURIComponent(t.join(""))]}catch(a){}if(1===t.length)return t;e=e||1;var r=t.slice(0,e),n=t.slice(e);return Array.prototype.concat.call([],o(r),o(n))}function a(t){try{return decodeURIComponent(t)}catch(a){for(var e=t.match(r)||[],n=1;n<e.length;n++)e=(t=o(e,n).join("")).match(r)||[];return t}}t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var r={"%FE%FF":"��","%FF%FE":"��"},o=n.exec(t);o;){try{r[o[0]]=decodeURIComponent(o[0])}catch(e){var i=a(o[0]);i!==o[0]&&(r[o[0]]=i)}o=n.exec(t)}r["%C2"]="�";for(var u=Object.keys(r),c=0;c<u.length;c++){var s=u[c];t=t.replace(new RegExp(s,"g"),r[s])}return t}(t)}}},8616:function(t){"use strict";t.exports=function(t,e){for(var r={},n=Object.keys(t),o=Array.isArray(e),a=0;a<n.length;a++){var i=n[a],u=t[i];(o?-1!==e.indexOf(i):e(i,u,t))&&(r[i]=u)}return r}},2203:function(t,e,r){"use strict";var n=r(8416),o=r(7424),a=r(861);function i(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var c=r(8936),s=r(7091),l=r(4734),f=r(8616),p=Symbol("encodeFragmentIdentifier");function d(t){if("string"!=typeof t||1!==t.length)throw new TypeError("arrayFormatSeparator must be single character string")}function y(t,e){return e.encode?e.strict?c(t):encodeURIComponent(t):t}function g(t,e){return e.decode?s(t):t}function m(t){return Array.isArray(t)?t.sort():"object"==typeof t?m(Object.keys(t)).sort((function(t,e){return Number(t)-Number(e)})).map((function(e){return t[e]})):t}function x(t){var e=t.indexOf("#");return-1!==e&&(t=t.slice(0,e)),t}function v(t){var e=(t=x(t)).indexOf("?");return-1===e?"":t.slice(e+1)}function b(t,e){return e.parseNumbers&&!Number.isNaN(Number(t))&&"string"==typeof t&&""!==t.trim()?t=Number(t):!e.parseBooleans||null===t||"true"!==t.toLowerCase()&&"false"!==t.toLowerCase()||(t="true"===t.toLowerCase()),t}function h(t,e){d((e=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},e)).arrayFormatSeparator);var r=function(t){var e;switch(t.arrayFormat){case"index":return function(t,r,n){e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===n[t]&&(n[t]={}),n[t][e[1]]=r):n[t]=r};case"bracket":return function(t,r,n){e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"colon-list-separator":return function(t,r,n){e=/(:list)$/.exec(t),t=t.replace(/:list$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"comma":case"separator":return function(e,r,n){var o="string"==typeof r&&r.includes(t.arrayFormatSeparator),a="string"==typeof r&&!o&&g(r,t).includes(t.arrayFormatSeparator);r=a?g(r,t):r;var i=o||a?r.split(t.arrayFormatSeparator).map((function(e){return g(e,t)})):null===r?r:g(r,t);n[e]=i};case"bracket-separator":return function(e,r,n){var o=/(\[\])$/.test(e);if(e=e.replace(/\[\]$/,""),o){var a=null===r?[]:r.split(t.arrayFormatSeparator).map((function(e){return g(e,t)}));void 0!==n[e]?n[e]=[].concat(n[e],a):n[e]=a}else n[e]=r?g(r,t):r};default:return function(t,e,r){void 0!==r[t]?r[t]=[].concat(r[t],e):r[t]=e}}}(e),n=Object.create(null);if("string"!=typeof t)return n;if(!(t=t.trim().replace(/^[?#&]/,"")))return n;var a,u=i(t.split("&"));try{for(u.s();!(a=u.n()).done;){var c=a.value;if(""!==c){var s=l(e.decode?c.replace(/\+/g," "):c,"="),f=o(s,2),p=f[0],y=f[1];y=void 0===y?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?y:g(y,e),r(g(p,e),y,n)}}}catch(S){u.e(S)}finally{u.f()}for(var x=0,v=Object.keys(n);x<v.length;x++){var h=v[x],k=n[h];if("object"==typeof k&&null!==k)for(var w=0,j=Object.keys(k);w<j.length;w++){var O=j[w];k[O]=b(k[O],e)}else n[h]=b(k,e)}return!1===e.sort?n:(!0===e.sort?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((function(t,e){var r=n[e];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?t[e]=m(r):t[e]=r,t}),Object.create(null))}e.extract=v,e.parse=h,e.stringify=function(t,e){if(!t)return"";d((e=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},e)).arrayFormatSeparator);for(var r=function(r){return e.skipNull&&null==t[r]||e.skipEmptyString&&""===t[r]},n=function(t){switch(t.arrayFormat){case"index":return function(e){return function(r,n){var o=r.length;return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[y(e,t),"[",o,"]"].join("")]:[[y(e,t),"[",y(o,t),"]=",y(n,t)].join("")])}};case"bracket":return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[y(e,t),"[]"].join("")]:[[y(e,t),"[]=",y(n,t)].join("")])}};case"colon-list-separator":return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[[y(e,t),":list="].join("")]:[[y(e,t),":list=",y(n,t)].join("")])}};case"comma":case"separator":case"bracket-separator":var e="bracket-separator"===t.arrayFormat?"[]=":"=";return function(r){return function(n,o){return void 0===o||t.skipNull&&null===o||t.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[y(r,t),e,y(o,t)].join("")]:[[n,y(o,t)].join(t.arrayFormatSeparator)])}};default:return function(e){return function(r,n){return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:[].concat(a(r),null===n?[y(e,t)]:[[y(e,t),"=",y(n,t)].join("")])}}}}(e),o={},i=0,u=Object.keys(t);i<u.length;i++){var c=u[i];r(c)||(o[c]=t[c])}var s=Object.keys(o);return!1!==e.sort&&s.sort(e.sort),s.map((function(r){var o=t[r];return void 0===o?"":null===o?y(r,e):Array.isArray(o)?0===o.length&&"bracket-separator"===e.arrayFormat?y(r,e)+"[]":o.reduce(n(r),[]).join("&"):y(r,e)+"="+y(o,e)})).filter((function(t){return t.length>0})).join("&")},e.parseUrl=function(t,e){e=Object.assign({decode:!0},e);var r=l(t,"#"),n=o(r,2),a=n[0],i=n[1];return Object.assign({url:a.split("?")[0]||"",query:h(v(t),e)},e&&e.parseFragmentIdentifier&&i?{fragmentIdentifier:g(i,e)}:{})},e.stringifyUrl=function(t,r){r=Object.assign(n({encode:!0,strict:!0},p,!0),r);var o=x(t.url).split("?")[0]||"",a=e.extract(t.url),i=e.parse(a,{sort:!1}),u=Object.assign(i,t.query),c=e.stringify(u,r);c&&(c="?".concat(c));var s=function(t){var e="",r=t.indexOf("#");return-1!==r&&(e=t.slice(r)),e}(t.url);return t.fragmentIdentifier&&(s="#".concat(r[p]?y(t.fragmentIdentifier,r):t.fragmentIdentifier)),"".concat(o).concat(c).concat(s)},e.pick=function(t,r,o){o=Object.assign(n({parseFragmentIdentifier:!0},p,!1),o);var a=e.parseUrl(t,o),i=a.url,u=a.query,c=a.fragmentIdentifier;return e.stringifyUrl({url:i,query:f(u,r),fragmentIdentifier:c},o)},e.exclude=function(t,r,n){var o=Array.isArray(r)?function(t){return!r.includes(t)}:function(t,e){return!r(t,e)};return e.pick(t,o,n)}},4734:function(t){"use strict";t.exports=function(t,e){if("string"!=typeof t||"string"!=typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===e)return[t];var r=t.indexOf(e);return-1===r?[t]:[t.slice(0,r),t.slice(r+e.length)]}},8936:function(t){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,(function(t){return"%".concat(t.charCodeAt(0).toString(16).toUpperCase())}))}},3588:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return A}});var n=r(7294);var o=r(1008),a=r(1082),i=r(3431),u=["active"];var c=(0,o.Z)("div",{target:"e1kn8q5k1"})({name:"1nj8l64",styles:"display:flex;flex-wrap:wrap;width:768px;margin:0 auto 0;padding-top:40px;gap:20px;@media (max-width: 768px){width:100%;padding:40px 20px 0 20px;}"}),s=(0,o.Z)((function(t){t.active;var e=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,u);return(0,i.tZ)(a.rU,e)}),{target:"e1kn8q5k0"})("font-size:16px;color:",(function(t){return t.active?"#775fd5":"gray"}),";cursor:pointer;&:last-of-type{margin-right:0;}@media (max-width: 768px){font-size:16px;}:hover{color:#775fd5;}"),l=function(t){var e=t.selectedCategory,r=t.categoryList;return(0,i.tZ)(c,null,Object.entries(r).map((function(t){var r=t[0],n=t[1];return(0,i.tZ)(s,{className:"categoryItem",to:"/?category="+r,active:r===e,key:r},"#",r,"(",n,")")})))},f=r(203),p=r(7462);var d=(0,o.Z)(a.rU,{target:"e1eg5kak6"})({name:"m7gxp6",styles:"display:flex;flex-direction:column;border-radius:10px;box-shadow:0 0 8px rgba(0, 0, 0, 0.15);transition:0.3s box-shadow;cursor:pointer;&:hover{box-shadow:0 0 10px rgba(0, 0, 0, 0.3);}"}),y=(0,o.Z)("div",{target:"e1eg5kak5"})({name:"1do7u82",styles:"flex:1;display:flex;flex-direction:column;padding:15px"}),g=(0,o.Z)("div",{target:"e1eg5kak4"})({name:"kw2b4d",styles:"display:-webkit-box;overflow:hidden;margin-bottom:3px;text-overflow:ellipsis;white-space:normal;overflow-wrap:break-word;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:20px;font-weight:700"}),m=(0,o.Z)("div",{target:"e1eg5kak3"})({name:"xm5j9w",styles:"font-size:14px;font-weight:400;opacity:0.7"}),x=(0,o.Z)("div",{target:"e1eg5kak2"})({name:"1bobky6",styles:"display:flex;flex-wrap:wrap;margin-top:10px;margin:10px -5px"}),v=(0,o.Z)("div",{target:"e1eg5kak1"})({name:"wni62v",styles:"padding:3px 5px;border-radius:24px;font-size:14px;font-weight:500;color:#775fd5"}),b=(0,o.Z)("div",{target:"e1eg5kak0"})({name:"1wehmme",styles:"display:-webkit-box;overflow:hidden;margin-top:auto;text-overflow:ellipsis;white-space:normal;overflow-wrap:break-word;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:16px;opacity:0.8"}),h=function(t){var e=t.title,r=t.date,n=t.categories,o=t.summary,a=t.link;return(0,i.tZ)(d,{to:a},(0,i.tZ)(y,{className:"postItemContent"},(0,i.tZ)(g,{className:"postTitle"},e),(0,i.tZ)(m,null,r),(0,i.tZ)(x,null,n.map((function(t){return(0,i.tZ)(v,{key:t},"#",t)}))),(0,i.tZ)(b,null,o)))},k=function(t,e){var r=(0,n.useRef)(null),o=(0,n.useRef)(null),a=(0,n.useState)(1),i=a[0],u=a[1],c=(0,n.useMemo)((function(){return e.filter((function(e){var r=e.node.frontmatter.categories;return"All"===t||r.includes(t)}))}),[t]);return(0,n.useEffect)((function(){o.current=new IntersectionObserver((function(t,e){t[0].isIntersecting&&(u((function(t){return t+1})),e.unobserve(t[0].target))}))}),[]),(0,n.useEffect)((function(){return u(1)}),[t]),(0,n.useEffect)((function(){10*i>=c.length||null===r.current||0===r.current.children.length||null===o.current||o.current.observe(r.current.children[r.current.children.length-1])}),[i,t]),{containerRef:r,postList:c.slice(0,10*i)}};var w=(0,o.Z)("div",{target:"es8e92y0"})({name:"lfka6z",styles:"display:grid;grid-gap:20px;width:768px;margin:0 auto;padding:50px 0 100px;@media (max-width: 768px){grid-template-columns:1fr;width:100%;padding:50px 20px;}"}),j=function(t){var e=t.selectedCategory,r=t.posts,n=k(e,r),o=n.containerRef,a=n.postList;return(0,i.tZ)(w,{ref:o},a.map((function(t){var e=t.node,r=e.id,n=e.fields.slug,o=e.frontmatter;return(0,i.tZ)(h,(0,p.Z)({},o,{link:n,key:r}))})))},O=r(2203),S=r(7196),A=function(t){var e=t.location.search,r=t.data,o=r.site.siteMetadata,a=o.title,u=o.description,c=o.siteUrl,s=r.allMarkdownRemark.edges,p=r.file,d=p.childImageSharp.gatsbyImageData,y=p.publicURL,g=O.parse(e),m="string"==typeof g.category&&g.category?g.category:"All",x=(0,n.useMemo)((function(){return s.reduce((function(t,e){return e.node.frontmatter.categories.forEach((function(e){void 0===t[e]?t[e]=1:t[e]++})),t.All++,t}),{All:0})}),[]);return(0,i.tZ)(S.Z,{title:a,description:u,url:c,image:y},(0,i.tZ)(f.Z,{profileImage:d}),(0,i.tZ)(l,{selectedCategory:m,categoryList:x}),(0,i.tZ)(j,{selectedCategory:m,posts:s}))};console.log("thank you 🙏")},3897:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.__esModule=!0,t.exports.default=t.exports},5372:function(t){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},3405:function(t,e,r){var n=r(3897);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},9498:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8872:function(t){t.exports=function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,u=[],c=!0,s=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=a.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(l){s=!0,o=l}finally{try{if(!c&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return u}},t.exports.__esModule=!0,t.exports.default=t.exports},2218:function(t){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},2281:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},7424:function(t,e,r){var n=r(5372),o=r(8872),a=r(6116),i=r(2218);t.exports=function(t,e){return n(t)||o(t,e)||a(t,e)||i()},t.exports.__esModule=!0,t.exports.default=t.exports},861:function(t,e,r){var n=r(3405),o=r(9498),a=r(6116),i=r(2281);t.exports=function(t){return n(t)||o(t)||a(t)||i()},t.exports.__esModule=!0,t.exports.default=t.exports},6116:function(t,e,r){var n=r(3897);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports}}]);
//# sourceMappingURL=component---src-pages-index-tsx-eb0717efc89849e5f625.js.map
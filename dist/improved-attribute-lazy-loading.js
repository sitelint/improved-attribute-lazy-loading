!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).sitelint={})}(this,(function(e){"use strict";class t{static getBodyElement(){return document.body?document.body:document.getElementsByTagName("body")[0]}static getRootElement(){return document.documentElement||document.getElementsByTagName("html")[0]}static getCurrentVisibleViewportSize(){return t.currentVisibleViewportSize?t.currentVisibleViewportSize:{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}}static updatePageSize(){t.currentVisibleViewportSize=t.getCurrentVisibleViewportSize()}static isAnyPartOfElementRenderedOnPage(e){const i=e.getBoundingClientRect();if(0===i.height&&0===i.width)return!1;const n=t.getCurrentVisibleViewportSize(),r=i.top<=n.height&&i.top+i.height>=0,s=i.left<=n.width&&i.left+i.width>=0;return r&&s}}t.currentVisibleViewportSize=null;e.ImprovedAttributeLazyLoading=class{constructor(){this.defaultCssSelector='audio, img[loading="lazy"], video',this.mediaElements=["audio","video"],this.timeout=1e3}checkForVisibility(e){var i;const n=e;if(!1!==t.isAnyPartOfElementRenderedOnPage(n)){switch(n.nodeName.toLowerCase()){case"audio":case"video":this.mediaElements.includes(n.nodeName.toLowerCase())&&("string"==typeof n.dataset.preload?n.preload=n.dataset.preload:n.preload="metadata");break;case"img":"string"==typeof n.dataset.src&&(n.src=n.dataset.src)}null===(i=this.intersectionObserver)||void 0===i||i.unobserve(n)}}processEntry(e){window.setTimeout((()=>{window.requestAnimationFrame(this.checkForVisibility.bind(this,e.target))}),this.timeout)}handleObserver(e,t){for(const t of e)!1!==t.isIntersecting&&this.processEntry(t)}uninstall(){this.intersectionObserver instanceof IntersectionObserver&&this.intersectionObserver.disconnect(),this.handleObserverReference=void 0}install(e=1e3,i=this.defaultCssSelector){this.timeout=e;this.handleObserverReference=this.handleObserver.bind(this),this.intersectionObserver=new IntersectionObserver(this.handleObserverReference,{threshold:[0,.2,.4,.6,.8,1]});for(const e of Array.from(document.querySelectorAll(i)))t.isAnyPartOfElementRenderedOnPage(e)||("img"===e.nodeName.toLowerCase()&&(e.dataset.src=e.src,e.src=""),this.intersectionObserver.observe(e))}}}));
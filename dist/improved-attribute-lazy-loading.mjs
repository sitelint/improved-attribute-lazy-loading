class DomUtility{static getBodyElement(){return document.body?document.body:document.getElementsByTagName("body")[0]}static getRootElement(){return document.documentElement||document.getElementsByTagName("html")[0]}static getCurrentVisibleViewportSize(){return DomUtility.currentVisibleViewportSize?DomUtility.currentVisibleViewportSize:{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}}static updatePageSize(){DomUtility.currentVisibleViewportSize=DomUtility.getCurrentVisibleViewportSize()}static isAnyPartOfElementRenderedOnPage(e){const t=e.getBoundingClientRect();if(0===t.height&&0===t.width)return!1;const i=DomUtility.getCurrentVisibleViewportSize(),r=t.top<=i.height&&t.top+t.height>=0,n=t.left<=i.width&&t.left+t.width>=0;return r&&n}}DomUtility.currentVisibleViewportSize=null;class ImprovedAttributeLazyLoading{constructor(){this.defaultCssSelector='audio, img[loading="lazy"], video',this.mediaElements=["audio","video"],this.timeout=1e3}checkForVisibility(e){var t;const i=e;if(!1!==DomUtility.isAnyPartOfElementRenderedOnPage(i)){switch(i.nodeName.toLowerCase()){case"audio":case"video":this.mediaElements.includes(i.nodeName.toLowerCase())&&("string"==typeof i.dataset.preload?i.preload=i.dataset.preload:i.preload="metadata");break;case"img":"string"==typeof i.dataset.src&&(i.src=i.dataset.src)}null===(t=this.intersectionObserver)||void 0===t||t.unobserve(i)}}processEntry(e){window.setTimeout((()=>{window.requestAnimationFrame(this.checkForVisibility.bind(this,e.target))}),this.timeout)}handleObserver(e,t){for(const t of e)!1!==t.isIntersecting&&this.processEntry(t)}uninstall(){this.intersectionObserver instanceof IntersectionObserver&&this.intersectionObserver.disconnect(),this.handleObserverReference=void 0}install(e=1e3,t=this.defaultCssSelector){this.timeout=e;this.handleObserverReference=this.handleObserver.bind(this),this.intersectionObserver=new IntersectionObserver(this.handleObserverReference,{threshold:[0,.2,.4,.6,.8,1]});for(const e of Array.from(document.querySelectorAll(t)))DomUtility.isAnyPartOfElementRenderedOnPage(e)||("img"===e.nodeName.toLowerCase()&&(e.dataset.src=e.src,e.src=""),this.intersectionObserver.observe(e))}}export{ImprovedAttributeLazyLoading};
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.vlitejsPictureInPicture=e():t.vlitejsPictureInPicture=e()}(globalThis,(function(){return(()=>{"use strict";var t={748:(t,e,i)=>{var n,r,o=function(t){return t&&t.__esModule?t:{default:t}};n=[i,e,i(82)],void 0===(r=function(t,e,i){Object.defineProperty(e,"__esModule",{value:!0}),i=o(i);e.default=class{constructor({player:t}){this.providers=["html5"],this.types=["video"],this.player=t,this.video=this.player.element,this.onClickOnPipButton=this.onClickOnPipButton.bind(this),this.onEnterPictureInPicture=this.onEnterPictureInPicture.bind(this),this.onLeavePictureInPicture=this.onLeavePictureInPicture.bind(this)}init(){this.isPipApiAvailable()&&this.player.options.controls&&(this.render(),this.pipButton=this.player.container.querySelector(".v-pipButton"),this.addEvents())}isPipApiAvailable(){return"pictureInPictureEnabled"in document&&!this.video.hasAttribute("disablePictureInPicture")}render(){this.player.container.insertAdjacentHTML("beforeend",'<div class="v-captions"></div>');const t=this.player.container.querySelector(".v-fullscreenButton"),e=`<button class="v-pipButton v-controlButton">${i.default}</button>`;if(t)t.insertAdjacentHTML("beforebegin",e);else{const t=this.player.container.querySelector(".v-controlBar");t&&t.insertAdjacentHTML("beforeend",e)}}addEvents(){this.pipButton.addEventListener("click",this.onClickOnPipButton),this.video.addEventListener("enterpictureinpicture",this.onEnterPictureInPicture),this.video.addEventListener("leavepictureinpicture",this.onLeavePictureInPicture)}async onClickOnPipButton(t){t.preventDefault();try{this.video!==document.pictureInPictureElement?await this.video.requestPictureInPicture():await document.exitPictureInPicture()}catch(t){console.warn(`vlitejs :: ${t}`)}}onEnterPictureInPicture(t){}onLeavePictureInPicture(t){}}}.apply(e,n))||(t.exports=r)},82:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 11h-8v6h8v-6zm-2 4h-4v-2h4v2zm4-12H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4.98C23 3.88 22.1 3 21 3zm0 16.02H3V4.97h18v14.05z"/></svg>'}},e={};function i(n){var r=e[n];if(void 0!==r)return r.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,i),o.exports}var n={};return(()=>{var t,e=n;e.default=void 0;var r=((t=i(748))&&t.__esModule?t:{default:t}).default;e.default=r})(),n=n.default})()}));
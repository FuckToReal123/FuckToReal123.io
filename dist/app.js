!function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);var i=0;function n(t,e){this.htmlElemnt,this.value=t,this.position={vertical:e.vertical,horizontal:e.horizontal},this.id=i,i+=1}n.prototype.move=function(t,e){this.position.horizontal+=e,this.position.vertical+=t,this.position.horizontal>300&&(this.position.horizontal=300),this.position.horizontal<0&&(this.position.horizontal=0),this.position.vertical>300&&(this.position.vertical=300),this.position.vertical<0&&(this.position.vertical=0)},n.prototype.setValue=function(t){this.value=t};var r=n;function l(t){this.htmlElemnt=document.getElementById("playfield"),this.size=t,this.elements=[]}l.prototype.refresh=function(){for(var t="",e=this.htmlElemnt.getElementsByClassName("thing");e[0];)e[0].parentNode.removeChild(e[0]);console.log(this.elements),this.elements.forEach(function(e){t+='<div class="thing t'+e.value+'" style="top: '+e.position.vertical+"px; left: "+e.position.horizontal+'px;"></div>'}),console.log(t),this.htmlElemnt.innerHTML+=t},l.prototype.insertElement=function(t,e){this.elements.push(t),void 0!=e&&e()},l.prototype.getRandomFreeCell=function(){var t,e=parseInt(10*Math.random()%4),o=parseInt(10*Math.random()%4);if(0==this.elements.length)t={horizontal:100*e,vertical:100*o};else{for(var i=0;i<this.elements.length;i++){var n=this.elements[i];if(n.position.vertical==100*o&&n.position.horizontal==100*e)return this.getRandomFreeCell()}t={horizontal:100*e,vertical:100*o}}return t},l.prototype.isFreeCells=function(){return this.elements.length!==Math.pow(this.size,2)},l.prototype.addElement=function(){var t=this;(t.isFreeCells()||alert("Game Over"),t.isFreeCells())&&(Math.random()<.9?t.insertElement(new r(2,t.getRandomFreeCell()),function(){t.refresh()}):t.insertElement(new r(4,t.getRandomFreeCell()),function(){t.refresh()}))},l.prototype.isCellFree=function(t){var e=!0;return this.elements.forEach(function(o){o.merged||o.position.vertical==t.vertical&&o.position.horizontal==t.horizontal&&(e=!1)}),e},l.prototype.getElementByPosition=function(t){var e=null;return this.elements.forEach(function(o){o.position.horizontal==t.horizontal&&o.position.vertical==t.vertical&&(e=o)}),e};var s=l;function a(t){this.field=new s(t),this.moveVector={top:!1,bottom:!1,right:!1,left:!1}}a.prototype.moveElements=function(t){var e,o=this,i=0,n=0;o.moveVector.top&&(i-=100,e=function(t,e){return-1*(e.position.vertical-e.position.vertical)}),o.moveVector.bottom&&(i+=100,e=function(t,e){return-1*(t.position.vertical-e.position.vertical)}),o.moveVector.left&&(n-=100,e=function(t,e){return-1*(e.position.horizontal-t.position.horizontal)}),o.moveVector.right&&(n+=100,e=function(t,e){return-1*(t.position.horizontal-e.position.horizontal)}),o.field.elements.sort(e),o.field.elements.forEach(function(t,e,r){for(var l={vertical:t.position.vertical+i,horizontal:t.position.horizontal+n};o.field.isCellFree(l);)t.move(i,n),l.horizontal+=n,l.vertical+=i,l.horizontal>300&&(l.horizontal=300),l.horizontal<0&&(l.horizontal=0),l.vertical>300&&(l.vertical=300),l.vertical<0&&(l.vertical=0);if(!o.field.isCellFree(l)){var s=o.field.getElementByPosition(l);t.value==s.value&&t.id!=s.id&&(s.setValue(2*t.value),r[e].merged=!0)}}),o.field.elements=o.field.elements.filter(function(t){return!t.merged}),void 0!==t&&t()},a.prototype.init=function(){var t=this,e=0,o=0,i=0,n=0;window.onmousedown=function(t){e=t.clientX,o=t.clientY},window.onmouseup=function(r){i=r.clientX,n=r.clientY,(Math.abs(e-i)>50||Math.abs(o-n)>50)&&t.getMoveVector(e,i,o,n,function(){t.moveElements(function(){t.field.addElement()})})},t.field.addElement()},a.prototype.getMoveVector=function(t,e,o,i,n){console.log(Math.abs(t-e)),console.log(Math.abs(o-i)),Math.abs(e-t)>Math.abs(i-o)?t<e?(console.log("право"),this.moveVector.right=!0,this.moveVector.top=!1,this.moveVector.bottom=!1,this.moveVector.left=!1):(console.log("лево"),this.moveVector.left=!0,this.moveVector.bottom=!1,this.moveVector.top=!1,this.moveVector.right=!1):o<i?(console.log("низ"),this.moveVector.bottom=!0,this.moveVector.right=!1,this.moveVector.top=!1,this.moveVector.left=!1):(console.log("верх"),this.moveVector.top=!0,this.moveVector.left=!1,this.moveVector.bottom=!1,this.moveVector.right=!1),console.log(this.moveVector),void 0!=n&&n()};var c=new a(4);c.init(),console.log(c)}]);
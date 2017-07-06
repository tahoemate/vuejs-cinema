
// import Vue from 'vue';
import {addClass, removeClass} from './helpers';

function mouseOverHandler(ev) { 
    let span = ev.target.nextSibling;  // get tooltip span next to div
    // console.log(span.innerHTML);
    addClass(span, 'tooltip-show');
}
function mouseOutHandler(ev) { 
    let span = ev.target.nextSibling;
    // console.log(span.innerHTML);
    removeClass(span, 'tooltip-show');
}

export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                // console.log( bindings.value.seats );
                let span = document.createElement('SPAN');
                let text = document.createTextNode( `Seats avail: ${bindings.value.seats}`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                // addClass(span, 'tooltip-show' );
                el.appendChild(span);
                let div = el.getElementsByTagName('DIV')[0];
                div.addEventListener('mouseover', mouseOverHandler);
                div.addEventListener('mouseout', mouseOutHandler);
                div.addEventListener('touchstart', mouseOverHandler);  // for mobile devices
                div.addEventListener('touchend', mouseOutHandler);
            },
            unbind(el) {  // called if item goes out of dom
                let div = el.getElementsByTagName('DIV')[0];
                div.removeEventListener('mouseover', mouseOverHandler);
                div.removeEventListener('mouseout', mouseOutHandler);
                div.removeEventListener('touchstart', mouseOverHandler);
                div.removeEventListener('touchend', mouseOutHandler);
            }
        });
    }
}
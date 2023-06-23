import {cubicInOut} from 'svelte/easing'

export function resize(node, { delay = 0, duration = 300, easing = cubicInOut }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const padding_left = parseFloat(style.paddingLeft);
    const padding_right = parseFloat(style.paddingRight);
    
    return {
        delay,
        duration,
        easing,
        css: (t: number) => 
            `overflow: hidden;` +
            `opacity: ${t * opacity};` +
            `height: ${t * height}px;` +
            `padding-left: ${t * padding_left}px;` +
            `padding-right: ${t * padding_right}px;` +
            // `margin-left: ${t * margin_left}px;` +
            // `margin-right: ${t * margin_right}px;` +
            // `lineHeight: ${t * lineHeight}` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_top}px;` +
            `padding-left: ${t * padding_left}px;` +
            `padding-right: ${t * padding_right}px;` 
            // `max-height: ${t * maxHeight}px;` 
    };
}

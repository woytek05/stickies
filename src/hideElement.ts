export default function hideElement(el: HTMLElement, zIndex: number) {
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.zIndex = String(zIndex);
}

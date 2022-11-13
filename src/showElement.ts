export default function showElement(el: HTMLElement, zIndex: number) {
    el.style.opacity = "1";
    el.style.pointerEvents = "auto";
    el.style.zIndex = String(zIndex);
}

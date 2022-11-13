export default function enableButton(
    button: HTMLButtonElement,
    bgColor: string
) {
    button.disabled = false;
    button.style.cursor = "pointer";
    button.style.backgroundColor = bgColor;
}

export default function disableButton(
    button: HTMLButtonElement,
    bgColor: string
) {
    button.disabled = true;
    button.style.cursor = "not-allowed";
    button.style.backgroundColor = bgColor;
}

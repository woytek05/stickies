import enableButton from "./enableButton";
import disableButton from "./disableButton";
import createFridge from "./createFridge";
import "boxicons";

const defaultColor = "#f4bf4f";
const hoverColor = "#c3983f";
const gray = "#9b9b9b";

const sendButton = document.getElementById("send") as HTMLButtonElement;
const fridgeNameInput = document.getElementById(
    "fridgeName"
) as HTMLInputElement;

fridgeNameInput.value = "";
disableButton(sendButton, gray);

fridgeNameInput.addEventListener("input", () => {
    if (fridgeNameInput.value != "") {
        enableButton(sendButton, defaultColor);
    } else {
        disableButton(sendButton, gray);
    }
    let onlySpaces = true;
    for (const letter of fridgeNameInput.value) {
        if (letter != " ") {
            onlySpaces = false;
        }
    }
    if (onlySpaces) {
        disableButton(sendButton, gray);
    }
});

fridgeNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendButton.click();
    }
});

sendButton.addEventListener("click", () => {
    createFridge(defaultColor, hoverColor);
});

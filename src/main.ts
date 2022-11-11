import Fridge from "./fridge";
import "boxicons";

const mainColor = "#f4bf4f";
const grayColor = "#9b9b9b";

const sendButton = document.getElementById("send") as HTMLButtonElement;
const fridgeNameInput = document.getElementById(
    "fridgeName"
) as HTMLInputElement;

fridgeNameInput.addEventListener("input", () => {
    if (fridgeNameInput.value != "") {
        sendButton.disabled = false;
        sendButton.style.cursor = "pointer";
        sendButton.style.backgroundColor = mainColor;
    } else {
        sendButton.disabled = true;
        sendButton.style.cursor = "not-allowed";
        sendButton.style.backgroundColor = grayColor;
    }
});

sendButton.addEventListener("click", () => {
    const xhttp = new XMLHttpRequest();
    let el = document.getElementById("fridgeName") as HTMLInputElement;
    let fridgeName = encodeURIComponent(el.value);
    xhttp.open("POST", "php/login.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            createContainers();
            let fridge = Fridge.fromJSON(json);
        }
    };

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("fridgeName=" + fridgeName);
});

function createContainers() {
    const body = document.getElementById("body") as HTMLBodyElement;
    body.innerHTML = "";
    const div = document.createElement("div") as HTMLDivElement;
    div.setAttribute("id", "mainContainer");
    div.classList.add("mainContainer");
    const boxIcon = document.createElement("box-icon") as HTMLElement;
    boxIcon.setAttribute("id", "addPage");
    boxIcon.setAttribute("type", "solid");
    boxIcon.setAttribute("color", mainColor);
    boxIcon.setAttribute("name", "plus-square");
    div.appendChild(boxIcon);
    body.appendChild(div);
}

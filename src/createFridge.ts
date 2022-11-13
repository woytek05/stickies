import createContainers from "./createContainers";
import Fridge from "./fridge";
import showErrorMessage from "./showErrorMessage";

export default function createFridge(defaultColor: string, hoverColor: string) {
    const xhttp = new XMLHttpRequest();
    let el = document.getElementById("fridgeName") as HTMLInputElement;
    let fridgeName = encodeURIComponent(el.value);
    xhttp.open("POST", "php/login.php");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let json = JSON.parse(this.responseText);
                console.log(json);
                createContainers(defaultColor, hoverColor);
                let fridge = Fridge.fromJSON(json);
            } catch (e) {
                showErrorMessage("#f44336");
            }
        }
    };

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("fridgeName=" + fridgeName);
}

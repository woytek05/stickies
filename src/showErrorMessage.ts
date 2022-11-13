export default function showErrorMessage(fontColor: string) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.color = fontColor;
    errorMessage.innerText = "The fridge name is incorrect!";
}

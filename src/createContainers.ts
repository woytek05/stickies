import createIconContainer from "./createIconContainer";

export default function createContainers(
    defaultColor: string,
    hoverColor: string
) {
    const body = document.getElementById("body") as HTMLBodyElement;
    body.innerHTML = "";
    const mainContainer = document.createElement("div") as HTMLDivElement;
    mainContainer.setAttribute("id", "mainContainer");
    mainContainer.classList.add("mainContainer");
    const addNoteIcon = createIconContainer(
        "plus-square",
        defaultColor,
        hoverColor
    );
    addNoteIcon.id = "addNote";
    mainContainer.appendChild(addNoteIcon);
    body.appendChild(mainContainer);
}

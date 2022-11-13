export default function createIconContainer(
    name: string,
    defaultColor: string,
    hoverColor: string
) {
    const icon: HTMLElement = document.createElement("box-icon");
    icon.id = name;
    icon.setAttribute("type", "solid");
    icon.setAttribute("name", name);
    icon.setAttribute("color", defaultColor);
    icon.style.transition = "0.2s ease-in";
    icon.classList.add(name);

    icon.addEventListener("mouseover", () => {
        icon.setAttribute("color", hoverColor);
        icon.setAttribute("animation", "tada");
    });
    icon.addEventListener("mouseout", () => {
        icon.setAttribute("color", defaultColor);
        icon.setAttribute("animation", "");
    });

    return icon;
}

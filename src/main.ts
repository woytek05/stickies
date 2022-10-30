import Note from './note'

document.getElementById("addPage").addEventListener('click', () => {
    let a = new Note(document.getElementById("container") as HTMLDivElement);
    console.log(a);
});
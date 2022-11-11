import Note from "./note";
import { fridgeJson } from "./fridgeJson";

export default class Fridge {
    protected fridgeName: string = "";
    protected mainContainerID: string = "";
    protected addPageID: string = "";
    protected notes: Set<Note> = new Set();
    protected numOfActiveNotes: number = 0;
    protected numOfAllNotes: number = 0;
    protected noteID: number = 0;

    constructor(
        fridgeName: string,
        mainContainerID: string,
        addPageID: string,
        notes?: Set<Note>,
        numOfActiveNotes?: number,
        numOfAllNotes?: number
    ) {
        this.fridgeName = fridgeName;
        this.mainContainerID = mainContainerID;
        this.addPageID = addPageID;
        if (notes) {
            this.notes = notes;
        }
        if (numOfActiveNotes) {
            this.numOfActiveNotes = numOfActiveNotes;
        }
        if (numOfAllNotes) {
            this.numOfAllNotes = numOfAllNotes;
        }
        document
            .getElementById(this.addPageID)
            .addEventListener("click", () => {
                let note = new Note(
                    `${this.fridgeName}_${this.noteID}`,
                    this.mainContainerID,
                    this.fridgeName
                );
                this.noteID++;
                // TODO: zIndex
                // note.noteContainer.addEventListener("click", () => {
                //     note.zIndex;
                // });

                note.closeIconContainer.addEventListener("click", () => {
                    console.log("AAAA");
                    // note.removeNote();
                    // this.notes.delete(note);
                    // this.numOfActiveNotes--;
                    // note.send(true);
                    // this.send();
                });
                this.notes.add(note);
                this.numOfActiveNotes += 1;
                this.numOfAllNotes += 1;
                note.send(false);
                this.send();
            });
    }

    addNote(note: Note) {
        this.notes.add(note);
    }

    static fromJSON(json: fridgeJson) {
        let fridge = new Fridge(
            json.fridgeName,
            "mainContainer",
            "addPage",
            new Set<Note>(),
            json.numOfActiveNotes,
            json.numOfAllNotes
        );

        for (const note of json.notes) {
            let noteObject = new Note(
                `${fridge.fridgeName}_${fridge.noteID}`,
                "mainContainer",
                fridge.fridgeName,
                note.noteText,
                note.currentX,
                note.currentY,
                note.width,
                note.height,
                note.zIndex
            );
            fridge.addNote(noteObject);
            fridge.noteID++;
        }

        return fridge;
    }

    send() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "php/updateFridge.php");

        xhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );

        xhttp.send(
            `fridgeName=${this.fridgeName}&numOfActiveNotes=${this.numOfActiveNotes}&numOfAllNotes=${this.numOfAllNotes}`
        );
    }
}

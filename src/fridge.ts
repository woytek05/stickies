import Note from './note'

class Fridge {
    private notes: Note[] = []

    addNote(note: Note) {
        this.notes.push(note);
    }
}
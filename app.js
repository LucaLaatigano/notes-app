const createBtn = document.getElementById("create-btn")
const noteDiv = document.getElementById("notes")

const notes = []
function createNote(container) {
    const note = document.createElement("div")
    note.id= "note"


    container.appendChild(note)
    return note
}

createBtn.addEventListener("click", ()=> {
    newNote = createNote(noteDiv)
    notes.push(newNote)
    console.log(notes)
})
const createBtn = document.getElementById("create-btn")
const noteDiv = document.getElementById("notes")
const createDiv = document.getElementById("message")
const notes = []
function createNote(container, name, date) {
    const note = document.createElement("div")
    note.classList.add("note")
    const createdName = document.createElement("h3")
    createdName.classList.add("note-name")
    createdName.textContent = name
    const dateContent = document.createElement("p")
    dateContent.classList.add("date")
    dateContent.textContent = date

    note.appendChild(createdName)
    note.appendChild(dateContent)

    container.appendChild(note)    
}

createBtn.addEventListener("click", () =>{
    createDiv.style.display = "flex"
})

const create = document.getElementById("createBtn")
create.addEventListener("click", () => {
    if(createDiv.style.display === "flex"){
        createDiv.style.display = "none"
    }
    const noteName = document.getElementById("note-name")
    const name = noteName.value
    const date = new Date()
    const dateTrimed = date.toString().split(" ")
    const newDate = `${dateTrimed[1]}  ${dateTrimed[2]}  ${dateTrimed[3]}  ${dateTrimed[4]}`
    
    notes.push(name)
    createNote(noteDiv, name, newDate)
})



const backBtn = document.getElementById("backBtn")
backBtn.addEventListener("click", () =>{
    createDiv.style.display = "none"
})


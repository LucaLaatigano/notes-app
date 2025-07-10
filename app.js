const createBtn = document.getElementById("create-btn")
const noteDiv = document.getElementById("notes")
const createDiv = document.getElementById("message")
const noteName = document.getElementById("note-name")
const notes = []
function createNote(container, name, date) {
    const note = document.createElement("div")
    const nameAndDate = document.createElement("div")
    nameAndDate.id = "name-date"
    note.classList.add("note")
    const createdName = document.createElement("h3")
    createdName.classList.add("note-name")
    createdName.textContent = name
    const dateContent = document.createElement("p")
    dateContent.classList.add("date")
    dateContent.textContent = date
    const buttons = document.createElement("div")
    buttons.id = "div-buttons-note"
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "🗑️"
    deleteBtn.classList.add("deleted")
    const editBtn = document.createElement("button")
    editBtn.textContent ="✏️"

    nameAndDate.appendChild(createdName)
    nameAndDate.appendChild(dateContent)

    buttons.appendChild(deleteBtn)
    buttons.appendChild(editBtn)

    note.appendChild(nameAndDate)
    note.appendChild(buttons)

    container.appendChild(note) 
}

function deleteAnote(dBtn){
    dBtn.forEach((deleteButton)=> {

        const newButtonWithoutPastEvents = deleteButton.cloneNode(true)
        deleteButton.replaceWith(newButtonWithoutPastEvents)

        newButtonWithoutPastEvents.addEventListener("click", (e)=>{
            if(e.target.classList.contains("deleted")){
                const noteAboutToBeRemoved = e.target.closest(".note")
                if(noteAboutToBeRemoved && noteDiv && noteDiv.contains(noteAboutToBeRemoved)){
                    noteDiv.removeChild(noteAboutToBeRemoved)
                } else{
                    console.log("no papa eligio la incorrecta")
                }
            }
        })
    });
    
}

createBtn.addEventListener("click", () =>{
    noteName.value = ""
    createDiv.style.display = "flex"
})

const create = document.getElementById("createBtn")
create.addEventListener("click", () => {
    if(createDiv.style.display === "flex"){
        createDiv.style.display = "none"
    }
    const name = noteName.value
    const date = new Date()
    const dateTrimed = date.toString().split(" ")
    const newDate = `${dateTrimed[1]}  ${dateTrimed[2]}  ${dateTrimed[3]}  ${dateTrimed[4]}`
    
    notes.push(name)
    createNote(noteDiv, name, newDate)
    const deleteBtnFromNotes = document.querySelectorAll(".deleted")
    deleteAnote(deleteBtnFromNotes)
})


const backBtn = document.getElementById("backBtn")
backBtn.addEventListener("click", () =>{
    createDiv.style.display = "none"
})


console.log(notes)
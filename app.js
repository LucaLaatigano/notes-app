const createBtn = document.getElementById("create-btn")
const noteDiv = document.getElementById("notes")
const createDiv = document.getElementById("message")
const noteName = document.getElementById("note-name")
const navSection = document.getElementById("navegation")
const navDiv = document.getElementById("contains-nav")
const textArea = document.getElementById("close-notes")
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
    editBtn.classList.add("edit")

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
function editNote(title){
    const cssWholeStyle = window.getComputedStyle(navSection)
    const activeNotes = window.getComputedStyle(noteDiv)
    if(cssWholeStyle.display === "flex" && activeNotes.display === "flex"){
        navSection.style.display = "none"
        noteDiv.style.display = "none"
    } 
    const noteTitle = document.createElement("h3")
    noteTitle.textContent = title
    noteTitle.style.fontSize = "50px"
    noteTitle.style.margin = "20px 0 15px 20px"
    noteTitle.style.color = "white"
    noteTitle.classList.add("titleSet")
    const placeToWrite = document.createElement("textarea")
    placeToWrite.name = "note"
    placeToWrite.classList.add("place-to-write")

    const container = document.createElement("div");
    container.id = "buttonss";
    container.style.display = "flex";
    container.style.gap = "10px"; 
    container.style.justifyContent = "center"; 
    container.style.marginTop = "20px"; 
    
    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.classList.add("backBtn");
    
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("hola");
    saveBtn.textContent = "Saved Changes";
    
    
    container.appendChild(saveBtn);
    container.appendChild(backBtn);
    
    
    
    textArea.appendChild(placeToWrite)
    textArea.appendChild(container)
    navDiv.appendChild(noteTitle)
    goBack()
}

createBtn.addEventListener("click", () =>{
    noteName.value = ""
    createDiv.style.display = "flex"
    goBack()
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

    const editBtnFromNotes = document.querySelectorAll(".edit")
    editBtnFromNotes.forEach((ediBtn)=>{
        const newEditBtnWithoutPastEvents = ediBtn.cloneNode(true)
        ediBtn.replaceWith(newEditBtnWithoutPastEvents)
        newEditBtnWithoutPastEvents.addEventListener("click", (e) => {
            if(e.target.classList.contains("edit")){
                const container = e.target.closest(".note")
                const title = container.querySelector("h3")
                const h3Title = title.textContent
                editNote(h3Title)
            }
        })
    })
})

function goBack(){
    const backBtn = document.querySelectorAll(".backBtn")
    backBtn.forEach((buttonPressed)=>{
        buttonPressed.addEventListener("click", (e)=>{
            const noteDiplayNone = window.getComputedStyle(noteDiv)
            const navDisplatNone = window.getComputedStyle(navSection)
            if(noteDiplayNone.display === "none" && navDisplatNone.display === "none" && document.querySelectorAll(".titleSet")){
                document.querySelectorAll(".titleSet").forEach(title => {
                    title.remove();
                });
                document.querySelectorAll(".place-to-write").forEach(area => {
                    area.remove()
                })
                const btnContainer = document.getElementById("buttonss")
                if(btnContainer){
                    btnContainer.remove()
                }
                noteDiv.style.display = "flex"
                navSection.style.display = "flex"                
            } else{
                console.log("no entro al div chie")
            }
            createDiv.style.display = "none"
        })
    })
}
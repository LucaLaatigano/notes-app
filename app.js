const createBtn = document.getElementById("create-btn")
const noteDiv = document.getElementById("notes")
const createDiv = document.getElementById("message")
const noteName = document.getElementById("note-name")
const navSection = document.getElementById("navegation")
const navDiv = document.getElementById("contains-nav")
const textArea = document.getElementById("close-notes")
const notes = []



function createNote(container, title, dateOfNote) {
    const noteGetted = getNote(title, dateOfNote)
    if(noteGetted !== undefined){
        const {name, date} = noteGetted
        const note = setNoteInContainer(name, date)
        container.appendChild(note)
    } else{
        const note = setNoteInContainer(title,dateOfNote)
    
        container.appendChild(note)
        setNoteEstablish(title, dateOfNote)
    }
}
function setNoteInContainer(name, date){
    const note = document.createElement("div");
    note.classList.add("note");

    const nameAndDate = document.createElement("div");
    nameAndDate.id = "name-date";

    const createdName = document.createElement("h3");
    createdName.classList.add("note-name");
    createdName.textContent = name;

    const dateContent = document.createElement("p");
    dateContent.classList.add("date");
    dateContent.textContent = date;

    const buttons = document.createElement("div");
    buttons.id = "div-buttons-note";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("deleted");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit");

    nameAndDate.appendChild(createdName);
    nameAndDate.appendChild(dateContent);

    buttons.appendChild(deleteBtn);
    buttons.appendChild(editBtn);

    note.appendChild(nameAndDate);
    note.appendChild(buttons);

    return note; 
}


function deleteAnote(dBtn){
    dBtn.forEach((deleteButton)=> {

        const newButtonWithoutPastEvents = deleteButton.cloneNode(true)
        deleteButton.replaceWith(newButtonWithoutPastEvents)

        newButtonWithoutPastEvents.addEventListener("click", (e)=>{
            if(e.target.classList.contains("deleted")){
                const noteAboutToBeRemoved = e.target.closest(".note")
                const titleOfTheNoteAboutTobeRemoved = noteAboutToBeRemoved.querySelector("h3").textContent
                console.log(titleOfTheNoteAboutTobeRemoved)
                if(noteAboutToBeRemoved && noteDiv && noteDiv.contains(noteAboutToBeRemoved)){
                    noteDiv.removeChild(noteAboutToBeRemoved)
                    localStorage.removeItem(`note-${titleOfTheNoteAboutTobeRemoved}`)
                    Object.keys(localStorage).forEach(key => {
                        if (key.startsWith(titleOfTheNoteAboutTobeRemoved + "-")) {
                            localStorage.removeItem(key);
                        }
                    });
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
    const placeToWrite = document.createElement("textarea");
    placeToWrite.name = "note";
    placeToWrite.classList.add("place-to-write");

    const content = getContent(title);
    placeToWrite.value = content;

    console.log("Textarea value set to:", placeToWrite.value);

    textArea.appendChild(placeToWrite);
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
    saveBtn.classList.add("saveBtn");
    saveBtn.textContent = "Saved Changes";
        
        
    container.appendChild(saveBtn);
    container.appendChild(backBtn);
        
        
        
    textArea.appendChild(placeToWrite)
    textArea.appendChild(container)
    navDiv.appendChild(noteTitle)
        
    let save = document.querySelector(".saveBtn")
    const writeArea = document.querySelector(".place-to-write")
    save.addEventListener("click", ()=>{
        saveText(writeArea)
    })
    
    
    
    goBack()
    
}

function saveText(content){
    const noteTitleElement = document.querySelector(".titleSet");
    if (!noteTitleElement) {
        return;
    }
    const noteTitle = noteTitleElement.textContent.trim();
    if (noteTitle && content) {
        localStorage.setItem(`note-${noteTitle}`, content.value);
    } 
}
function setNoteEstablish(title, date){
    const noteData = {
        name: title,
        date: date
    }
    localStorage.setItem(`${title}-${date}`, JSON.stringify(noteData))
}

function getContent(title) {
    const content = localStorage.getItem(`note-${title}`);
    return content !== null ? content : "";
}

function getNote(title, date){
    const saveWholeNote = localStorage.getItem(`${title}-${date}`)
    return saveWholeNote !== null ? JSON.parse(saveWholeNote) : undefined;
}

createBtn.addEventListener("click", () =>{
    noteName.value = ""
    createDiv.style.display = "flex"
    goBack()
})

const create = document.getElementById("createBtn")
create.addEventListener("click", () => {
    if (createDiv.style.display === "flex") {
        createDiv.style.display = "none";
    }
    const name = noteName.value.trim();
    if (!name) {
        return;
    }

    const date = new Date();
    const dateTrimed = date.toString().split(" ");
    const newDate = `${dateTrimed[1]}  ${dateTrimed[2]}  ${dateTrimed[3]}  ${dateTrimed[4]}`;

    notes.push(name);
    createNote(noteDiv, name, newDate);
    localStorage.setItem(`note-${name}`, ""); // Guarda vacía al crear

    const deleteBtnFromNotes = document.querySelectorAll(".deleted");
    deleteAnote(deleteBtnFromNotes);

    const editBtnFromNotes = document.querySelectorAll(".edit");
    editBtnFromNotes.forEach((ediBtn) => {
        const newEditBtnWithoutPastEvents = ediBtn.cloneNode(true);
        ediBtn.replaceWith(newEditBtnWithoutPastEvents);
        newEditBtnWithoutPastEvents.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit")) {
                const container = e.target.closest(".note");
                const title = container.querySelector("h3");
                const h3Title = title.textContent;
                editNote(h3Title);
            }
        });
    });
});

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
            } 
            createDiv.style.display = "none"
        })
    })
}

window.addEventListener("load", () => {
  Object.keys(localStorage).forEach(key => {
    if (key.includes("-")) {
      const value = localStorage.getItem(key);
      try {
        const parsed = JSON.parse(value);
        if (parsed && parsed.name && parsed.date) {
          createNote(noteDiv, parsed.name, parsed.date);
        }
      } catch (e) {
        
      }
    }
  });

    const deleteBtnFromNotes = document.querySelectorAll(".deleted");
    deleteAnote(deleteBtnFromNotes);

    const editBtnFromNotes = document.querySelectorAll(".edit");
    editBtnFromNotes.forEach((ediBtn) => {
        const newEditBtnWithoutPastEvents = ediBtn.cloneNode(true);
        ediBtn.replaceWith(newEditBtnWithoutPastEvents);
        newEditBtnWithoutPastEvents.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
            const container = e.target.closest(".note");
            const title = container.querySelector("h3").textContent;
            editNote(title);
        }
        });
    });
});

/*last check finished*/
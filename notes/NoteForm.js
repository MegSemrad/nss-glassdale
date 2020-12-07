import { saveNote } from './NoteProvider.js'

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

       const author = document.querySelector("#author").value
       const text = document.querySelector("#text").value
       const suspect = document.querySelector("#suspect").value
       /* document.querySelector() we are grabbing the input element and that has an 
       attribute called .value - and that is what the input element holds and 
       will grab the=at information put into those boxes - if nothing was put into 
       those boxes by the browser user then the .value would be an empty string - but if someone 
       types in a number in the suspect name box then suddenly the .value of that specific
       box will be the typed suspects name*/
        
        // Make a new object representation of a note
        const newNote = {
            author: author,
            text: text, 
            suspect: suspect,
            timestamp: Date.now()
            // Key/value pairs here
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

const render = () => {
    contentTarget.innerHTML = `
        <input type="text" id="author" placeholder="author name">
        <textarea id="text" placeholder="note text"></textarea>
        <input type="text" id="suspect" placeholder="suspect name">
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}
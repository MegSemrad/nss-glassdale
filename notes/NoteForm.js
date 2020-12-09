import { saveNote } from './NoteProvider.js'

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

/*
- When this event below occurs (i.e. the Save Note" button is clicked), then all of the 
  information entered into the form boxes will need to be accessed/grabbed so we can then 
  place it in an object. 
- Therefore, below all three of the document.querySelector() items are going into those form 
  boxes and we are saving the answer in a variable. But in truth we are more concerned with the value 
  than just the info itself. So input elements have an attribute called .value that can be used 
- If nothing was entered into the boxes (or one box) and the event happend (save note button clicked) 
  than the .value would be an empty string 
*/
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

       const author = document.querySelector("#author").value
       const text = document.querySelector("#text").value
       const suspect = document.querySelector("#suspect").value
        
        const newNote = {
            author: author,
            text: text, 
            suspect: suspect,
            timestamp: Date.now()
        }

        
        /*
        - Change API state and application state
        - So the newNote is sent through the function on saveNote in NoteProvider.js
        */
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
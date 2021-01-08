import { saveNote } from './NoteProvider.js'
import { useCriminals, getCriminals } from "../criminals/criminalDataProvider.js"



// ------------------------------------------------------------------------------------------------------



const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")



// ------------------------------------------------------------------------------------------------------



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
       const criminalId = parseInt(document.querySelector("#suspect").value)
        
        const newNote = {
            author: author,
            text: text, 
            criminalId: criminalId,
            timestamp: Date.now()
        }
      
        // COuld have written the above object key:value pairs as {author, text, criminalId (but not for timestamp!)
      // this is a shorthand for Javascript when the key and value are the same}

        
        /*
        - Change API state and application state
        - So the newNote is sent through the function on saveNote in NoteProvider.js
        */
        saveNote(newNote)
    }
})



// ------------------------------------------------------------------------------------------------------



const render = () => {
    const criminalsCollection = useCriminals()
    contentTarget.innerHTML = `
        <input type="text" id="author" placeholder="author name">
        <textarea id="text" placeholder="note text"></textarea>
        <select id="suspect" class="dropdown">
          <option value="0">Please select a suspect...</option>
          ${
            criminalsCollection.map(
              (criminal) => `
                <option value=${criminal.id}>
                  ${criminal.name}
                </option>
            `)
          }
        </select>
        <button id="saveNote">Save Note</button>
    `
}
// Map over array and mutate each thing in array and each thing is an object and telling it to return a string
// Return sth from function map takes that and puts it into new array 
// End up with an array of... the new array is what gets interpalated 



// ------------------------------------------------------------------------------------------------------



export const NoteForm = () => {
  getCriminals()
  .then( () => render())
};
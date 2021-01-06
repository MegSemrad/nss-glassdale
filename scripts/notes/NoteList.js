import { getNotes, useNotes, deleteNote } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals } from "../criminals/criminalDataProvider.js"

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".noteList")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", () => {
    NoteList()
})

eventHub.addEventListener("noteStateChanged", () => {
    NoteList()
})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("deleteNote--")) {
      const [prefix, noteId] = clickEvent.target.id.split("--")

      // array destructoring 
      // produces an array ["deleteNote--", "4"] 

      /*
          Invoke the function that performs the delete operation.

          Once the operation is complete you should THEN invoke
          useNotes() and render the note list again.
      */
     deleteNote(noteId)
  }
})

const render = (noteArray, criminals) => {
    const allNotesConvertedToStrings = noteArray.map((note) =>{
      const associatedCriminal = criminals.find(
        (criminal) => {
          return criminal.id === note.criminalId
        }
      )
      note.criminalName = associatedCriminal.name
      return NoteHTMLConverter(note)
}).join("")
  
        /*
            - .map is expecting a function to be passed in as an arguement 
            - Side note: all array methods like .map() and .filter() and .find() are
              expecting an arguement that is a function
            - This above  function gives instructions are what to do with each item 
              in the array - which here is to convert the note objects to HTML 
              with NoteHTMLConverter
            - This gives back a string of HTML - because browser does not deal with
              objects (and it is objects that are within the array we are mapping)
            - allNotesConvertedToStrings value is the result of the map function and 
              the result of any .map function is an array
        */
    contentTarget.innerHTML = allNotesConvertedToStrings
}
//  The result of a map function is always an array

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Why not?
export const NoteList = () => {
    let criminals = useCriminals()
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes, criminals)
        })
}

/*
Cannot call NoteList in main.js otherwsie would load as soon as page 
loads but we want it only to load when user clicks on button 

 */
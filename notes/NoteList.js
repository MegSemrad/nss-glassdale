import { getNotes, useNotes } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./Note.js";

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

const render = (noteArray) => {
    const allNotesConvertedToStrings = noteArray.map((note) => NoteHTMLConverter(note)).join("")
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
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}

/*
Cannot call NoteList in main.js otherwsie would load as soon as page 
loads but we want it only to load when user clicks on button 

 */
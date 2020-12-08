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
        // convert the notes objects to HTML with NoteHTMLConverter
        // This gives back a string of HTML

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
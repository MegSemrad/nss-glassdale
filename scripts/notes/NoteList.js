/*
  - The function of this module is to...
  1. Keep the list of notes updated at all times. Whether a user asks to view the notes
     and needs the latest collection, one is deleted, or posted
  2. Also there is the click event for the delete button (but I don't know why...)
*/


// ------------------------------------------------------------------------------------------------------



import { getNotes, useNotes, deleteNote } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals } from "../criminals/criminalDataProvider.js";



// ------------------------------------------------------------------------------------------------------


/*
  - Query the element in which the notes will appear
*/ 
const contentTarget = document.querySelector(".noteList");
const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------

/*
   - This listens at eventHub for the click event of someone clicking on
    the "Show Notes" button 
  - Then NoteList() is invoked and which will invoked both useCriminals()
    and useNotes(). 
  - Then it is passed through render() 
*/

eventHub.addEventListener("showNotesClicked", () => {
  NoteList()
});



// ------------------------------------------------------------------------------------------------------



/*
  - This listens at eventHub for the custom event that occurs whenever someone 
    saves or deletes a note 
  - Then NoteList() is invoked and which will invoked both useCriminals()
    and useNotes(). 
  - Then it is passed through render()
  - This ensures the notes will be updated immediately upon action of user (by it
    deleting or saving a note)
*/

eventHub.addEventListener("noteStateChanged", () => {
    NoteList()
});



// ------------------------------------------------------------------------------------------------------



/*
  - Cannot call NoteList in main.js otherwsie would load as soon as page 
    loads but we want it only to load when user clicks on button 
  - This function passes through render() both the most updated version of the 
    notes and the criminals.
  - Will see below  in next section why do this...

 */

export const NoteList = () => {
    let criminals = useCriminals()
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes, criminals)
        })
};



// ------------------------------------------------------------------------------------------------------



/*
    - .map is expecting a function to be passed in as an arguement 
    - Side note: all array methods like .map() and .filter() and .find() are
      expecting an arguement that is a function

    - This below function gives instructions are what to do with each item 
      in the array - which here is to convert the note objects to HTML 
      with NoteHTMLConverter
    - This gives back a string of HTML - because browser does not deal with
      objects (and it is objects that are within the array we are mapping)
    - allNotesConvertedToStrings value is the result of the map function and 
      the result of any .map function is an array

    - Render() was invoked in an above section and passed in both the notes in their current
      state and criminals as two arguments
    - Then .map() and the instructions within this .map() function say loop over every 
      note object. For each note go into criminals and .find() the first criminal.id
      that matches the note's.criminalId. The criminal matching that criteria will 
      be stored in the const associatedCriminal for each note. 
    - Next, to note we are adding the key of criminalName using dot notation and having the value 
      equal associatedCriminal.name
    - This new note with its new key:value pair will be passed into the NoteHTMLConverter() 
      function and then .join(" ") into a single HTML string 
    - Lastly, the string will be added with .innerHTML to the contentTarget
*/

const render = (noteArray, criminals) => {
    const allNotesConvertedToStrings = noteArray.map((note) =>{
      const associatedCriminal = criminals.find(
        (criminal) => {
          return criminal.id === note.criminalId
        }
      )
      // (I think...) Here am adding with dot notation the key of criminalName to the note object 
      // and having its value equal the name taken from associatedCriminal using dot notation
      note.criminalName = associatedCriminal.name
      return NoteHTMLConverter(note)
}).join("")
  
    contentTarget.innerHTML = allNotesConvertedToStrings
};



// ------------------------------------------------------------------------------------------------------

// Why is this function here?

/*
  - Invoke the function that performs the delete operation.
  - Once the operation is complete you should THEN invoke
    useNotes() and render the note list again.
  - array destructoring 
  - produces an array ["deleteNote--", "4"] 
*/

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("deleteNote--")) {
      const [prefix, noteId] = clickEvent.target.id.split("--")

     deleteNote(noteId)
  }
}); 
/*
    - Responsibility of this module is to create the HTML for the notes in the aside bar
      and also the delete button -- however, the click event for the delete button 
      is in NoteList.js
*/



// ------------------------------------------------------------------------------------------------------



export const NoteHTMLConverter = (noteObject) => {
    return `
        <section class="note">
            <div class="note__title">Suspect: ${ noteObject.criminalName }</div>
            <div class="note__text">Crime: ${ noteObject.text }</div>
            <div class="note__author">Author: ${ noteObject.author }</div>
            <div class="note__timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
            <button id="deleteNote--${noteObject.id}">Delete</button>
        </section>
    `
}

// Need the note.Object.id on the delete button otherewise everything will be deleted (??)
// Can chekc in dev tools by hovering over each delete button and looking for the individual id




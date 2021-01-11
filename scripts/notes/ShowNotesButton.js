/*
  - The function of this module is to...
  1. Create the HTML for the Show Notes button 
  2. Create the click event for that button and dispatch
     that to eventHub 
*/


// ------------------------------------------------------------------------------------------------------




const contentTarget = document.querySelector(".noteListButton");
const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------



export const ShowNoteButton = () => {
    contentTarget.innerHTML = "<button id='showNotes'>Show Notes</button>"
};



// ------------------------------------------------------------------------------------------------------


// This event is dispatched to eventHub and heard through that in NoteList.js

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showNotes") {
        const customEvent = new CustomEvent("showNotesClicked")
        eventHub.dispatchEvent(customEvent)
    }
});
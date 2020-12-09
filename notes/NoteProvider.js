const eventHub = document.querySelector(".container")
let notes = []

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}

export const useNotes = () => notes.slice()

export const getNotes = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })

}
/*
- we are not doing a "GET" for information - we are "POST"-ing newly typed in information
- note is the new object formed by the user filling out the form 
-JSON.stringify - the preferred way of sending data back and forth is a string rather 
 than an object so we turn it into a string first 
*/

/*
- This saveNote is passing through as an arguement any newNote that was created in NoteForm.js
- Below fetchs the API because we need to interact with it
- We are posting new information to the database this time rathre than getting
- SIdenote: when getting info from API fetch defaults to GET so no need to list method: "GET"
  when doing that one, but below must say method: "POST"
- ingnore what the headers are for now
- Then in body we are telling it what we are sending the note (which is an object - but in the method 
  called .stringify to turn the object into a string as when working with http and 
  sending things back and forth across internet the preferred way is by the info being a string 
*/
export const saveNote = note => {
    return fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}
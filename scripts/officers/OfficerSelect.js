import { useOfficers, getOfficers } from './OfficerDataProvider.js'

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")


// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", changeEvent => {
    // Only do this if the `officerSelect` element was changed
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value
        console.log(selectedOfficer) // only consoles the first name - issue!!!!

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })


        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})




export const OfficerSelect = () => {
    getOfficers()
    .then( () => {
      const officers = useOfficers()
      render(officers)
    })
}
/* - Must import and invoke this function in main.js because you want this function 
     to run first when the page loads. It jumpstarts the process of gathering 
     data from the API and then renders below to create the dropdown, etc. etc.
 */



const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                 officersCollection.map((officer) => 
          `<option value=${officer.name}>${officer.name}</option>`
            )
            }
        </select>
    `
}





import { useOfficers, getOfficers } from './OfficerDataProvider.js'


const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")


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


/*
- In <option> tag below where there is a value of "${officer.name}" have 
  to use the "" around it whereas before we did not. This is because there
  is a space between the first name and surname. Without the "" only the 
  first name will be grabbed
*/
const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                 officersCollection.map((officer) => 
          `<option value="${officer.name}">${officer.name}</option>`
            )
            }
        </select>
    `
}

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", changeEvent => {
    // Only do this if the `officerSelect` element was changed
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value
        console.log(selectedOfficer) 

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






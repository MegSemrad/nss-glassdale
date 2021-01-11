/*
    - Responsibility of this module is to 
    1. Create the HTML for the convictions selevt dropdown & populate it with the convictions
    2. Listen for change event and when that occurs create custom event where the crime id will be 
    captured and stored in variable then dispatched to eventHub
*/



// ------------------------------------------------------------------------------------------------------



import { useConvictions, getConvictions } from "./convictionProvider.js";



// ------------------------------------------------------------------------------------------------------



const contentTarget = document.querySelector(".filters__crime");
const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------



/*
    Use interpolation here to invoke the map() method on
    the convictionsCollection to generate the option elements.
    Look back at the example provided above.
*/

const render = convictionsCollection => {
    return contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map((crime) => 
                  `<option value=${crime.id}>${crime.name}</option>`
                )
            }
        </select>
    `
};



// ------------------------------------------------------------------------------------------------------



export const ConvictionSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getConvictions()
    .then( () => {
      const convictions = useConvictions()
      render(convictions)
    });
};



// ------------------------------------------------------------------------------------------------------

/*
    - crimeChosen custom event is heard through eventHub in criminalList.js
*/

// On the event hub, listen for a "change" event. I.E user selects crime from dropdown
eventHub.addEventListener("change", event => {

    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const selectedCrimeEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
                /*the value is crime.id...look in 
                convictionsCollection function and 
                the <option> has the value of ${crime.id} */
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(selectedCrimeEvent)
    }
});
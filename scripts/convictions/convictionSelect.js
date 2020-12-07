import { useConvictions, getConvictions } from "./convictionProvider.js"


const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")





// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {

    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const selectedCrimeEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
                /*the value is crime.id...look down in 
                convictionsCollection function and 
                the <option> has the value of ${crime.id} */
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(selectedCrimeEvent)
    }
})






export const ConvictionSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getConvictions()
    .then( () => {
      const convictions = useConvictions()
      render(convictions)
    })
}





/*
    Use interpolation here to invoke the map() method on
    the convictionsCollection to generate the option elements.
    Look back at the example provided above.
*/

const render = convictionsCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map((crime) => 
                  `<option value=${crime.id}>${crime.name}</option>`
                )
            }
        </select>
    `
}





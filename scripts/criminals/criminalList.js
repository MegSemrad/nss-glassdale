import { getCriminals, useCriminals } from './criminalDataProvider.js'
import { Criminals } from './criminals.js'
import { useConvictions } from '../convictions/convictionProvider.js'


const criminalElement = document.querySelector("#criminalsContainer")
const eventHub = document.querySelector(".container")




const render = (perps) => {
    let criminalCards = []
    for (const perp of perps) {
        criminalCards.push(Criminals(perp))
    }

    criminalElement.innerHTML = criminalCards.join("")

}



export const CriminalList = () => {
    getCriminals()
    .then( () => { 
        let perps = useCriminals()
        render(perps)
    })
}




// Listen for the custom event you dispatched in ConvictionSelect
/*
- Note about the function parameter below. I have labeled it 'event' - and that 
  parameter will always be the event - but remember it is sometimes called 
  simply 'e' and 'evt'
- When the event takes place (could be when a button is clicked for example) that
  event is immediately passed into that 2nd parameter function as its parameter
- The event is an object itself
*/
eventHub.addEventListener('crimeChosen', event => {
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0"){

        /* parseInt turns it into a number -- need that because 
           crime.id is a number and therefore will not === event.detail.
           crimeThatWasChosen. So add parseInt to event.detail.Cr.... and 
           it will work
        */

        /*
        - The crimes in crimes.find is an array. 
        - While .find is a method/function and there is code inside this function 
          that probably includes a for loop 
        - In c.id the c is a single crime object 
        */
        const convictions = useConvictions()
        const conviction = convictions.find( (c) => c.id === parseInt(event.detail.crimeThatWasChosen) )

        const criminals = useCriminals()
        const matchingCriminals = criminals.filter( (criminal) => 
            criminal.conviction === conviction.name)

        render(matchingCriminals)
    }

})


eventHub.addEventListener("officerSelected", event => {
    // How can you access the officer name that was selected by the user?
    const officerName = event.detail.officer

    // How can you get the criminals that were arrested by that officer?
    const criminals = useCriminals()
    const chosenOfficers = 
    criminals.filter(
        criminalObject => {
            if (criminalObject.arrestingOfficer === officerName) {
                console.log(criminalObject)
                return true
            }
        }
        )
        render(chosenOfficers);
    })



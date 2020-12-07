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
        const convictions = useConvictions()
        const conviction = convictions.find( (conviction) => conviction.id === parseInt(event.detail.crimeThatWasChosen) )
        console.log(event.detail.crimeThatWasChosen, convictions)

        const criminals = useCriminals()
        const matchingCriminals = criminals.filter( (criminal) => 
            criminal.conviction === conviction.name)

        render(matchingCriminals)
    }

})

export const CriminalList = () => {
    getCriminals().then( () => { 
        let perps = useCriminals()
        render(perps)
    })
}




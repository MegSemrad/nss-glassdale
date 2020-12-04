import { getCriminals, useCriminals } from './criminalDataProvider.js'
import { Criminals } from './criminals.js'
import { useConvictions } from '../convictions/convictionProvider.js'

const criminalElement = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")




const render = (criminals) => {
    let criminalCards = []
    for (const perp of criminals) {
        criminalCards.push(Criminals(perp))
    }

    criminalElement.innerHTML = criminalCards.join("")

}




// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0"){

        /* parseInt turns it into a number -- need that because 
           crime.id is a number and therefore will not === event.detail.
           crimeThatWasChosen. So add parseInt to event.detail.Cr.... and 
           it will work
        */
        const convictions = useConvictions()
        const conviction = convictions.find ( (conviction) => conviction.id === parseInt(event.detail.crimeThatWasChosen) )

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




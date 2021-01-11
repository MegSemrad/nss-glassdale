/*
    - Responsibility of this module is to control which criminal cards 
      are displayed in DOM 
*/



// ------------------------------------------------------------------------------------------------------



import { getCriminals, useCriminals } from './criminalDataProvider.js';
import { Criminals } from './criminals.js';
import { useConvictions } from '../convictions/convictionProvider.js';
import { getFacilities, useFacilities } from '../facilities/facilityProvider.js';
import { getCriminalFacilities, useCriminalFacilities } from '../facilities/criminalFacilityProvider.js';



// ------------------------------------------------------------------------------------------------------



const criminalElement = document.querySelector("#criminalsContainer");
const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------



/*
    - These variables hold the current state of the data, even, and most especially, when it changes
    - Must use LET and not CONST as data is/can be ever changing 
*/

let criminals = [];
let facilities = [];
let criminalFacilities = [];



// ------------------------------------------------------------------------------------------------------

/*
    - CriminalList() function only imported to main.js 
    - Helps to fill the above empty arrays with the results of these three below functions
    - Then takes criminals and passes it through render() which is the farthest down the page
*/

export const CriminalList = () => {
        getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(
            () => {
                criminals = useCriminals()
                facilities = useFacilities()
                criminalFacilities = useCriminalFacilities()

                render(criminals)
            }
        )
};



// ------------------------------------------------------------------------------------------------------



/*
    - Listen for the custom event dispatched in ConvictionSelect
    - Note about the function parameter below. I have labeled it 'event' - and that 
      parameter will always be the event - but remember it is sometimes called 
      simply 'e' and 'evt'
    - When the event takes place (could be when a button is clicked for example) that
      event is immediately passed into that 2nd parameter function as its parameter
    - This particular event is an object itself
*/

eventHub.addEventListener('crimeChosen', event => {
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

        const criminalsToFilter = criminals.slice()
        const matchingCriminals = criminalsToFilter.filter( (criminal) => 
            criminal.conviction === conviction.name)

        render(matchingCriminals)
    }

});



// ------------------------------------------------------------------------------------------------------



eventHub.addEventListener("officerSelected", event => {
    // Take through dot notation the officer name from the event 
    // object and store it in a variable
    const officerName = event.detail.officer

    // Get criminals arrested by that officer
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
    });



// ------------------------------------------------------------------------------------------------------


  
    const render = (criminalList) => {
        // Step 1 - Iterate all criminals
        criminalElement.innerHTML = criminalList.map(
            (criminalObject) => {
                // Step 2 - Filter all relationships to get only ones for this criminal
                const facilityRelationshipsForThisCriminal = criminalFacilities.filter(cf => cf.criminalId === criminalObject.id)
    
                // Step 3 - Convert the relationships to facilities with map()
                // facilities will be an array 
                const matchingFacilities = facilityRelationshipsForThisCriminal.map(cf => {
                    const matchingFacilityObject = facilities.find(facility => facility.id === cf.facilityId)
                    return matchingFacilityObject
                })
    
                // Must pass the matching facilities to the Criminal component
                return Criminals(criminalObject, matchingFacilities)
            }
        ).join("")
    };
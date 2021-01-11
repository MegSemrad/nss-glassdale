/*
    - Responsibility of this module is to 
    1. Create the HTML for the HTML for the associates dialog box 
       that is within the criminal card. HOWEVER, the button 
       user will click to bring dialog box up on page was created in the 
       HTML in criminals.js where the click event for the button is as well
    2. To listen for the custom event heard on eventHub & dispatched from 
       criminals.js which contains the criminal's id. A match is found after 
       invoking useCriminals() so the known_associates can be grabbed and 
       passed through render() 
*/



import { useCriminals } from '../criminals/criminalDataProvider.js';


const contentTarget = document.querySelector(".associateAlibiContainer");
const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------



const render = associateAlibiCollection => {
    return contentTarget.innerHTML = `
        <section class="associate">
            ${associateAlibiCollection.map((associate) => 
                `<h2 class="assocaiteName">${associate.name}</h2>
                <div class="associateAlibi">Alibi: ${associate.alibi}</div>`
                )
            }
        </section>
        `
    };



// ------------------------------------------------------------------------------------------------------

- /*
    - QUESTION : Do I need to leave in the getCriminals() below? If the criminal cards were ever added to 
      would this create a conflict if I did not grab the updated version or would the updated version
      already be there as the criminal cards must load before I can even click the Show Associates button
    - QUESTION #2: Actually do I need this at all? Commented out bottom function and page still works...
*/

/*
    - Do not delete the below zombie code. It is used for study purposes/ reminder to go back through 
      code and remove any redundancy.
    - The original code was as commented out below. However, 
      removed the redundant getCriminals() function's invoking as getCriminals() would have already 
      been called. Otherwise, the criminal cards would not have loaded onto the page. Also deleted 
      the above import of getCriminals(). 



      export const associateAlibiSelect = () => {
        getCriminals()
        .then( () => {
            const associatesAlibis = useCriminals()
            render(associatesAlibis)
        })
    };
*/

// export const associateAlibiSelect = () => {
//         const associatesAlibis = useCriminals()
//         render(associatesAlibis)
// };



// ------------------------------------------------------------------------------------------------------



/*
    - This idChosen customEvent comes from criminals.js where the Show  Associates button and click event 
    live. That custom event grabbed the criminal's id from the HTML the creates the criminal card
*/

eventHub.addEventListener("idChosen", customEvent => {
    if(customEvent.detail.chosenId !== "0") {
        // Storing the array of criminal objects in criminalsArray
        const criminalsArray = useCriminals()
        // .find() will find the first match and stop
        // parseInt because the chosenId somehow (ask how) became a string and therefore will not match === the c.id integer
        const criminal = criminalsArray.find( (c) => c.id === parseInt(customEvent.detail.chosenId) )
        // associate is an array with a single object inside 
        const associate = criminal.known_associates
        console.log("associates", associate)
        contentTarget.showModal()
        render(associate)
    }
});

/*
Example of an object coming from criminals API
  {
    "id": 1,
    "age": 51,
    "eyeColor": "blue",
    "name": "Madelyn Lebsack",
    "workHistory": [
      "Vandervort Group",
      "Crooks Group",
      "Brekke Group"
    ],
    "phone": "774-195-7440",
    "address": "49 Leonardo Shore Suite 938\nLoriview, KY 09715-1234",
    "incarceration": {
      "start": "1987-10-03T16:19:42.359Z",
      "end": "2013-08-15T15:44:04.782Z"
    },
    "conviction": "grand theft",
    "arrestingOfficer": "Lazaro Leuschke",
    "known_associates": [
      {
        "name": "Ebony Hyatt",
        "alibi": "getting married"
      }
    ]
  }
  */
/*
    - Responsibility of this module is to 
    1. Create the HTML for the criminal cards and also the associate button within the cards
    2. Listen for click event on the show associates button and dispatch custom event 
       containing variable with the criminal's id within a variable -- the criminal's id
       can only be extracted once the Criminals() function is invoked (In main.js only..I think)
*/



const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------



/*
    - Criminals() is imported only to criminalList.js (I think...)
*/


export const Criminals = (criminalObject, facilities) => {
    return `
    <section class="criminals">
            <h2 class="criminals__name">${criminalObject.name}</h2>
            <div class="criminal__data">
                <div>Convicted for ${criminalObject.conviction}</div>
                <div>Arrested by ${criminalObject.arrestingOfficer}</div>
                <div class="criminals__term__start">Sentence start:${new Date(criminalObject.incarceration.start).toLocaleDateString()}</div>
                <div class="criminals__term__end">Sentence end:${new Date(criminalObject.incarceration.end).toLocaleDateString()}</div>
                <div>Age: ${criminalObject.age}</div>
                <div class="facilities">
                    <h4 class="facilities__title">Facilities</h4>
                    <ul class="facilities__list">
                        ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                    </ul>
                </div>
                <button id="associates--${criminalObject.id}">Show Associates</button>
            </div>
    </section>
    `
};



// ------------------------------------------------------------------------------------------------------



eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("associates--")){
        const [prefix, id] = clickEvent.target.id.split("--")
    
        const idChosenEvent = new CustomEvent("idChosen", {
            detail: {
                chosenId: id
            }
    })
    eventHub.dispatchEvent(idChosenEvent);
    }
});

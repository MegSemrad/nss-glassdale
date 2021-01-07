const eventHub = document.querySelector(".container");



// ------------------------------------------------------------------------------------------------------



export const Criminals = (criminalObject, facilities) => {
    return `
    <section class="criminals">
            <h2 class="criminals__name">${criminalObject.name}</h2>
            <div class="criminal__details">
                <div>Convicted for ${criminalObject.conviction}</div>
                <div>Arrested by ${criminalObject.arrestingOfficer}</div>
                <div>Sentence start:${new Date(criminalObject.incarceration.start).toLocaleDateString()}</div>
                <div>Sentence end:${new Date(criminalObject.incarceration.end).toLocaleDateString()}</div>
                <div>Age: ${criminalObject.age}</div>
                <div>
                    <h2>Facilities</h2>
                    <ul>
                        ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                    </ul>
                </div>
                <button id="associates--${criminalObject.id}">Show Associates</button>
            </div>
    </section>
    `
}



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

const eventHub = document.querySelector(".container");

// export const Criminals = (criminalObject) => {
//     return `
//         <section class="criminals">
//             <h2 class="criminals__name">${criminalObject.name}</h2>
//             <div class="criminals__age criminals__data">Age: ${criminalObject.age}</div>
//             <div class="criminals__crime criminals__data">Crime: ${criminalObject.conviction}</div>
//             <div class="criminals__term__start criminals__data">Start: ${new Date(criminalObject.incarceration.start).toLocaleDateString('en-US')}</div>
//             <div class="criminals__term__end criminals__data">Release: ${new Date(criminalObject.incarceration.end).toLocaleDateString('en-US')}</div>
//             <button id="associates--${criminalObject.id}">Associate Alibis</button>
//         </section>
//     `
// };


export const Criminals = (criminalObject, facilities) => {
    return `
    <div class="criminal">
        <h2 class="criminals__name">${criminalObject.name}</h2>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div>
                <h2>Facilities</h2>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <button id="associates--${criminalObject.id}">Show Associates</button>
        </div>
    </div>
    `
}


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

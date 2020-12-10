const eventHub = document.querySelector(".document");

export const Criminals = (criminalObject) => {
    return `
        <section class="criminals">
            <h2 class="criminals__name">${criminalObject.name}</h2>
            <div class="criminals__age criminals__data">Age: ${criminalObject.age}</div>
            <div class="criminals__crime criminals__data">Crime: ${criminalObject.conviction}</div>
            <div class="criminals__term__start criminals__data">Start: ${new Date(criminalObject.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminals__term__end criminals__data">Release: ${new Date(criminalObject.incarceration.end).toLocaleDateString('en-US')}</div>
            <button id="associates--${criminalObject.id}">Associate Alibis</button>
        </section>
    `
};


eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("associates--")){
        const [prefix, id] = clickEvent.target.id.split("--")
    
        const idChosenEvent = new CustomEvent("idChosen", {
            detail: {
                id: chosenId
            }
    })
    eventHub.dispatchEvent(idChosenEvent);
    }
});

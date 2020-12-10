import { getCriminals, useCriminals } from './criminalDataProvider.js';

const contentTarget = document.querySelector(".associateAlibiContainer");
const eventHub = document.querySelector(".container");


eventHub.addEventListener("idChosen", customEvent => {
    if(customEvent.detail.id !== "0") {
        
    }
    // FIND criminal with matching id
})


export const associateAlibiSelect = () => {
    getCriminals()
    .then( () => {
        const associatesAlibis = useCriminals()
        render(associatesAlibis)
    })
};


const render = associateAlibiCollection => {
    return contentTarget.innerHTML = `
        <section class="associate">
            ${associateAlibiCollection.map((associate) => 
                `<h2 class="assocaiteName">${associate.known_associates.name}</h2>
                <div class="associateAlibi">Alibi: ${associate.known_associates.name}</div>`
                )
            }
        </section>
        `
    };
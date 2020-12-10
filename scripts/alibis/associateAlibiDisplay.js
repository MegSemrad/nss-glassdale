import { getCriminals, useCriminals } from '../criminals/criminalDataProvider.js';

const contentTarget = document.querySelector(".associateAlibiContainer");
const eventHub = document.querySelector(".container");


eventHub.addEventListener("idChosen", customEvent => {
    if(customEvent.detail.chosenId !== "0") {
        const criminalsArray = useCriminals()
        const criminal = criminalsArray.find( (c) => c.id === parseInt(customEvent.detail.chosenId) )
        const associate = criminal.known_associates
        console.log("associates", associate)
        contentTarget.showModal()
        render(associate)
    }
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
                `<h2 class="assocaiteName">${associate.name}</h2>
                <div class="associateAlibi">Alibi: ${associate.alibi}</div>`
                )
            }
        </section>
        `
    };
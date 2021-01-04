const contentTarget = document.querySelector(".witnesses");
const eventHub = document.querySelector(".container");


export const witnessButton = () => {
    return contentTarget.innerHTML = `
        <button id="witnessButton">Witness Statements</button>
    `
};


export const witnessCollection = () => {
    eventHub.addEventListener("click", clickEvent => {
        if(clickEvent.target.id === "witnessButton") {
            
        }
    })
}
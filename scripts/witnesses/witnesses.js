const contentTarget = document.querySelector(".witnesses");
const eventHub = document.querySelector(".container");


export const witnessButton = () => {
    return contentTarget.innerHTML = `
        <button class="witnessButton">Witness Statements</button>
    `
};
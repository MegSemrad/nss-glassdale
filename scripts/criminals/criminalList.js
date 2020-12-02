import { getCriminals, useCriminals } from './criminalDataProvider.js'
import { Criminals } from './criminals.js'

const criminalElement = document.querySelector(".criminalsContainer")


export const CriminalList = () => {
    getCriminals().then( () => {
        let convicts = useCriminals()

        for (const convict of convicts) {
            let criminalsHTML = Criminals(convict)
            criminalElement.innerHTML += criminalsHTML
        }
        
    }

    )
};


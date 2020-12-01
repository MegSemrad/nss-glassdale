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

/*
- Passed a url to fetch as an argument and it returns an object
- fetch is a function that returns an object!!
- .then() is chained on 
- that return object is a promise object - which has property on it called 'then'
- .then() is a method on a promise object
- getCriminals returns the results of calling fetch which is a promise object so getCriminals istelf 
now returns a promise object
- .then() means wait until getCriminals does its thing (ie the promise is resolved) THEN do the nect thing
*/

/*

*/
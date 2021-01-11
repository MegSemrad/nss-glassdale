/*  Example of an object coming from convictions API
    {
        "name": "arson",
        "id": 1
    }
*/



//------------------------------------------------------------------------------------------------------



let convictions = []



export const useConvictions = () => convictions.slice()



export const getConvictions = () => {
   return fetch("https://criminals.glassdale.us/crimes")
    .then(response => response.json())
    .then (
        loggedCrimes => {
            console.log(loggedCrimes)
            convictions = loggedCrimes
        }   
    )
};
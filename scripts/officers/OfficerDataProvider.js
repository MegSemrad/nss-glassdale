/*  Example of an object coming from officers API
    {
        "name": "Marques Balistreri",
        "id": 1
    }
*/



//------------------------------------------------------------------------------------------------------



let officers = [];



export const useOfficers = () => {
    return officers.slice();
};



export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")
    .then(response => response.json())
    .then(
        parsedOfficers => {
            console.log(parsedOfficers)
            officers = parsedOfficers
        }
    )
};
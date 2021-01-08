/*
Example of an object coming from criminalFacilities API
  {
    "id": 1,
    "criminalId": 1,
    "facilityId": 23
  }
*/



// ------------------------------------------------------------------------------------------------------



let criminalFacilities = [];



export const useCriminalFacilities = () => {
    return criminalFacilities.slice()
};



export const getCriminalFacilities = () => {
    return fetch("https://criminals.glassdale.us/criminalFacilities")
        .then(response => response.json())
        .then(apiData => {
            criminalFacilities = apiData
        })
};
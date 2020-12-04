let criminals = [];

export const useCriminals = () => {
    return criminals.slice();
};

/* or could write the above as...
export const useCriminals = () => criminals.slice();

- either way we use .slice to get a copy of the criminals array because raw
  data should always remain unchanged
*/

export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
        .then(response => response.json())
        .then(
            parsedCriminals => {
                console.table(parsedCriminals)
                criminals = parsedCriminals
            }
        )
};


/*
REQUESTING DATA FROM AN API - and what to do with it...
- When making a request to another address for information the time it takes to receive 
  that data is unknown/unpredicatable...this means we need a process in place for waiting 
  on that data so we know how to use it when it does arrive - when the data arrives it will 
  be an object (! fetch() - getCriminals in this case - is a function which returns the 
  result of calling fetch and the result is an object - which is a promise object! -
  which has a property called '.then()' ) (!so .then() is a method on a promise object!)
- asynchronous : not existing at the same time (?)
- Therefore cannot read top to bottom as things are working at different times 
- fetch() is a method/function 
    - a url is passed in as input/arguement - which makes the request for data
- .then() is a method
    - used to wait for the data to return, meaning it has to wait until getCriminals does its
    thing (i.e. the promise has been resolved THEN do the next thing- wait by passing .then 
    an argument and that arguement is a function
    - Look above..."response" is the argument in that first .then() function and within that 
      function let it know how want that returned data handled. Naming convention is to call is 
      "response" as we are receiving a response from the server
    - this .then(reponse => response.json()) is taking the response from the browser (which will be the 
      requested data) and telling the function to run a method to convert that json into an array of 
      objects can work on in javascript
    - that is an anonymous function that is being passed into .then as an arguement - we don't 
      call it because it is called internally when the time is right - time will be right when data 
      is returned from API
- 2nd .then() function receives what the above .then() returns which is response turned into array of 
  objects. So 'parsedCriminals' is an arguement that is a variable (as always) that will hold the data that 
  gets passed into the function. Then describe action want to take on that data. That action is to pass 
  the data to 'criminals' variable array so can set application state (the initial state will work with)
- So passing functions into functions as arguements that will be called internally when the time is right 

- console.table - another way to console something but in a more readable way 
*/
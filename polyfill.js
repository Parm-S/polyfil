Array.prototype.myFilter = function (callback) {
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        const result = callback(this[i], i, this); // i -> index of array  , this -> iterating the entire array
        if (result) {
            newArray.push(this[i]);
        }
    }
    return newArray;
}

const arr = [2, 3, 4, 6, 7, 9, 1];

const filteredArray = arr.myFilter(function (num) {
    return num < 6;
});

console.log(filteredArray);

const names = ['happy', 'john', 'nikhilKumar', 'abhay', 'yash', 'ravan'];
const filteredNames = names.myFilter(function (names, index, arr) {
    arr.pop();
    return names.length < 7;
});

console.log(filteredNames);

/*implementation of setIntervalPolyfill */

// want to call from a single function because setIntervalPolyfill return as an intervalId i.e., is used by clearIntervalPolyfill to clear that interval.
// so there must be a mapping between these two function( setIntervalPolyfill & clearIntervalPolyfill )
//do not pull out of the global scope i.e is why we creating it into createSetIntervalPolyfill()
// function createSetIntervalPolyfill() {
     //closure scope
    var intervalId = 0; // creating unique interval id
    var intervalMap = {}; // contain mapping of the id that we are creating in setIntervalPolyfill & the id is return by real setTimeout

    function setIntervalPolyfill(callbackFunction , delay = 0 , ...args){
          
        //type check of this callbackfuntion
        if(typeof callbackFunction !== 'function'){
            throw new TypeError(" callback should be a function")
        }
        //Uniue all the time
        var id = intervalId++;

        function repeat(){
            intervalMap[id] = setTimeout(
                function(){
                    callbackFunction(...args)
                    //Terminating condition why we are using at the time of clear interval we delete thatt id from our interval map
                    if(intervalMap[id]){
                        repeat();
                    }

                },delay
            )
        }
        repeat();

        return id;

    }

    function clearIntervalPolyfill(intervalId){

        clearTimeout(intervalMap[intervalId]);
        delete intervalMap[intervalId];

    }
//     return {
//         setIntervalPolyfill,
//         clearIntervalPolyfill
//     }


// }
// const {
//     setIntervalPolyfill,
//     clearIntervalPolyfill
// } = createSetIntervalPolyfill()

let counter = 0
let intervalID;

function sayHello(){
    counter++;
    console.log("dhaval sir is awesome");
    if(counter >=5){
        clearIntervalPolyfill(intervalID);
    }
}

intervalID = setIntervalPolyfill(sayHello, 3000);
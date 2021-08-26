Array.prototype.myFilter =  function(callback){
    const newArray = [];
    for (let i =0; i<this.length;i++){
        const result =  callback(this[i], i , this); // i -> index of array  , this -> iterating the entire array
        if(result){
            newArray.push(this[i]);
        }
    }
    return newArray;
}

const arr = [2,3,4,6,7,9,1];
 
const filteredArray = arr.myFilter(function(num){
    return  num < 6;
});

console.log(filteredArray);

const names =['happy','john','nikhilKumar','abhay','yash','ravan'];
const filteredNames = names.myFilter(function(names,index,arr){
      arr.pop();
      return names.length < 7;
});

console.log(filteredNames);
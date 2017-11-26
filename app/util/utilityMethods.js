

export const util = {
    removeFromArray: function(array, itemToBeRemoved){
        let newArray = array.slice();
        let idx = newArray.indexOf(itemToBeRemoved);
        newArray.splice(idx, 1);
        
        return newArray
    }
};
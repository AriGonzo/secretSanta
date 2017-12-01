const async = require('async');
const User = require('../models/User');

module.exports = {
    trigger: function(arr){
        let selectorArray = arr;
        let selecteeArray = arr.slice(0);
        let that = this;

        this.shuffle(selecteeArray);
        this.parseArrays(selectorArray, selecteeArray).then(function(completedArray){
            console.log('completedArray.length is', completedArray.length);
            that.assignUsers(completedArray);
        }).catch(function(err){
            console.log('err is', err)
        });
    },
    shuffle: function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    parseArrays: function(selectorArray, selecteeArray, successfulPairs){
        let ctx = this;
        return new Promise(function(resolve, reject){
            this.successfulPairs = successfulPairs || [];
            var unsuccessfulSelector = [],
                unsuccessfulSelectee = [],
                that = this;

            async.forEachOf(selectorArray, function(value, i, callback){
                let selector = selectorArray[i],
                    selectee = selecteeArray[i];

                // Check to see if the selector is the same user as the selectee or if the selectee is in the selector's exceptions list
                if (selector._id !== selectee._id && selector.exceptions.indexOf(selectee._id) == -1 ) {
                    //if they are neither of the above, push them in as a successful pair
                    that.successfulPairs.push([selector, selectee]);
                } else {
                    //if the selector is the same as the selectee or an exception, place them each back
                    unsuccessfulSelector.push(selector);
                    unsuccessfulSelectee.push(selectee);
                }
                callback();
            }, function(){
                if (unsuccessfulSelector.length  == 1 ) {
                    // Iterate over the list of successful pairs checking how to fit the remaining pair
                    console.log('1 user left after shuffle');
                    for (i = 0; i < that.successfulPairs.length; i++) {
                        if (unsuccessfulSelector[0]._id !== that.successfulPairs[i][1]._id && 
                            unsuccessfulSelector[0].exceptions.indexOf(that.successfulPairs[i][1]._id) == -1 && 
                            unsuccessfulSelectee[0]._id !== that.successfulPairs[i][0]._id &&
                            unsuccessfulSelectee[0].exceptions.indexOf(that.successfulPairs[i][0]._id) == -1) {
                            var oldSelector = that.successfulPairs[i][0];
                            that.successfulPairs[i][0] = unsuccessfulSelector[0];
                            that.successfulPairs.push([oldSelector, unsuccessfulSelectee[0]]);
                            resolve(that.successfulPairs);
                            break;
                        }
                    }
                } else if (unsuccessfulSelector.length == 2) {
                    //cross check if each of these pairs exceptions or copies of the same user. If not, swap the selections and call it a day
                    console.log('2 user left after shuffle');
                    if (unsuccessfulSelector[0]._id !== unsuccessfulSelectee[1]._id && 
                        unsuccessfulSelector[0].exceptions.indexOf(unsuccessfulSelectee[1]._id) == -1 && 
                        unsuccessfulSelector[1]._id !== unsuccessfulSelectee[0]._id &&
                        unsuccessfulSelector[1].exceptions.indexOf(unsuccessfulSelectee[0]._id) == -1) {
                        that.successfulPairs.push([unsuccessfulSelector[0], unsuccessfulSelectee[1]], [unsuccessfulSelector[1], unsuccessfulSelectee[0]]);
                        console.log("flipped last pairs, shuffle complete");
                        resolve(that.successfulPairs);
                    } else {
                        console.log('have to figure out this solution');
                        ctx.trigger(selectorArray);
                    }
                } else if (unsuccessfulSelector.length <= 3) {
                    //shuffle the selecteeArray and pass both arrays back through the parser
                    console.log(`${unsuccessfulSelector.length} users left after shuffle, parsing again`);
                    ctx.trigger(selectorArray);
                    reject("re-running filter to continue sorting")

                } else {
                    // The users were shuffled successfully - send the array of pairs to a saving service.
                    console.log('shuffle successful');
                    resolve(that.successfulPairs)
                }
            });
        })
    },
    assignUsers: function(completedArray){
        async.each(completedArray, function(pairs, callback){
            User.findById(pairs[0]._id).exec(function(err, oUser){
                oUser.selected = pairs[1]._id;
                oUser.save(function(){
                    callback();
                });
            });
        }, function(){
            console.log("User Sorted and Saved Successfully!")
        });
    }
}
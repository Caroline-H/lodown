'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the    
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/*
* identity: Designed to return the value of a parameter.
*
* @param {value} the value to be identified
*/
function identity(value) {
    return value;
}
module.exports.identity = identity;

/*
* typeOf: Designed to return the correct type of any value as a string
*
* @param {value} the value to determine the type of
*
* @return {string} a string representation of the type of value the parameter is
*/
function typeOf(value) {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    if (value instanceof Date) "date";
    return typeof value;
}
module.exports.typeOf = typeOf;

/* first: Designed to return the first {n} number of characters in the array
*  if the array exists
*
* @param {Array} the array to inspect
* @param {number} n. the number of characters to return from the beginning of the array
*
* @return {array} an array with the first {n} characters in the original array
*/
function first(array, n) {
    if (!Array.isArray(array) || n < 0) return [];
    if (n === undefined) return array[0];
    if (n > 0) {
        n = n > array.length ? array.length : n;
        return array.slice(0, n);
    }    
}
module.exports.first = first;

/* last: Designed to return the last {n} number of characters in the array
*  if the array exists.
*
* @param {array} the array to inspect
* @param {n} the number of characters to return from the end of the array
*
* @return {array} an array with the last {n} characters in the original {array}
*/

function last(array, n) {
    if (!Array.isArray(array) || n < 0) return [];
    if (n === undefined) return array[array.length - 1];
    if (n > array.length) return array;
    if (n > 0) return array.slice(n - 1, array.length);
}
module.exports.last = last;

/* indexOf: Designed to return the index number of a value that is in the array
* if value is in the array.
*
* @param {array} the array to inspect
* @param {value} the character to return the index number of in the array
*
* @return {number} the number of the index of the {value} in the {array}
*/

function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value === array[i]) {
            return i;
        } 
    } 
    return -1;
}
module.exports.indeOf = indexOf;

/* filter: Designed to filter through an {array} and return the characters in the
* array that are TRUE for some {test}
*
* @param {Array} array. the array filter through
* @param {Function} test. The test that must be true for the character in the 
* {array} to be returned to a new array
*
* @return {Array} output. the array of values that were true for some {test}
*/
function filter(array, test) {
    let output = [];
    each(array, function (element, i, array) {
        if (test(element, i, array) === true) {
            output.push(element);
        } 
    });
    return output;
}
module.exports.filter = filter;

/* reject: Designed to filter through an {array} and return the characters in the
* array that are FALSE for some {test}
*
* @param {Array} array. the array to filter through
* @param {Function} test. The test that must be false for the character in the 
* {array} to be returned to a new array
*
* @return {Array} the array of values that were false for some {test}
*/
function reject(array, test) {
     return filter(array, function (element, i, arr) {
        return (test(element, i, array) !==true);
     });
 }
 module.exports.reject = reject;

/*partition: Designed to sort an {Array} into two separate arrays based on
* if the value at index i passes a {test}. It then returns an array containing
* the two arrays 
*
* @param {Array} array. the array to sort
* @param {Function} test. The test that will partition the characters in the 
* {Array} based on if the charcter passes or not
*
* @return {Array} the array of two arrays that are the characters that pass
* the {test} and the onese that don't
*/
function partition (array, test) {
    let output = [];
    let filterOutput = [];
    let rejectOutput = [];
    
    filter(array, function (element, i, array) {
        if (test(element) === true) {
        filterOutput.push(element);
        }
    });
    output.push(filterOutput);
    reject(array, function (element, i, array) {
        if (test(element) === false) {
           rejectOutput.push(element); 
        }
    });
    output.push(rejectOutput);
    return output;
}
module.exports.partition = partition;

/* unique: Designed to run through an {Array} and return the characters in the
* array with all duplicates removed
*
* @param {Array} array. the array to run through
* 
* @return {Array} output. the array of values that were unique in the 
* original {Array}
*/
function unique(array) {
    let output =[];
    for (var i = 0; i < array.length; i++) {
        if (indexOf(output, array[i]) === -1) {
            output.push(array[i]);
        }
    }
    return output;
}
module.exports.unique = unique;

/* map: Designed to take a {collection} and return a new array with the 
* characters after they are all transformed in some way by a {Function}
*
* @param {Array or Object} collection. the collection that holds the original 
* charcters to be transformed
* @param {Function} transform. The {Function} that the elements in the collection
* will be passed through to create the new elements in the output array
*
* @return {Array} output. the array of values that have been transformed by the
* {Function} 
*/
function map(collection, transform) {
    let output = [];
    each(collection, function (element, i, collection){
        output.push(transform(element,i,collection));
    });
    return output;
}
module.exports.map = map;

/* pluck: Designed to go through an {Array} of objects and return a new array
* with all of the values from all of the objects that have the same property 
* name
*
* @param {Array} array. the array of objects to pluck values from
* @param {property} propertyName. The property that must be present in an object
* in order to return the value of that property to the ouptut array
*
* @return {Array} output. the array of values that correespond to the 
* propertyName in each of the objects in {Array}
*/
function pluck(array, propertyName) {
   let output = [];
   map (array, function(element, i, arr){
       if (element === array[i]) {
           output.push(array[i].name);
       } 
   });
   return output;
}
module.exports.pluck = pluck;

/* contains: Designed to return true if an {Array} contains some {value}.
* Otherwise it will return false.
*
* @param {Array} array. the array to check for the given value
* @param {value} value. The value that must be present in the {Array} in order
* for contains to be true
*
* @return {Boolean} returns true if the value is in the array, otherwise false
*/
function contains(array, value) {
   return (indexOf(array, value) !== -1) ? true : false;
}
module.exports.contains = contains;

/* every: Designed to take a {collection} and return true if every element in the
* collection passes some {test}. If no test is identified, it returns true if 
* all the elements are truthy.
*
* @param {Array or Object} collection. the collection that contains all the 
* elements to be tested
* @param {Function} test. The test that must be true for every element in the
* {collection} in order for every to be true
*
* @return {Boolean} returns true if every element in the collection passes the
* test. (or if there is no test, if all the values are truthy)
*/
function every(collection, test) {
    if (test === undefined) {
        test = identity;
    }
    var truth = true;
    each(collection, function (element, i, collection) {
        if (test(element, i, collection) === false){
            truth = false;
        }
    });return truth;
}
module.exports.every = every;

/* some: Designed to take a {collection} and return true if at least one element
* of the collection passes the {test}. If no test is defined, it returns true if
* at least one element is truthy.
*
* @param {Array or Object} collection. the collection that contains all the 
* elements to be tested
* @param {Function} test. the test that must be true for at least one element in
* the {collection} in order for some to be true
*
* @return {Boolean} returns true if at least one element in the collection 
* passes the test. (or if there is no test, if at least one value is truthy)
*/
function some(collection, test) {
    if (test === undefined) {
        test = identity;
    }
    var answer = false;
    each (collection, function (element, i, collection) {
        if (test(element, i, collection) === true) {
            answer = true;
        }
    });
    return answer;
}
module.exports.some = some;

/* reduce: Designed to reduce an array of values down to one value, based on a 
* specific starting point and a function that indicates how to manipulate the
* values. If a starting point is not given, then the function should start
* from the first element in the array. if the start was 2 and the function 
* was to add, you would start adding the first value from the {Array} to 
* 2 and then continue by adding the next value in the {array} to that result
*
* @param {Array} array. the array of values to reduce
* @param {Function} change. The function that will change the values in the
* {Array} in some way while it reduces it to one value
* @param {Number} start. the number that indicates where to start iterating from
*
* @return {Number} previous. returns the value that is the result of reducing 
* the {Array} down by starting at a certain point and manipulating each element
* in the array
*/
function reduce(array, change, start) {
    var previous;
    if (start !== undefined) {
        previous = start;
        each (array, function (element, i, arr) {
            previous = change (previous, element, i);
        });
    } else {
        previous = array[0];
        each (array, function (element, i, arr) {
            if (i === 0) return;
            previous = change (previous, element, i);
        });
    }
    return previous;
}
module.exports.reduce = reduce;

/* extend: Designed to add all properties from any number of objects to an 
* an original object, in order. If later objects have the same property as an
* object already added, the later property will override the earlier version.
*
* @param {Object} objTo. the source object that will recieve all the added 
* properties
*
* @return {Object} the new version of the object with all of the properties of
* added objects appended to it.
*/
function extend(objTo) {
    each (arguments, function (objFrom) {
        each (objFrom, function (value, key) {
            objTo[key] = value;
        });
    });
    return objTo;
}
module.exports.extend = extend;
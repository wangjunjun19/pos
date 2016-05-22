'use strict';

function thousands_separators(num) {
    var stringArray = convertsNumberToStringArray(num);
    var array = addSymbol(stringArray);
    var integerString = buildIntrgerString(array);
    var str = stringBuilder(integerString, stringArray);

    return str;
}

function convertsNumberToStringArray(num) {
    num += "";
    var stringArray = num.split(".");

    return stringArray;
}

function addSymbol(stringArray) {
    var integerArray = stringArray[0].split("");
    var array = [];
    var tempIndex = 0;
    var indexOfArray = 0;
    for (var i = integerArray.length - 1; i >= 0; i--) {
        if (tempIndex % 3 === 0 && tempIndex != 0) {
            array[indexOfArray] = ",";
            indexOfArray++;
        }
        tempIndex++;
        array[indexOfArray] = integerArray[i];
        indexOfArray++;
    }

    return array;
}

function buildIntrgerString(array) {
    var integerString = '';

    for (var i = array.length - 1; i >= 0; i--) {
        integerString += array[i];
    }

    return integerString;
}

function stringBuilder(integerString, stringArray) {
    var str = '';
    str += integerString;
    if (stringArray.length != 1) {
        str += '.' + stringArray[1];
    }

    return str;
}

module.exports = thousands_separators;

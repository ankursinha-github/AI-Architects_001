/**
 * Finds the first element in the array that is not less than the specified value.
 * If no such element exists, it returns `undefined`.
 *
 * @param {number} value - The value to compare against.
 * @returns {*} - The first element that is not less than the value or `undefined` if no such element exists.
 */
if (!Array.prototype.lowerBound) {
    Array.prototype.lowerBound = function (value) {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError(
                "Array.prototype.lowerBound called on null or undefined"
            );
        }

        let left = 0;
        let right = this.length;

        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (this[mid] < value) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left < this.length ? this[left] : undefined;
    };
}

/**
 * Finds the index of the first element in the array that is not less than the specified value.
 * If no such element exists, it returns `-1`.
 *
 * @param {number} value - The value to compare against.
 * @returns {number} - The index of the first element that is not less than the value or `-1` if no such index exists.
 */
if (!Array.prototype.lowerBoundIndex) {
    Array.prototype.lowerBoundIndex = function (value) {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError(
                "Array.prototype.lowerBoundIndex called on null or undefined"
            );
        }

        let left = 0;
        let right = this.length;

        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (this[mid] < value) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left < this.length ? left : -1;
    };
}

/**
 * Finds the first element in the array that is greater than the specified value.
 * If no such element exists, it returns `undefined`.
 *
 * @param {number} value - The value to compare against.
 * @returns {*} - The first element that is greater than the value or `undefined` if no such element exists.
 */
if (!Array.prototype.upperBound) {
    Array.prototype.upperBound = function (value) {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError(
                "Array.prototype.upperBound called on null or undefined"
            );
        }

        let left = 0;
        let right = this.length;

        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (this[mid] <= value) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left < this.length ? this[left] : undefined;
    };
}

/**
 * Finds the index of the first element in the array that is greater than the specified value.
 * If no such element exists, it returns `-1`.
 *
 * @param {number} value - The value to compare against.
 * @returns {number} - The index of the first element that is greater than the value or `-1` if no such index exists.
 */
if (!Array.prototype.upperBoundIndex) {
    Array.prototype.upperBoundIndex = function (value) {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError(
                "Array.prototype.upperBoundIndex called on null or undefined"
            );
        }

        let left = 0;
        let right = this.length;

        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (this[mid] <= value) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left < this.length ? left : -1;
    };
}

//  * Creates a matrix of size m x n.
//  * @param {number} m - Number of rows.
//  * @param {number} n - Number of columns.
//  * @param {any} initialValue - Optional initial value for all elements (default is 0).
//  * @returns {Array<Array<any>>} - The created matrix.

function createMatrix(
    m,
    n,
    sequenceTypeOrArray = "zeros",
    traversalType = "none"
) {
    // Ensure the dimensions are positive integers
    if (m <= 0 || n <= 0) {
        throw new Error("Both dimensions must be positive integers");
    }

    const matrix = Array.from({ length: m }, () => Array(n).fill(0));
    let sequenceType;
    let customNumbers = [];

    // Check if the third argument is an array (for custom numbers)
    if (Array.isArray(sequenceTypeOrArray)) {
        sequenceType = "custom";
        customNumbers = sequenceTypeOrArray;
    } else {
        sequenceType = sequenceTypeOrArray;
    }

    let currentNumber = {
        zeros: 0,
        natural: 1,
        even: 2,
        odd: 1,
        prime: 1,
        custom: 0, // Index for custom numbers
    };

    const generateNumber = {
        zeros: () => 0,
        natural: () => currentNumber.natural++,
        even: () => {
            const num = currentNumber.even;
            currentNumber.even += 2;
            return num;
        },
        odd: () => {
            const num = currentNumber.odd;
            currentNumber.odd += 2;
            return num;
        },
        prime: () => {
            while (true) {
                currentNumber.prime++;
                if (isPrime(currentNumber.prime)) return currentNumber.prime;
            }
        },
        custom: () => {
            if (currentNumber.custom < customNumbers.length) {
                return customNumbers[currentNumber.custom++];
            } else {
                throw new Error("Not enough custom numbers provided");
            }
        },
        default: () => sequenceType, // Default case for custom characters or numbers
    };

    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    // Fill the matrix based on the selected sequence type
    function fillMatrix() {
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                const generator =
                    generateNumber[sequenceType] || generateNumber.default;
                matrix[i][j] = generator();
            }
        }
    }

    // Apply traversal patterns if specified and return as a flat array
    function applyTraversal() {
        const flattened = matrix.flat();
        const result = [];
        let index = 0;

        if (traversalType === "z") {
            // Top row (left to right)
            for (let j = 0; j < n; j++) {
                result.push(flattened[index++]);
            }

            // Diagonal (top-right to bottom-left)
            for (let i = 1; i < Math.min(m, n); i++) {
                result.push(flattened[i * n + (n - i - 1)]);
            }

            // Bottom row (left to right)
            if (m > 1) {
                for (let j = 1; j < n; j++) {
                    result.push(flattened[(m - 1) * n + j]);
                }
            }
        } else if (traversalType === "spiral") {
            let left = 0,
                right = n - 1,
                top = 0,
                bottom = m - 1;
            while (left <= right && top <= bottom) {
                // Top row
                for (let j = left; j <= right; j++) {
                    result.push(flattened[top * n + j]);
                }
                top++;

                // Right column
                for (let i = top; i <= bottom; i++) {
                    result.push(flattened[i * n + right]);
                }
                right--;

                // Bottom row
                if (top <= bottom) {
                    for (let j = right; j >= left; j--) {
                        result.push(flattened[bottom * n + j]);
                    }
                    bottom--;
                }

                // Left column
                if (left <= right) {
                    for (let i = bottom; i >= top; i--) {
                        result.push(flattened[i * n + left]);
                    }
                    left++;
                }
            }
        }

        return result;
    }

    fillMatrix();
    if (traversalType !== "none") {
        return applyTraversal();
    }

    return matrix.flat();
}

// // Matrix loop parsing function
// function parseMatrixLoops(code) {
//   const matrixLoopRegex = /for\s*\(\s*(blo)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\w+)\s*\)\s*\{\s*for\s*\(\s*(blo)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\w+)\s*\)\s*\{/g;
//   let match;
//   let jsCode = '';
//   let lastIndex = 0;

//   while ((match = matrixLoopRegex.exec(code)) !== null) {
//     const rowType = match[1]; // 'blo'
//     const rowVariable = match[2]; // i
//     const startRowValue = match[3]; // 0
//     const rowEndValue = match[4]; // 2

//     const colType = match[5]; // 'blo'
//     const colVariable = match[6]; // j
//     const startColValue = match[7]; // 0
//     const colEndValue = match[8]; // 2

//     let jsRowDeclaration = `let ${rowVariable}`;
//     let jsColDeclaration = `let ${colVariable}`;

//     // JS equivalent loop to parse
//     const jsMatrixLoop = `for (${jsRowDeclaration} = ${startRowValue}; ${rowVariable} <= ${rowEndValue}; ${rowVariable}++) {
//         for (${jsColDeclaration} = ${startColValue}; ${colVariable} <= ${colEndValue}; ${colVariable}++) {
//             let element = matrix[${rowVariable}][${colVariable}];
//             console.log(element);
//         }
//     }`;

//     jsCode += code.substring(lastIndex, match.index) + jsMatrixLoop;
//     lastIndex = matrixLoopRegex.lastIndex;
//   }

//   jsCode += code.substring(lastIndex);

//   return jsCode;
// }

// // Custom syntax to create and iterate over a 3x3 matrix
// let code = `
// matrix(3, 3); // Create a 3x3 matrix
// for (blo i = 0 to 2) { // Loop through rows
//   for (blo j = 0 to 2) { // Loop through columns
//     matrix[i][j] = i * 3 + j + 1; // Fill matrix with values 1 to 9
//   }
// }

// for (blo i = 0 to 2) { // Loop through rows
//   for (blo j = 0 to 2) { // Loop through columns
//     console.log(matrix[i][j]); // Output each element of the matrix
//   }
// }
// `;

// // Example usage
// let matrix = createMatrix(3, 3); // Create the 3x3 matrix
// let parsedCode = parseMatrixLoops(code);
// eval(parsedCode); // Evaluate and run the parsed code

// console.log(matrix); // Output the matrix to see its final form

// // Example usage
// console.log(createMatrix(3, 3, 'natural', 'z'));    // Output: [1, 2, 3, 5, 7, 8, 9]
// console.log(createMatrix(3, 3, 'natural', 'spiral')); // Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
if (!String.prototype.VScharacterFrequency) {
    String.prototype.VScharacterFrequency = function () {
        let frequencyMap = {};
        for (let char of this) {
            if (frequencyMap[char]) {
                frequencyMap[char]++;
            } else {
                frequencyMap[char] = 1;
            }
        }
        return frequencyMap;
    };
}
// Example usage
// blo str = "hello world";
// blo frequencyMap = str.characterFrequency();
// console.log(frequencyMap);
// Output: { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }

// filter function

if (!Array.prototype.Filter) {
    Array.prototype.Filter = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.bhaiFilter called on null or undefined"
            );
        }
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const result = [];
        const array = Object(this);
        const len = array.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in array) {
                const val = array[i];
                if (callback.call(thisArg, val, i, array)) {
                    result.push(val);
                }
            }
        }

        return result;
    };
}

// const numbers = [1, 2, 3, 4, 5, 6];

// // Use Filter to filter out even numbers
// const evenNumbers = numbers.Filter(function(number) {
//   return number % 2 === 0;
// });

// console.log(evenNumbers); // Output: [2, 4, 6]

// // sort function

if (!Array.prototype.Sort) {
    Array.prototype.Sort = function (compareFunction) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.Sort called on null or undefined"
            );
        }

        const array = Object(this);
        const len = array.length >>> 0;

        // Default compare function if none is provided
        compareFunction =
            compareFunction ||
            function (a, b) {
                const aStr = String(a);
                const bStr = String(b);
                if (aStr < bStr) return -1;
                if (aStr > bStr) return 1;
                return 0;
            };

        // Implementing a simple bubble sort for educational purposes
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (compareFunction(array[j], array[j + 1]) > 0) {
                    // Swap the elements
                    const temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        return array;
    };
}

// // how to use

// const numbers = [5, 3, 8, 1, 2];

// // Use Sort to sort numbers in ascending order
// numbers.Sort();

// console.log(numbers); // Output: [1, 2, 3, 5, 8]

// // Use Sort with a custom compare function to sort in descending order
// numbers.Sort(function(a, b) {
//   return b - a;
// });

// console.log(numbers); // Output: [8, 5, 3, 2, 1]

//find function

// // Polyfill for Array.prototype.bhaiFind
if (!Array.prototype.Find) {
    Array.prototype.Find = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.Find called on null or undefined"
            );
        }
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const array = Object(this);
        const len = array.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in array) {
                const value = array[i];
                if (callback.call(thisArg, value, i, array)) {
                    return value; // Return the first element that satisfies the callback
                }
            }
        }

        return undefined; // Return undefined if no element satisfies the callback
    };
}

// const numbers = [5, 12, 8, 130, 44];

// // Use Find to find the first number greater than 10
// const found = numbers.Find(function(number) {
//   return number > 10;
// });

// console.log(found); // Output: 12

// reduces funtion

// // Polyfill for Array.prototype.bhaiReduce
if (!Array.prototype.Reduce) {
    Array.prototype.Reduce = function (callback, initialValue) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.Reduce called on null or undefined"
            );
        }
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const array = Object(this);
        const len = array.length >>> 0;
        let accumulator = initialValue;
        let startIndex = 0;

        // If initialValue is not provided, use the first element of the array
        if (arguments.length < 2) {
            if (len === 0) {
                throw new TypeError(
                    "Reduce of empty array with no initial value"
                );
            }
            accumulator = array[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < len; i++) {
            if (i in array) {
                accumulator = callback(accumulator, array[i], i, array);
            }
        }

        return accumulator;
    };
}

// const numbers = [1, 2, 3, 4, 5];

// // Use Reduce to sum all numbers
// const sum = numbers.Reduce(function(accumulator, currentValue) {
//   return accumulator + currentValue;
// }, 0);

// console.log(sum); // Output: 15

// // Use Reduce to find the product of all numbers
// const product = numbers.Reduce(function(accumulator, currentValue) {
//   return accumulator * currentValue;
// }, 1);

// console.log(product); // Output: 120

// VSEvery function

// // Polyfill for Array.prototype.bhaiVSEvery
if (!Array.prototype.VSEvery) {
    Array.prototype.VSEvery = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.VSEvery called on null or undefined"
            );
        }
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const array = Object(this);
        const len = array.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in array) {
                if (!callback.call(thisArg, array[i], i, array)) {
                    return false; // Return false if any element does not satisfy the callback
                }
            }
        }

        return true; // Return true if all elements satisfy the callback
    };
}

// const numbers = [2, 4, 6, 8, 10];

// // Use VSEvery to check if all numbers are even
// const allEven = numbers.VSEvery(function(number) {
//   return number % 2 === 0;
// });

// console.log(allEven); // Output: true

// const mixedNumbers = [1, 2, 3, 4, 5];

// // Use VSEvery to check if all numbers are greater than 0
// const allPositive = mixedNumbers.VSEvery(function(number) {
//   return number > 0;
// });

// console.log(allPositive); // Output: true

//  VSSome function

// // Polyfill for Array.prototype.VSSome
if (!Array.prototype.VSSome) {
    Array.prototype.VSSome = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.VSSome called on null or undefined"
            );
        }
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const array = Object(this);
        const len = array.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in array) {
                if (callback.call(thisArg, array[i], i, array)) {
                    return true; // Return true if any element satisfies the callback
                }
            }
        }

        return false; // Return false if no elements satisfy the callback
    };
}

// const numbers = [1, 3, 5, 7, 9];

// // Use VSSome to check if there is any even number
// const hasEvenNumber = numbers.VSSome(function(number) {
//   return number % 2 === 0;
// });

// console.log(hasEvenNumber); // Output: false

// const mixedNumbers = [1, 2, 3, 4, 5];

// // Use VSSome to check if there is any number greater than 4
// const hasGreaterThanFour = mixedNumbers.VSSome(function(number) {
//   return number > 4;
// });

// console.log(hasGreaterThanFour); // Output: true

// ----------------------------------------

// string methoda

//stringLength

// // Adding stringLength function to String prototype
if (!String.prototype.stringLength) {
    String.prototype.stringLength = function () {
        if (this == null) {
            throw new TypeError(
                "String.prototype.stringLength called on null or undefined"
            );
        }

        let count = 0;
        while (this[count] !== undefined) {
            count++;
        }
        return count;
    };
}

// const str = "Hello, World!";

// // Use stringLength to get the length of the string
// const length = str.stringLength();

// console.log(length); // Output: 13

// VSVSCharAt

// // Polyfill for String.prototype.bhaiVSCharAt
if (!String.prototype.VSCharAt) {
    String.prototype.VSCharAt = function (index) {
        if (this == null) {
            throw new TypeError(
                "String.prototype.VSCharAt called on null or undefined"
            );
        }

        const str = String(this);
        const len = str.length;

        // If index is out of range, return an empty string
        if (index < 0 || index >= len) {
            return "";
        }

        return str[index];
    };
}

// // how to use
// const str = "Hello, World!";

// // Use VSCharAt to get the character at a specific index
// const VSCharAt5 = str.VSCharAt(5);
// const VSCharAt11 = str.VSCharAt(11);

// console.log(VSCharAt5);  // Output: ","
// console.log(VSCharAt11); // Output: "d"

// // Index out of range example
// const VSCharAt20 = str.VSCharAt(20);

// console.log(VSCharAt20); // Output: ""

// VSLastIndexOf

// // Polyfill for String.prototype.bhaiVSLastIndexOf
if (!String.prototype.VSLastIndexOf) {
    String.prototype.VSLastIndexOf = function (searchString, position) {
        if (this == null) {
            throw new TypeError(
                "String.prototype.VSLastIndexOf called on null or undefined"
            );
        }

        const str = String(this);
        const searchStr = String(searchString);
        const len = str.length;
        const searchLen = searchStr.length;

        // If position is undefined or null, set it to the maximum possible value
        let pos = position === undefined ? len : Number(position);

        // Start search from the last character if the position is greater than the string length
        pos = Math.min(pos, len - searchLen);

        // Search for the substring from right to left
        for (let i = pos; i >= 0; i--) {
            if (str.substring(i, i + searchLen) === searchStr) {
                return i; // Return the index if the substring is found
            }
        }

        return -1; // Return -1 if the substring is not found
    };
}

// how to use

// const str = "Hello, World! Hello!";

// // Use VSLastIndexOf to find the last occurrence of a substring
// const VSLastIndexOfHello = str.VSLastIndexOf("Hello");
// const VSLastIndexOfWorld = str.VSLastIndexOf("World");

// console.log(VSLastIndexOfHello); // Output: 14 (the last "Hello" starts at index 14)
// console.log(VSLastIndexOfWorld); // Output: 7 (the "World" starts at index 7)

// // Search for a substring that doesn't exist
// const VSLastIndexOfTest = str.VSLastIndexOf("Test");

// console.log(VSLastIndexOfTest); // Output: -1

// VSToUpperCase

// // Polyfill for String.prototype.VSToUpperCase
if (!String.prototype.VSToUpperCase) {
    String.prototype.VSToUpperCase = function () {
        if (this == null) {
            throw new TypeError(
                "String.prototype.VSToUpperCase called on null or undefined"
            );
        }

        const str = String(this);
        const upperStr = [];

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            // Convert to uppercase using ASCII values
            const code = char.charCodeAt(0);

            if (code >= 97 && code <= 122) {
                // Lowercase letter (a-z)
                upperStr.push(String.fromCharCode(code - 32));
            } else {
                // Non-lowercase letter
                upperStr.push(char);
            }
        }

        return upperStr.join("");
    };
}

// how to use

// const str = "Hello, World!";

// // Use VSToUpperCase to convert the string to uppercase
// const upperStr = str.VSToUpperCase();

// console.log(upperStr); // Output: "HELLO, WORLD!"

// to lowercase

// // Polyfill for String.prototype.bhaiVSToLowerCase
if (!String.prototype.VSToLowerCase) {
    String.prototype.VSToLowerCase = function () {
        if (this == null) {
            throw new TypeError(
                "String.prototype.VSToLowerCase called on null or undefined"
            );
        }

        const str = String(this);
        const lowerStr = [];

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            // Convert to lowercase using ASCII values
            const code = char.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                // Uppercase letter (A-Z)
                lowerStr.push(String.fromCharCode(code + 32));
            } else {
                // Non-uppercase letter
                lowerStr.push(char);
            }
        }

        return lowerStr.join("");
    };
}

// // how to use

// const str = "Hello, World!";

// // Use VSToLowerCase to convert the string to lowercase
// const lowerStr = str.VSToLowerCase();

// console.log(lowerStr); // Output: "hello, world!"

//VSConcat

// // Polyfill for String.prototype.bhaiVSConcat
if (!String.prototype.VSConcat) {
    String.prototype.VSConcat = function (...strings) {
        if (this == null) {
            throw new TypeError(
                "String.prototype.VSConcat called on null or undefined"
            );
        }

        // Convert the context to a string
        let str = String(this);

        // Append each argument string to the original string
        for (let i = 0; i < strings.length; i++) {
            str += String(strings[i]);
        }

        return str;
    };
}

//how to use

// const str1 = "Hello";
// const str2 = " ";
// const str3 = "World!";
// const str4 = " How are you?";

// // // Use VSConcat to VSConcatenate multiple strings
// const result = str1.VSConcat(str2, str3, str4);

// console.log(result); // Output: "Hello World! How are you?"

// dec str1 = "Hello";
// dec str2 = " ";
// dec str3 = "World!";
// dec str4 = " How are you?";

// // // Use VSConcat to VSConcatenate multiple strings
// dec result = str1.VSConcat(str2, str3, str4);

// console.log(result); // Output: "Hello World! How are you?"

// Polyfill for Array.prototype.bhaiIncludes
if (!Array.prototype.Includes) {
    Array.prototype.Includes = function (element, fromIndex = 0) {
        if (this == null) {
            throw new TypeError(
                "Array.prototype.Includes called on null or undefined"
            );
        }

        const arr = Object(this);
        const len = arr.length >>> 0; // Ensures length is a non-negative integer

        // If the array is empty, return false
        if (len === 0) {
            return false;
        }

        // Convert fromIndex to an integer
        let start = fromIndex | 0;

        // If fromIndex is negative, calculate the start index from the end of the array
        if (start < 0) {
            start = Math.max(len + start, 0);
        }

        // Iterate through the array to check if the element is present
        for (let i = start; i < len; i++) {
            // Use SameValueZero comparison (similar to ===, but treats NaN === NaN)
            if (
                arr[i] === element ||
                (typeof arr[i] === "number" &&
                    typeof element === "number" &&
                    isNaN(arr[i]) &&
                    isNaN(element))
            ) {
                return true;
            }
        }

        return false; // Element not found
    };
}

//   const arr = [1, 2, 3, 4, NaN];

// // Use Includes to check if the array contains a specific element
// console.log(arr.Includes(3)); // Output: true
// console.log(arr.Includes(5)); // Output: false
// console.log(arr.Includes(NaN)); // Output: true

// // Using fromIndex to specify the starting search position
// console.log(arr.Includes(2, 2)); // Output: false
// console.log(arr.Includes(2, 1)); // Output: true

// if (!Number.prototype.isPrime) {
//     Number.prototype.isPrime = function() {
//         if (!Number.isInteger(this)) {
//             throw new TypeError('isPrime expects an integer');
//         }

//         if (this < 2) return false;
//         for (let i = 2, sqrt = Math.sqrt(this); i <= sqrt; i++) {
//             if (this % i === 0) return false;
//         }
//         return true;
//     };
// }

// // Example usage:
// // const num = 7;
// // console.log(num.isPrime()); // true

// Adding a custom method to Number's prototype to check if a number is prime
if (!Number.prototype.isPrime) {
    Number.prototype.isPrime = function () {
        // Ensure ⁠ this ⁠ is treated as a number and check if it is an integer
        const num = Number(this);
        if (!Number.isInteger(num)) {
            throw new TypeError("isPrime expects an integer");
        }

        // Check if the number is less than 2
        if (num < 2) return false;

        // Check for factors up to the square root of the number
        for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
            if (num % i === 0) return false;
        }

        // Number is prime
        return true;
    };
}

// Operators Object
const Operators = {
    // Arithmetic Operators
    Add: function (a, b) {
        return a + b;
    },

    Subtract: function (a, b) {
        return a - b;
    },

    Multiply: function (a, b) {
        return a * b;
    },

    Divide: function (a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    },

    Modulus: function (a, b) {
        return a % b;
    },

    Exponent: function (a, b) {
        return Math.pow(a, b);
    },

    // Comparison Operators
    Equal: function (a, b) {
        return a == b;
    },

    StrictEqual: function (a, b) {
        return a === b;
    },

    NotEqual: function (a, b) {
        return a != b;
    },

    StrictNotEqual: function (a, b) {
        return a !== b;
    },

    GreaterThan: function (a, b) {
        return a > b;
    },

    GreaterThanOrEqual: function (a, b) {
        return a >= b;
    },

    LessThan: function (a, b) {
        return a < b;
    },

    LessThanOrEqual: function (a, b) {
        return a <= b;
    },

    // Logical Operators
    And: function (a, b) {
        return a && b;
    },

    Or: function (a, b) {
        return a || b;
    },

    Not: function (a) {
        return !a;
    },

    // Bitwise Operators
    BitwiseAnd: function (a, b) {
        return a & b;
    },

    BitwiseOr: function (a, b) {
        return a | b;
    },

    BitwiseXor: function (a, b) {
        return a ^ b;
    },

    BitwiseNot: function (a) {
        return ~a;
    },

    LeftShift: function (a, b) {
        return a << b;
    },

    RightShift: function (a, b) {
        return a >> b;
    },

    UnsignedRightShift: function (a, b) {
        return a >>> b;
    },

    // Ternary Operator (Conditional)
    Ternary: function (condition, trueResult, falseResult) {
        return condition ? trueResult : falseResult;
    },

    // Assignment Operators (can be used with variables)
    Assign: function (variable, value) {
        return (variable = value);
    },

    AddAssign: function (variable, value) {
        return (variable += value);
    },

    SubtractAssign: function (variable, value) {
        return (variable -= value);
    },

    MultiplyAssign: function (variable, value) {
        return (variable *= value);
    },

    DivideAssign: function (variable, value) {
        return (variable /= value);
    },

    ModulusAssign: function (variable, value) {
        return (variable %= value);
    },

    ExponentAssign: function (variable, value) {
        return (variable **= value);
    },
};

// Example usage:

// Arithmetic
// console.log(Operators.Add(5, 3)); // Output: 8
// console.log(Operators.Divide(10, 2)); // Output: 5

//   // Comparison
//   console.log(Operators.GreaterThan(5, 3)); // Output: true
//   console.log(Operators.Equal(5, '5')); // Output: true

//   // Logical
//   console.log(Operators.And(true, false)); // Output: false
//   console.log(Operators.Or(true, false)); // Output: true

//   // Bitwise
//   console.log(Operators.BitwiseAnd(5, 3)); // Output: 1

//   // Ternary
//   console.log(Operators.Ternary(5 > 3, 'Yes', 'No')); // Output: 'Yes'

//   // Assignment
//   let x = 5;
//   x = Operators.AddAssign(x, 10);
//   console.log(x); // Output: 15

// Input Object...........................................................................................................................................................................

// const Input = {
//   // Method to get user input from a prompt
//   bhaiPromptInput: function(message) {
//     if (typeof message !== 'string') {
//       throw new TypeError('Message must be a string');
//     }

//     // Prompt user for input with a custom message
//     return prompt(message);
//   },

//   // Method to retrieve value from an input field by selector
//   GetInputValue: function(selector) {
//     if (typeof selector !== 'string') {
//       throw new TypeError('Selector must be a string');
//     }

//     // Use Selector to find the input element
//     const inputElement = Selector.QuerySelector(selector);

//     if (inputElement && inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
//       return inputElement.value;
//     } else {
//       throw new Error('Element is not an input or textarea');
//     }
//   },

//   // Method to set value to an input field by selector
//   SetInputValue: function(selector, value) {
//     if (typeof selector !== 'string') {
//       throw new TypeError('Selector must be a string');
//     }

//     // Use Selector to find the input element
//     const inputElement = Selector.QuerySelector(selector);

//     if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
//       inputElement.value = value;
//     } else {
//       throw new Error('Element is not an input or textarea');
//     }
//   },

//   // Method to add an event listener to an input field
//   AddInputEventListener: function(selector, eventType, callback) {
//     if (typeof selector !== 'string' || typeof eventType !== 'string' || typeof callback !== 'function') {
//       throw new TypeError('Invalid arguments');
//     }

//     const inputElement = Selector.QuerySelector(selector);

//     if (inputElement) {
//       inputElement.addEventListener(eventType, callback);
//     } else {
//       throw new Error('Element not found');
//     }
//   }
// };

//   // Example usage:

//   // 1. Prompt user for input
//   const userInput = Input.PromptInput('Enter your name:');
//   console.log('User input:', userInput);

//   // 2. Get value from an input field
//   const inputValue = Input.GetInputValue('#myInput');
//   console.log('Input field value:', inputValue);

//   // 3. Set value to an input field
//   Input.SetInputValue('#myInput', 'New Value');

//   // 4. Add event listener to an input field
//   Input.AddInputEventListener('#myInput', 'input', function(event) {
//     console.log('Input changed to:', event.target.value);
//   });

//   ashish

// word count method
if (!String.prototype.wordCount) {
    String.prototype.wordCount = function () {
        if (this == null) {
            throw new TypeError(
                "String.prototype.wordCount called on null or undefined"
            );
        }

        return this.trim().split(/\s+/).length;
    };
}

// Example usage:
// let str = "Hello World, how are you?";
// console.log(str.wordCount()); // Output: 5

// String.prototype.vowelCount
// Description:
// Counts the number of vowels in a string.

if (!String.prototype.vowelCount) {
    String.prototype.vowelCount = function () {
        if (this == null) {
            throw new TypeError(
                "String.prototype.vowelCount called on null or undefined"
            );
        }

        const vowels = "aeiouAEIOU";
        let count = 0;

        for (let i = 0; i < this.length; i++) {
            if (vowels.indexOf(this[i]) !== -1) {
                count++;
            }
        }

        return count;
    };
}

// // Example usage:
// let str = "Hello World";
// console.log(str.vowelCount()); // Output: 3

// String.prototype.consonantCount
// Description:
// Counts the number of consonants in a string.

// Implementation:
// javascript
// Copy code

if (!String.prototype.consonantCount) {
    String.prototype.consonantCount = function () {
        if (this == null) {
            throw new TypeError(
                "String.prototype.consonantCount called on null or undefined"
            );
        }

        const consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
        let count = 0;

        for (let i = 0; i < this.length; i++) {
            if (consonants.indexOf(this[i]) !== -1) {
                count++;
            }
        }

        return count;
    };
}

// Example usage:
// let str = "Hello World";
// console.log(str.consonantCount()); // Output: 7

// String.prototype.isAnagram
// Description:
// Checks if two strings are anagrams of each other.

// Implementation:
// javascript
// Copy code
if (!String.prototype.VSisAnagram) {
    String.prototype.VSisAnagram = function (otherString) {
        if (this == null || otherString == null) {
            throw new TypeError(
                "String.prototype.VSisAnagram called on null or undefined"
            );
        }

        const normalize = (str) =>
            str.replace(/[^\w]/g, "").VSToLowerCase().split("").sort().join("");
        return normalize(this) === normalize(otherString);
    };
}

// Example usage:
// let str1 = "listen";
// let str2 = "silent";
// console.log(str1.VSisAnagram(str2)); // Output: true

// array methods

// 1. array.mode()
// javascript

if (!Array.prototype.mode) {
    Array.prototype.mode = function () {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError("mode expects an array");
        }

        const frequencyMap = {};
        let maxCount = 0;
        let mode = null;

        for (let i = 0; i < this.length; i++) {
            const num = this[i];
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;

            if (frequencyMap[num] > maxCount) {
                maxCount = frequencyMap[num];
                mode = num;
            }
        }

        return mode;
    };
}

// Example usage:
// const arr = [1, 2, 2, 3, 3, 3];
// console.log(arr.mode()); // 3

// 2. array.median()
// javascript

if (!Array.prototype.median) {
    Array.prototype.median = function () {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError("median expects an array");
        }

        const sorted = this.slice().sort((a, b) => a - b);
        const len = sorted.length;
        const mid = Math.floor(len / 2);

        return len % 2 !== 0
            ? sorted[mid]
            : (sorted[mid - 1] + sorted[mid]) / 2;
    };
}

// Example usage:
// const arr = [1, 3, 2, 5, 4];
// console.log(arr.median()); // 3

// 3. array.quantile()
// javascript

if (!Array.prototype.quantile) {
    Array.prototype.quantile = function (q) {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError("quantile expects an array");
        }
        if (typeof q !== "number" || q < 0 || q > 1) {
            throw new TypeError("quantile expects a number between 0 and 1");
        }

        const sorted = this.slice().sort((a, b) => a - b);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;

        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };
}

// Example usage:
// const arr = [1, 2, 3, 4, 5];
// console.log(arr.quantile(0.5)); // 3

// 4. array.correlation()
// javascript

if (!Array.prototype.correlation) {
    Array.prototype.correlation = function (arr2) {
        if (this == null || !Array.isArray(this) || !Array.isArray(arr2)) {
            throw new TypeError("correlation expects two arrays");
        }
        if (this.length !== arr2.length) {
            throw new Error("Both arrays must have the same length");
        }

        const n = this.length;
        const mean1 = this.reduce((acc, val) => acc + val, 0) / n;
        const mean2 = arr2.reduce((acc, val) => acc + val, 0) / n;

        let numerator = 0;
        let denominator1 = 0;
        let denominator2 = 0;

        for (let i = 0; i < n; i++) {
            const diff1 = this[i] - mean1;
            const diff2 = arr2[i] - mean2;

            numerator += diff1 * diff2;
            denominator1 += diff1 ** 2;
            denominator2 += diff2 ** 2;
        }

        return numerator / Math.sqrt(denominator1 * denominator2);
    };
}

// Example usage:
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// console.log(arr1.correlation(arr2)); // 1 (perfect correlation)

// 5. array.covariance()
// javascript
// Copy code
if (!Array.prototype.covariance) {
    Array.prototype.covariance = function (arr2) {
        if (this == null || !Array.isArray(this) || !Array.isArray(arr2)) {
            throw new TypeError("covariance expects two arrays");
        }
        if (this.length !== arr2.length) {
            throw new Error("Both arrays must have the same length");
        }

        const n = this.length;
        const mean1 = this.reduce((acc, val) => acc + val, 0) / n;
        const mean2 = arr2.reduce((acc, val) => acc + val, 0) / n;

        let covariance = 0;

        for (let i = 0; i < n; i++) {
            covariance += (this[i] - mean1) * (arr2[i] - mean2);
        }

        return covariance / n;
    };
}

// Example usage:
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// console.log(arr1.covariance(arr2)); // 0.666...

// tim sort algoridthm

if (!Array.prototype.timsort) {
    Array.prototype.timsort = function () {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError("timsort expects an array");
        }

        const MIN_MERGE = 32;

        function calcMinRun(n) {
            let r = 0;
            while (n >= MIN_MERGE) {
                r |= n & 1;
                n >>= 1;
            }
            return n + r;
        }

        function insertionSort(arr, left, right) {
            for (let i = left + 1; i <= right; i++) {
                let temp = arr[i];
                let j = i - 1;
                while (j >= left && arr[j] > temp) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = temp;
            }
        }

        function merge(arr, l, m, r) {
            let len1 = m - l + 1;
            let len2 = r - m;
            let left = new Array(len1);
            let right = new Array(len2);
            for (let i = 0; i < len1; i++) {
                left[i] = arr[l + i];
            }
            for (let i = 0; i < len2; i++) {
                right[i] = arr[m + 1 + i];
            }
            let i = 0;
            let j = 0;
            let k = l;
            while (i < len1 && j < len2) {
                if (left[i] <= right[j]) {
                    arr[k] = left[i];
                    i++;
                } else {
                    arr[k] = right[j];
                    j++;
                }
                k++;
            }
            while (i < len1) {
                arr[k] = left[i];
                i++;
                k++;
            }
            while (j < len2) {
                arr[k] = right[j];
                j++;
                k++;
            }
        }

        function timSort(arr) {
            let n = arr.length;
            let minRun = calcMinRun(n);
            for (let start = 0; start < n; start += minRun) {
                insertionSort(arr, start, Math.min(start + minRun - 1, n - 1));
            }
            for (let size = minRun; size < n; size = 2 * size) {
                for (let left = 0; left < n; left += 2 * size) {
                    let mid = left + size - 1;
                    let right = Math.min(left + 2 * size - 1, n - 1);
                    merge(arr, left, mid, right);
                }
            }
        }

        timSort(this);
        return this;
    };
}

//   exampole usage
//   let arr = [5, 2, 8, 3, 1, 6, 4];
// arr.timsort();
// console.log(arr); // [1, 2, 3, 4, 5, 6, 8]

// ===============================================
// Integer methods
// ===============================================

// ############   1. factorial   ##############

if (!Number.prototype.factorial) {
    Number.prototype.factorial = function () {
        console.log("this (factorial) = ", this);
        if (!Number.isInteger(this) || this < 0) {
            throw new TypeError("factorial expects a non-negative integer");
        }

        let result = 1;
        for (let i = 2; i <= this; i++) {
            result *= i;
        }
        return result;
    };
}
// constantVar num = 6;
// console.log(num.factorial()); // 720

// ###############   2. isPrime   ################

if (!Number.prototype.isPrime) {
    Number.prototype.isPrime = function () {
        // Ensure `this` is treated as a number and check if it is an integer
        const num = Number(this);
        if (!Number.isInteger(num)) {
            throw new TypeError("isPrime expects an integer");
        }

        // Check if the number is less than 2
        if (num < 2) return false;

        // Check for factors up to the square root of the number
        for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
            if (num % i === 0) return false;
        }

        // Number is prime
        return true;
    };
}
// blockVar x = 7; // Ensure x is an integer
// console.log(x.isPrime()); // Should output true since 7 is a prime number

// // factorial method

// Number.prototype.factorial = function () {
//     const n = Number(this);

//     if (!Number.isInteger(n) || n < 0) {
//         throw new TypeError("factorial expects a non-negative integer");
//     }

//     let result = 1;
//     for (let i = 2; i <= n; i++) {
//         result *= i;
//     }
//     return result;
// };

// Test the method
// console.log((5).factorial()); // Should output 120

// gcd function

if (!Number.prototype.gcd) {
    Number.prototype.gcd = function (other) {
        const a = Number(this);
        const b = Number(other);

        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            throw new TypeError("gcd expects integer arguments");
        }

        // Euclidean algorithm to find GCD
        const gcd = (x, y) => {
            while (y !== 0) {
                let temp = y;
                y = x % y;
                x = temp;
            }
            return x;
        };

        return gcd(a, b);
    };
}

// lowest common factor
if (!Number.prototype.lcm) {
    Number.prototype.lcm = function (other) {
        const a = Number(this);
        const b = Number(other);

        if (!Number.isInteger(a) || !Number.isInteger(b)) {
            throw new TypeError("lcm expects integer arguments");
        }

        // Ensure non-zero values
        if (a === 0 || b === 0) return 0;

        // Calculate LCM using the GCD method
        return Math.abs(a * b) / a.gcd(b);
    };
}

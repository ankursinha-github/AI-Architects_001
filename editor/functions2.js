// Debounce function for running code
function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// JavaScript for resizer functionality
const resizer = document.getElementById("resizer");
const leftSide = resizer.previousElementSibling;
const rightSide = resizer.nextElementSibling;

let isResizing = false;

// Initialize the widths to be 50% each
leftSide.style.width = "50%";
rightSide.style.width = "50%";

resizer.addEventListener("mousedown", () => {
    isResizing = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    const containerRect = document
        .querySelector(".container")
        .getBoundingClientRect();
    const pointerRelativeXpos = e.clientX - containerRect.left;
    const newLeftWidth = (pointerRelativeXpos / containerRect.width) * 100;
    const newRightWidth = 100 - newLeftWidth;

    // Ensure the width is within reasonable bounds
    if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        leftSide.style.width = `${newLeftWidth}%`;
        rightSide.style.width = `${newRightWidth}%`;
    }
});

document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
});

// ============================================
// Array functions
// ============================================

// ============================================
// Parsing for-loops
// ============================================

function parseForLoops(code) {
    const forLoopRegex =
        /for\s*\(\s*(blockVar|constantVar|globalVar)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\d+)\s*\)\s*\{/g;
    let match;
    let jsCode = "";
    let lastIndex = 0;

    while ((match = forLoopRegex.exec(code)) !== null) {
        const type = match[1];
        const variable = match[2];
        const startValue = match[3];
        const endValue = match[4];

        let jsDeclaration;
        if (type === "blockVar") {
            jsDeclaration = `let ${variable}`;
        } else if (type === "constantVar") {
            jsDeclaration = `const ${variable}`;
        } else if (type === "globalVar") {
            jsDeclaration = `var ${variable}`;
        }

        const jsForLoop = `for (${jsDeclaration} = ${startValue}; ${variable} <= ${endValue}; ${variable}++) {`;

        jsCode += code.substring(lastIndex, match.index) + jsForLoop;
        lastIndex = forLoopRegex.lastIndex;
    }

    jsCode += code.substring(lastIndex);

    return jsCode;
}

// =================================================
// Parsing Variables
// =================================================

function parseVariables(code) {
    const variableRegex =
        /(blockVar|constantVar|globalVar)\s+(\w+)\s*(=\s*(.+))?;/g;
    let match;
    let jsCode = "";
    let lastIndex = 0;

    const invalidDeclarations = code.match(/\b(let|var|const)\b\s+\w+/);
    if (invalidDeclarations) {
        throw new SyntaxError(
            "Unknown declaration type found: " + invalidDeclarations[0]
        );
    }

    while ((match = variableRegex.exec(code)) !== null) {
        const type = match[1];
        const name = match[2];
        const value = match[4] !== undefined ? match[4] : "undefined";

        let jsDeclaration = "";
        if (!isNaN(value)) {
            if (type === "blockVar") {
                jsDeclaration = `let ${name} = Number(${value});`;
            } else if (type === "constantVar") {
                jsDeclaration = `const ${name} = Number(${value});`;
            } else if (type === "globalVar") {
                jsDeclaration = `var ${name} = Number(${value});`;
            }
        } else {
            if (type === "blockVar") {
                jsDeclaration = `let ${name} = ${value};`;
            } else if (type === "constantVar") {
                jsDeclaration = `const ${name} = ${value};`;
            } else if (type === "globalVar") {
                jsDeclaration = `var ${name} = ${value};`;
            }
        }

        jsCode += code.substring(lastIndex, match.index) + jsDeclaration;
        lastIndex = variableRegex.lastIndex;
    }

    jsCode += code.substring(lastIndex);

    return jsCode;
}

// ================================================
// Parsing matrix (2d-array)
// ================================================

function parseCustomSyntax(code) {
    const customSyntaxRegex = /matrix\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    let match;
    let jsCode = "";
    let lastIndex = 0;

    while ((match = customSyntaxRegex.exec(code)) !== null) {
        const rows = match[1];
        const cols = match[2];

        const jsMatrixCode = `let matrix = new Array(${rows}).fill(null).map(() => new Array(${cols}).fill(0));`;

        jsCode += code.substring(lastIndex, match.index) + jsMatrixCode;
        lastIndex = customSyntaxRegex.lastIndex;
    }

    jsCode += code.substring(lastIndex);

    return jsCode;
}

// ==============================================
// Parsing matrix loops
// ==============================================

function parseMatrixLoops(code) {
    const matrixLoopRegex =
        /for\s*\(\s*(blockVar)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\w+)\s*\)\s*\{\s*for\s*\(\s*(blockVar)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\w+)\s*\)\s*\{/g;
    let match;
    let jsCode = "";
    let lastIndex = 0;

    while ((match = matrixLoopRegex.exec(code)) !== null) {
        const rowType = match[1];
        const rowVariable = match[2];
        const startRowValue = match[3];
        const rowEndValue = match[4];

        const colType = match[5];
        const colVariable = match[6];
        const startColValue = match[7];
        const colEndValue = match[8];

        let jsRowDeclaration = `let ${rowVariable}`;
        let jsColDeclaration = `let ${colVariable}`;

        const jsMatrixLoop = `for (${jsRowDeclaration} = ${startRowValue}; ${rowVariable} < ${rowEndValue}; ${rowVariable}++) {
                    for (${jsColDeclaration} = ${startColValue}; ${colVariable} < ${colEndValue}; ${colVariable}++) {
                        let element = matrix[${rowVariable}][${colVariable}];
                        console.log(element);
                    }
                }`;

        jsCode += code.substring(lastIndex, match.index) + jsMatrixLoop;
        lastIndex = matrixLoopRegex.lastIndex;
    }

    jsCode += code.substring(lastIndex);

    return jsCode;
}

const debouncedRun = debounce(run, 500);

function run() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");
    let consoleDiv = document.getElementById("console");

    consoleDiv.innerHTML = "";

    try {
        jsCode = parseVariables(jsCode);
        jsCode = parseForLoops(jsCode);
        jsCode = parseMatrixLoops(jsCode);
        jsCode = parseCustomSyntax(jsCode);

        fetch("functions.js")
            .then((response) => response.text())
            .then((customPrototypes) => {
                try {
                    output.contentDocument.body.innerHTML =
                        htmlCode + "<style>" + cssCode + "</style>";

                    output.contentWindow.console.log = function (message) {
                        if (Array.isArray(message)) {
                            message =
                                "Array: " + JSON.stringify(message, null, 2);
                        } else if (typeof message === "object") {
                            message =
                                "Object: " + JSON.stringify(message, null, 2);
                        }
                        consoleDiv.innerHTML += message + "<br>";
                    };

                    output.contentWindow.eval(`
                                ${customPrototypes}
                                ${jsCode}
                            `);
                } catch (err) {
                    consoleDiv.innerHTML =
                        '<span style="color:red;">Error executing code: ' +
                        err +
                        "</span>";
                }
            })
            .catch((error) => {
                consoleDiv.innerHTML =
                    '<span style="color:red;">Error loading custom prototypes: ' +
                    error +
                    "</span>";
            });
    } catch (e) {
        consoleDiv.innerHTML = '<span style="color:red;">' + e + "</span>";
    }
}

document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("keyup", debouncedRun);
    textarea.value = localStorage.getItem(textarea.id) || "";
    textarea.addEventListener("keyup", () => {
        localStorage.setItem(textarea.id, textarea.value);
    });
});

window.onload = () => {
    document.querySelectorAll("textarea").forEach((textarea) => {
        textarea.value = localStorage.getItem(textarea.id) || "";
    });
};

function add(numA, numB) {
    // console.log(numA + numB);
    return parseInt(numA) + parseInt(numB);
}

function subtract(numA, numB) {
    // console.log(numA + numB);
    return parseInt(numA) - parseInt(numB);
}

function multiply(numA, numB) {
    // console.log(numA + numB);
    return parseInt(numA) * parseInt(numB);
}

function divide(numA, numB) {
    // console.log(numA + numB);
    return parseInt(numA) / parseInt(numB);
}

function operate(operator, numA, numB) {
    return window[operator](numA, numB);
}

function clearDisplay() {
    currentDisplay.textContent = "";
    document.body.append(currentDisplay);
}

//global vars
const currentDisplay = document.querySelector("#currentdisplay");
let currentArray = []; //track inputed numbers
let numbersArray = []; //track joined numbers
let operatorArray = []; //track operators
let runningTotal;

//display selected numbers when pressed
const numButtons = document.querySelectorAll('.numbers');
numButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        currentArray.push(e.target.innerHTML);

        currentDisplay.textContent += e.target.innerHTML;
        document.body.append(currentDisplay);

    })
})

//when operator selected
const operatorButtons = document.querySelectorAll('.operators');
operatorButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        //join all selected numbers and push to numbersArray if there's numbers in currentArray
        if (currentArray.length > 0) {
            numbersArray.push(currentArray.join(''));
        }

        //clear the current array to prep for next number
        currentArray = [];

        //display operator selected and add to operatorArray
        operatorArray.push(e.target.id);
        currentDisplay.textContent += ` ${e.target.innerHTML} `;
        document.body.append(currentDisplay);

        //if two numbers in numbersArray, calculate and show total, else wait for next number
        if (numbersArray.length == 2) {
            runningTotal = operate(operatorArray[0], numbersArray[0], numbersArray[1]);

            numbersArray = [];
            numbersArray.push(runningTotal);

            currentDisplay.textContent = runningTotal;
            document.body.append(currentDisplay);

            //if operator selected again, calculate and show new operator
            operatorArray = [];
            operatorArray.push(e.target.id);
            currentDisplay.textContent += ` ${e.target.innerHTML} `;
            document.body.append(currentDisplay);
        }

        //if operator is selected first


    })
})

//when equals selected
const equals = document.querySelector('#equals'); 
equals.addEventListener('click', function(e) {
    //second number doesn't exist yet when equal button is clicked

    //push second number if it's been inputted, then calculate
    if (currentArray.length > 0) {
        numbersArray.push(currentArray.join(''));
    }
    else { //if no second number inputted, return runningtotal in display
        currentDisplay.textContent = runningTotal;
        document.body.append(currentDisplay);
    }

    if (numbersArray.length == 2) {
        runningTotal = operate(operatorArray[0], numbersArray[0], numbersArray[1]);

        numbersArray = [];
        numbersArray.push(runningTotal);

        currentDisplay.textContent = runningTotal;
        document.body.append(currentDisplay);
    }
    else {  //if equal is clicked with only first number
        currentDisplay.textContent = numbersArray[0];
        document.body.append(currentDisplay);
    }

    //if equal is clicked with no first or second number
    if (numbersArray.length == 0) {
        currentDisplay.textContent = "0";
        document.body.append(currentDisplay);
    }
    
    //leave runningtotal in currentArray in case more numbers are inputted onto total after pressing equal
    currentArray = [];
    currentArray.push(runningTotal);
})

//when clear selected
const clear = document.querySelector('#clear');
clear.addEventListener('click', function(e) {
    clearDisplay();
    currentArray = [];
    numbersArray = [];
    operatorArray = [];
})

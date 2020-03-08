function add(numA, numB) {
    return parseInt(numA) + parseInt(numB);
}

function subtract(numA, numB) {
    return parseInt(numA) - parseInt(numB);
}

function multiply(numA, numB) {
    return parseInt(numA) * parseInt(numB);
}

function divide(numA, numB) {
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
let numbersArray = []; //track joined numbers
let operatorArray = []; //track operators
let runningTotal;
let strCurrent = ""; //track inputted numbers

//display selected numbers when pressed
const numButtons = document.querySelectorAll('.numbers');
numButtons.forEach((button) => {
    button.addEventListener('click', function(e) {

        strCurrent += e.target.innerHTML;

        currentDisplay.textContent += e.target.innerHTML;
        document.body.append(currentDisplay);

    })
})

//when operator selected
const operatorButtons = document.querySelectorAll('.operators');
operatorButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        //check if user adds more numbers to total after running equals
        if (numbersArray[0] && numbersArray[0] != strCurrent) {
                numbersArray[0] = strCurrent;
                strCurrent = "";
        }

        //take inputted number and push to numbersArray
        if (strCurrent.length > 0) {
            numbersArray.push(strCurrent);
        }

        //clear the current array to prep for next number
        strCurrent = "";

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


        //if operator is pressed multiple times


    })
})

//when equals selected
const equals = document.querySelector('#equals'); 
equals.addEventListener('click', function(e) {
    //push second number if it's been inputted, then calculate
    if (strCurrent.length > 0) {
        numbersArray.push(strCurrent);
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

        strCurrent = runningTotal; //keep runningTotal in strCurrent in case user adds more numbers to total
    }
    else {  //check if equal is clicked with only first number
        currentDisplay.textContent = numbersArray[0];
        document.body.append(currentDisplay);
    }

    //check if equal is clicked with no first or second number
    if (numbersArray.length == 0) {
        currentDisplay.textContent = "0";
        document.body.append(currentDisplay);
    }
    
    operatorArray = [];
})

//when clear selected
const clear = document.querySelector('#clear');
clear.addEventListener('click', function(e) {
    clearDisplay();
    strCurrent = "";
    runningTotal = "";
    numbersArray = [];
    operatorArray = [];
})

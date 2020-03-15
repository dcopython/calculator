function add(numA, numB) {
    if (numA.toString().indexOf(".") == -1) {
        numA = parseInt(numA);
    }
    else {
        numA = parseFloat(numA);
    }

    if (numB.toString().indexOf(".") == -1) {
        numB = parseInt(numB);
    }
    else {
        numB = parseFloat(numB);
    }

    return numA + numB;
}

function subtract(numA, numB) {
    if (numA.toString().indexOf(".") == -1) {
        numA = parseInt(numA);
    }
    else {
        numA = parseFloat(numA);
    }

    if (numB.toString().indexOf(".") == -1) {
        numB = parseInt(numB);
    }
    else {
        numB = parseFloat(numB);
    }

    return numA - numB;
}

function multiply(numA, numB) {
    if (numA.toString().indexOf(".") == -1) {
        numA = parseInt(numA);
    }
    else {
        numA = parseFloat(numA);
    }

    if (numB.toString().indexOf(".") == -1) {
        numB = parseInt(numB);
    }
    else {
        numB = parseFloat(numB);
    }

    return numA * numB;
}

function divide(numA, numB) {
    if (numA.toString().indexOf(".") == -1) {
        numA = parseInt(numA);
    }
    else {
        numA = parseFloat(numA);
    }

    if (numB.toString().indexOf(".") == -1) {
        numB = parseInt(numB);
    }
    else {
        numB = parseFloat(numB);
    }

    return numA / numB;
}

// function operatorCheck(operator) {
//     document.getElementById(operator).disabled = true;
// }

function operate(operator, numA, numB) {
    total = window[operator](numA, numB);
    if (Number.isInteger(total)) { //return if whole number
        return total;
    }
    else {
        return total.toFixed(2); //round answer if it has many decimals
    }
}

function operateWithNewTotal() {
    if (operator == "divide") { //check if user tries to divide by 0
        if (numbersArray[0] == 0 || numbersArray[1] == 0) {
            alert("Can't divide by 0!");
            total = "";
        }
        else {
            total = operate(operator, numbersArray[0], numbersArray[1]); //calculate

            numbersArray = [];//clear array and push new total
            numbersArray.push(total);
        }
    }
    else {
        total = operate(operator, numbersArray[0], numbersArray[1]); //calculate

        numbersArray = [];//clear array and push new total
        numbersArray.push(total);
    }

    currentDisplay.textContent = total; //put new total on display
    document.body.append(currentDisplay);
}

function clearDisplay() {
    currentDisplay.textContent = "";
    document.body.append(currentDisplay);
}

//global vars
const currentDisplay = document.querySelector("#currentdisplay");
let numbersArray = [];
let total;
let operator; //track operators
let currentStr = ""; //track inputted numbers

//display selected numbers when pressed
const numButtons = document.querySelectorAll('.numbers');
numButtons.forEach((button) => {
    button.addEventListener('click', function(e) {

        currentStr += e.target.innerHTML;

        currentDisplay.textContent += e.target.innerHTML;
        document.body.append(currentDisplay);

    })
})

//when operator selected
const operatorButtons = document.querySelectorAll('.operators');
operatorButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        //check if user adds more numbers to total after running equals
        //check if operator is inputted first
        //check if operator is pressed multiple times

        //check if there's inputted number and push to numbersArray
        if (currentStr.length > 0) {
            numbersArray.push(currentStr);
        }

        currentStr = "";  //clear the current array to prep for next number

        //check if two numbers in numbersArray
        if (numbersArray.length == 2) {
            
            operateWithNewTotal();

            //show new total and new operator
            operator = e.target.id;
            currentDisplay.textContent += ` ${e.target.innerHTML} `;
            document.body.append(currentDisplay);
        }
        else { //if only one number in numbersArray
            operator = e.target.id; //display operator selected and add to operatorArray
            currentDisplay.textContent += ` ${e.target.innerHTML} `;
            document.body.append(currentDisplay);
        }

        decimal.disabled = false;

    })
})

//when decimal selected
const decimal = document.getElementById("decimal");
decimal.addEventListener('click', function(e) {
    currentStr += `${e.target.innerHTML}`;
    currentDisplay.textContent  += `${e.target.innerHTML}`;
    document.body.append(currentDisplay);

    this.disabled = true;
})

//when equals selected
const equals = document.querySelector('#equals'); 
equals.addEventListener('click', function(e) {
    //check if equal is clicked with no first or second number
    if (numbersArray.length == 0) {
        currentDisplay.textContent = "0";
        document.body.append(currentDisplay);
    }

    //add second number to array if it's been inputted
    if (currentStr.length > 0) {
        numbersArray.push(currentStr);
        currentStr = "";
    }
    else { //if no second number inputted, return total in display
        currentDisplay.textContent = total;
        document.body.append(currentDisplay);
    }

    if (numbersArray.length == 2) {
        operateWithNewTotal();

    }
    else {  //check if equal is clicked with only first number
        currentDisplay.textContent = numbersArray[0];
        document.body.append(currentDisplay);
    }

    operator = ""; //clear the array after equals is ran
})

//when clear selected
const clear = document.querySelector('#clear');
clear.addEventListener('click', function(e) {
    clearDisplay();
    currentStr = "";
    total = "";
    operator = "";
    numbersArray = [];
})
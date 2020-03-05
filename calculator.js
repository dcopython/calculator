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

//global vars
const currentDisplay = document.querySelector("#currentdisplay");
const totalDisplay = document.querySelector("#totaldisplay");
let selectedOperator;
let firstNumber;

//display selected numbers when pressed
const numButtons = document.querySelectorAll('.numbers');
numButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        currentDisplay.textContent += e.target.innerHTML;
        document.body.append(currentDisplay);
    })
})

//when operator selected
const operatorButtons = document.querySelectorAll('.operators');
operatorButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        selectedOperator = e.target.id; //update global var with selected operator
    
        firstNumber = currentDisplay.textContent; //save first number when operator selected
    
        totalDisplay.textContent = firstNumber; //update totalDisplay with currentDisplay content
        totalDisplay.textContent += ` ${e.target.innerHTML} `; //add operator into totalDisplay
        
        currentDisplay.textContent = ""; //clear current display
    
        document.body.append(currentDisplay);
        document.body.append(totalDisplay);
    })
})

//when equals selected
const equals = document.querySelector('#equals'); 
equals.addEventListener('click', function(e) {
    let secondNumber = currentDisplay.textContent; //save second number
    //console.log(operate(selectedOperator, firstNumber, secondNumber))
    
    //update totalDisplay after calculation
    totalDisplay.textContent = operate(selectedOperator, firstNumber, secondNumber);
    currentDisplay.textContent = "";
    document.body.append(currentDisplay);
    document.body.append(totalDisplay);
})

//when clear selected
const clear = document.querySelector('#clear');
clear.addEventListener('click', function(e) {
    currentDisplay.textContent = "";
    totalDisplay.textContent = "";
    document.body.append(currentDisplay);
    document.body.append(totalDisplay);
})




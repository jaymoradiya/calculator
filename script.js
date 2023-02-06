// import './infix';


let operators = [];
let numbers = [];
var isCalculated = false;

function solve(val) {
    if (isCalculated) {
        document.getElementsByClassName("display")[0].innerHTML = "";
        isCalculated = false;
    }
    var currentVal = document.getElementsByClassName("display")[0].innerHTML;

    if (val === "c") {
        document.getElementsByClassName("display")[0].innerHTML = "";
        return;
    }
    if (val === "=") {
        if (currentVal.length > 0) {
            isCalculated = true;
            let msg;
            try {
                msg = calculate(currentVal);

            } catch (error) {
                msg = "Invalid Expression";
            }
            document.getElementsByClassName("display")[0].innerHTML = msg;
        }
        return;
    }

    document.getElementsByClassName("display")[0].innerHTML = currentVal + val;
}


function calculate(exp){
    for (let i = 0 ; i < exp.length; i++){
        var c = exp[i].trim();
        if (isNumber(c)){
            let num = 0;
            while (isNumber(c)){
                num = num*10 + (c-'0');
                i++;
                if(i < exp.length){
                    c = exp[i];
                }
                else{
                    break;
                }
            }
            i--;
            numbers.push(num);

        }
        else if(c=='(') {
            operators.push(c);  
        } 
        else if(c==')') {
            while(operators[operators.length -1] !='('){
                var output = performCalculation();
                numbers.push(output);  
            }
            operators.pop();
        }
        else if(isOperator(c)) {
            while((numbers.length != 0) && precedence(c)<=precedence(operators[operators.length -1]))
            {
                    var output = performCalculation();
                    numbers.push(output); 
            }
            operators.push(c);  
        }
        console.log(c);
    }

    while(operators.length != 0){
         var output = performCalculation();
         numbers.push(output);
    }
    return numbers.pop();
}


function precedence(o)
{
    switch (o){
        case '-':
            return 0;
        case '+':
            return 1;
        case '*':
            return 2;
        case '/':
            return 3;
    }
    return -1;
}


function performCalculation(){
    const a = numbers.pop();
    const b = numbers.pop();
    const o = operators.pop();

    switch (o){
        case '+':
            return a + b;
        case '-':
            return b - a;
        case '*':
            return a * b;
        case '/':
            if (a == 0){
                console.log("Cannot divide by zero");
                return 0;
            }
            return b / a;
    }
    return 0;
}

function isOperator(val) {
    return val === '+' || val === "-" || val === "/" || val === "*";
}

function isNumber(val) {
    return val === "0" || val === "1" || val === "2" || val === "3"  || val === "4" || val === "5" || val === "6" || val === "7" ||val === "8" || val === "9";
}


console.log("answer ==> "+calculate("1+2"));

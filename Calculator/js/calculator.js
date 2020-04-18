let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
    console.log("value", value);
    console.log("buffer", buffer);
    console.log("runningTotal", runningTotal);
    console.log("previousOperator", previousOperator);
}

function handleNumber(snum){
    if(buffer === '0'){
        buffer = snum;
    }else if(previousOperator === null){
        buffer = snum;
        previousOperator = undefined;
    } else {
        buffer += snum;
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = undefined;
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '=':
            if(previousOperator === undefined) return;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1) buffer = '0';
            else buffer = buffer.substr(0,buffer.length-1);
    }
}

function handleMath(symbol){
    if(buffer === '0') return;
    
    const ibuffer = +buffer;

    if(runningTotal === 0){
        runningTotal = ibuffer;

    } else {
        flushOperation(ibuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(ibuffer){
    switch(previousOperator){
        case '+':
            runningTotal+=ibuffer;
            break;
        case '−':
            runningTotal-=ibuffer;
            break;
        case '×':
            runningTotal*=ibuffer;
            break;
        case '÷':
            runningTotal/=ibuffer;
            break;
        default:
            break;
    }
}

function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
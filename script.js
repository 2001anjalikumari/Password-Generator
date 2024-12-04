const sliderHandler = document.querySelector("#slider-Handler");
const passwordLenght = document.querySelector("#password-Lenght");
const indicator = document.querySelector("#indicator");
const passwordDisplay = document.querySelector("#password-Display");
const copyMsg = document.querySelector("#copy-msg");
const upperCase = document.querySelector('#uppercase');
const lowerCase = document.querySelector('#lowercase');
const numberCase = document.querySelector('#number');
const Symbols = document.querySelector('#symbol');
const copyBtn = document.querySelector('#copy-Btn');
const generateButton = document.querySelector("#generate-Button");

const allChekBox = document.querySelectorAll("input[type=checkbox]");

// symbol strings random generate
const symbol = '~!@#$%^&*()_+{}[]|\:;<>,.?/';

//-----------------set default properties load page---------------//

let password = "";
let defaultpassLenght = 10;
let checkCount = 1;

handleSlider();



//-------------set slider properties----------------------//

function handleSlider() {
    sliderHandler.value = defaultpassLenght;
    passwordLenght.innerText = defaultpassLenght;
    setStrenghtColor()

}
sliderHandler.addEventListener('input', (e) => {
    defaultpassLenght = e.target.value;
    handleSlider();
});


//-----------------define funtions for random int,upperchar,lowerchar,symbol-----------//

function getrandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generaterendomNumber() {
    return getrandomInteger(0, 9);
}

function generaterandomlowerCase() {
    return String.fromCharCode(getrandomInteger(97, 123));
}

function generaterandomupperCase() {
    return String.fromCharCode(getrandomInteger(65, 91));
}

function generateSymbol() {
    const random = getrandomInteger(0, symbol.length);
    // console.log( 'generate symbol',symbol.charAt(random));
    return symbol.charAt(random);
}





//-----------------set indicator strenght-------------------//

function setStrenghtColor() {
    if (defaultpassLenght <= 8) {
        indicator.style.backgroundColor = 'red';
        indicator.style.boxShadow = '0px 0px 10px red'
        console.log('helloo')
    }

    else if (defaultpassLenght > 8 && defaultpassLenght < 15) {
        indicator.style.backgroundColor = 'blue';
        indicator.style.boxShadow = '0px 0px 10px blue'

        console.log('helloo2')

    }
    else {
        indicator.style.backgroundColor = 'green';
        indicator.style.boxShadow = '0px 0px 10px green'
        console.log('helloo3')

    }
};



//-------------copyMsssg on clipboard--------------//

async function copyMssg() {

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'copied';
    }
    catch (e) {
        copyMsg.innerText = 'copied failed';
    }

    // visible active class
    copyMsg.classList.add('active');

    // remove active class in copymsg
    setTimeout(() => {
        copyMsg.classList.remove('active');
        copyMsg.innerText = "";
    }, 2000);

    console.log('hello8');

}
// listener for cll copymssg function
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyMssg();
})




//---------------- chek checkbox counts-------------------//

function handleCheckBox() {
    checkCount = 0;
    allChekBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    })

    // jb passwordlenght ki value km ho checkount se tb

    if (defaultpassLenght < checkCount) {
        defaultpassLenght = checkCount;
        console.log('hh2')
        handleSlider();
    }
}

allChekBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBox);
})




//--------------- generate button section-------------------------// 

generateButton.addEventListener('click', () => {
    // jb koi bi check box chek n ho tb
    if (checkCount = 0)
        return;

    handleCheckBox();


    if (defaultpassLenght < checkCount) {
        defaultpassLenght = checkCount;
        console.log('handle')
        handleSlider();
    }

    // jb nya password generate hoga tb
    console.log("generateButton");

    // phle field ko empty rna h
    password = "";

    // ky ky elements add krne h password m vo dekhna h

    let funArr = [];

    if (upperCase.checked)
        funArr.push(generaterandomupperCase);
    if (lowerCase.checked)
        funArr.push(generaterandomlowerCase);
    if (numberCase.checked)
        funArr.push(generaterendomNumber);
    if (Symbols.checked)
        funArr.push(generateSymbol);


    generateSymbol();
    // jo jo check h vo add karna copmpulsary condition

    for (let i = 0; i < funArr.length; i++) {

        password += funArr[i](); // yha ye function kyu cll hua 
    }

    console.log("compulsary", password);

    // or bache hua character jo random add hogre kuch bi

    for (let i = 0; i < defaultpassLenght - funArr.length; i++) {
        console.log('remaining')

        let randomIndex = getrandomInteger(0, funArr.length);
        password += funArr[randomIndex](); // yha pr bi ye kyu fun cll hua

    }
    console.log("compulsary", password);

    console.log("bachha kucha rh gya jo")

    passwordDisplay.value = password;

    console.log("hogya........");


})









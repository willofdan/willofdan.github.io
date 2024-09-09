const randomNumber = Math.floor(Math.random()*100 + 1);

const inputGuess = document.querySelector(".inputGuess");
const buttonGuess = document.querySelector(".buttonGuess");

const lastResult = document.querySelector(".lastResult");
const guessing = document.querySelector(".guessing");
const lowOrHi = document.querySelector(".lowOrHi");

const resetButton = document.querySelector(".resetGame");
let count = 1;

function tryGuess (){
    const input = Number(inputGuess.value);

    if(count === 1){
        lastResult.textContent = `Previous Number : ${input}`;
    } else{
        lastResult.textContent = `${lastResult.textContent} ${input}`;
    }

    if(count === 10){
        guessing.textContent = "YAH GAME OVER NOOB BANGET!!!";
        guessing.style.backgroundColor = "red";
        guessing.style.color = "white";
        setGameOver();
    } else if(input != randomNumber){
        guessing.textContent = "SALAH!!!";
        guessing.style.backgroundColor = "red";
        guessing.style.color = "white";
        guessing.style.padding = "5px";

        if(input<randomNumber){
            lowOrHi.textContent = "Angka terakhir kamu kekecilan";
            lowOrHi.style.backgroundColor = "red";
            lowOrHi.style.color = "white";
            lowOrHi.style.padding = "5px"
        } else if(input>randomNumber){
            
            lowOrHi.textContent = "Angka terakhir kamu kegedean";
            lowOrHi.style.backgroundColor = "red";
            lowOrHi.style.color = "white";
            lowOrHi.style.padding = "5px"
        }
    } else {
        guessing.textContent = "BENAR!!!";
        guessing.style.backgroundColor = "green";
        guessing.style.color = "white";
        guessing.style.padding = "5px";
        lowOrHi.textContent = "";
        lowOrHi.style.backgroundColor = "white";
        setGameOver();
    }

    inputGuess.value = "";
    inputGuess.focus();
    count++;
}

function setGameOver(){
    buttonGuess.disabled = true;
    inputGuess.disabled = true;
    resetButton.style.display = "block";
    resetButton.addEventListener("click", setNewGame);
}

function setNewGame(){
    count = 1;

    buttonGuess.disabled = false;
    inputGuess.disabled = false;

    const resetParas = document.querySelectorAll(".container-display p");
    for (const resetPara of resetParas) {
      resetPara.textContent = "";
    }
    
    guessing.style.backgroundColor = "white";
    lowOrHi.style.backgroundColor = "white";

    resetButton.style.display = "none";

    inputGuess.value = "";
    inputGuess.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;

}

buttonGuess.addEventListener("click",tryGuess);
inputGuess.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        buttonGuess.click();
    }
});
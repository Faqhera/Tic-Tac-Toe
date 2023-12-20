let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container ");
let msg = document.querySelector("#msg");
let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");

let currentMode = "light"
let turnO = true;  //playerX, playerO

const winPtterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

modeBtn.addEventListener ("click", () => {
    if(currentMode === "light"){
        currentMode ="dark";
    body.classList.add("dark");
    body.classList.remove("light");
} else {
    currentMode ="light";
    body.classList.add("light");
    body.classList.remove("dark");
}
});

boxes.forEach ((box) => {
box.addEventListener("click", () => {
    if(turnO) {
        box.innerText = "O";
        turnO = false;
    } else {
        box.innerText = "X";
        turnO = true; 
    }
    box.disabled = true;

    checkWinner();
});
});

const disableBoxes = () => {
    for (let box of boxes ) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes ) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
 msg.innerText = `Congratulation, Winner is ${winner}`;
 msgContainer.classList.remove("hide");
 disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPtterns) {
        let position1Value = boxes[pattern[0]].innerText;
        let position2Value = boxes[pattern[1]].innerText; 
        let position3Value = boxes[pattern[2]].innerText; 

        if(position1Value !="" && position2Value !="" && position3Value !="") {
            if(position1Value === position2Value &&
                position2Value === position3Value &&
                position3Value === position1Value
                ) {
                showWinner(position1Value);
                
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

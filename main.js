//Module Pattern Objects or IIFE
const gameBoard = (() => {
    const boardCont = document.querySelector("#board-cont")
    const boardGrids = ["one","two","three","four","five","six","seven","eight","nine"]
    const boardLoad = () => {
        for (let x of boardGrids){
            boardCont.innerHTML += `
            <div class="grid-cells ${x}"></div>`           
        }
    }
    return {
        boardLoad
    };
})();

gameBoard.boardLoad();

const board = {
    one: "one",
    two: "two",
    three: "three",
    four: "four",
    five: "five",
    six: "six",
    seven: "seven",
    eight: "eight",
    nine: "nine"
}

const gameCheck = (() => {
    const compare = (a,b,c) => {
        if (a === b && b === c) {
            pTurn = pTurn === 0 ? 1 : 0;
            overlay.innerHTML = `
            <p>${players[pTurn].type} Wins!!!</p>`
            overlay.style.display = "flex";
            console.log(`${players[pTurn].type} wins!!`)
            setTimeout( () => window.location.reload(),3500)
        } else return
    }
    const checkAll = () => {
        let occupiedGrid = 0;
        for (let x in board){            
            if (board[`${x}`] === "X" || board[`${x}`] === "O"){
                occupiedGrid++;
            }
            if (occupiedGrid === 9 && overlay.innerHTML === ""){
                console.log("Tie")
                pTurn = 2
                overlay.innerHTML = `
                <p>Its a TIE game!!</p>`
                overlay.style.display = "flex";
                setTimeout( () => window.location.reload(),3500);
            }
        }
    }
    return {
        compare,
        checkAll        
    }
})();

//Factory Function 
function player(type,playerMark){    
    return{ type, playerMark  }
}

//Global Variables
const gridCells = document.querySelectorAll(".grid-cells")
const overlay = document.querySelector("#game-status-cont")
let pTurn;
let pTwoPmark;
let players = [];

//Adding event listener to execute functions
document.querySelectorAll(".pmarks-select").forEach(pmark => pmark.addEventListener("click", selectMark))
document.querySelectorAll(".op-select").forEach(op => op.addEventListener("click", selectOpponent))
gridCells.forEach(grid => grid.addEventListener("click", placeMark))



function selectMark(e){
    if (players[0] === undefined){
        e.path[0].style.backgroundColor = "#825150";
        e.path[0].style.color = "#fff";
        const opSelect = document.querySelector(".opponent-select-panel")
        opSelect.style.display = "flex";
        const playerOne = player("Player 1", e.path[0].firstChild.data)
        players.push(playerOne)
        pTwoPmark = e.path[0].firstChild.data === "X" ? "O" : "X" 
    } else return


}

function selectOpponent(e){
    if (players[1] === undefined){
        e.path[0].style.backgroundColor = "#825150";
        e.path[0].style.color = "#fff";
        const playerTwo = player(e.path[0].firstChild.data, pTwoPmark)
        players.push(playerTwo)
        for (let x in players) {
            if (players[x].playerMark === "X"){
                pTurn = parseInt(x);
            }        
        }
        if (players[1].type === "Computer" && players[1].playerMark === "X"){
            setTimeout(CompPlay,2000)
        }
    }
}


function placeMark(e){
    if (e.target.innerText !== "") return 
    else {
        e.target.innerText = `${players[pTurn].playerMark}`
        const targetGrid = e.path[0].classList[1]
        board[`${targetGrid}`] = `${players[pTurn].playerMark}`
        pTurn = pTurn === 0 ? 1 : 0

        
        gameCheck.compare(board.one,board.two,board.three);
        gameCheck.compare(board.four,board.five,board.six);
        gameCheck.compare(board.seven,board.eight,board.nine);
        gameCheck.compare(board.one,board.four,board.seven);
        gameCheck.compare(board.two,board.five,board.eight);
        gameCheck.compare(board.three,board.six,board.nine);
        gameCheck.compare(board.one,board.five,board.nine);
        gameCheck.compare(board.three,board.five,board.seven);
        gameCheck.checkAll();

        if (players[1].type === "Computer"){
            setTimeout(CompPlay,2000)
        }
    }

}

function CompPlay(){
    if (overlay.innerHTML !== ""){
        return
    } else {
        let randomPlace = Array.from(gridCells)[(Math.floor(Math.random()*9))];
        while (randomPlace.innerText !== "" || pTurn === 2){
            randomPlace = Array.from(gridCells)[(Math.floor(Math.random()*9))]
        } 
        randomPlace.innerText = `${players[1].playerMark}`
        const targetGrid = randomPlace.classList[1]
        board[`${targetGrid}`] = `${players[1].playerMark}`
        pTurn = pTurn === 0 ? 1 : 0;
    
        gameCheck.compare(board.one,board.two,board.three);
        gameCheck.compare(board.four,board.five,board.six);
        gameCheck.compare(board.seven,board.eight,board.nine);
        gameCheck.compare(board.one,board.four,board.seven);
        gameCheck.compare(board.two,board.five,board.eight);
        gameCheck.compare(board.three,board.six,board.nine);
        gameCheck.compare(board.one,board.five,board.nine);
        gameCheck.compare(board.three,board.five,board.seven);
        gameCheck.checkAll();       
    }
}
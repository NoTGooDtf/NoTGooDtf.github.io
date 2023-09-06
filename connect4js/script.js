/*
6 high 7 wide
2 players different colors alternating turns
4 in a row to win hor vert or diag

*/
const width = 7
const height = 6
const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#playerTurn")
const gameInfo = document.querySelector("#gameInfo")
var playerGo = "Black"
playerDisplay.textContent = playerGo

const blackToken = "\u2b24"
const whiteToken = "\u25CB"

const button1 = document.getElementById("dropper1")
const button2 = document.getElementById("dropper2")
const button3 = document.getElementById("dropper3")
const button4 = document.getElementById("dropper4")
const button5 = document.getElementById("dropper5")
const button6 = document.getElementById("dropper6")
const button7 = document.getElementById("dropper7")

const resetButton = document.getElementById("reset")

button1.addEventListener("click", dropPiece)
button2.addEventListener("click", dropPiece)
button3.addEventListener("click", dropPiece)
button4.addEventListener("click", dropPiece)
button5.addEventListener("click", dropPiece)
button6.addEventListener("click", dropPiece)
button7.addEventListener("click", dropPiece)

resetButton.addEventListener("click",resetBoard)

const col1 = [35,28,21,14,7,0]
const col2 = [36,29,22,15,8, 1]
const col3 = [37,30,23,16,9, 2]
const col4 = [38,31,24,17,10, 3]
const col5 = [39,32,25,18,11, 4]
const col6 = [40,33,26,19,12, 5]
const col7 = [41,34,27,20,13, 6]
const row1 = [35,36,37,38,39,40,41]
const row2 = [28,29,30,31,32,33,34]
const row3 = [21,22,23,24,25,26,27]
const row4 = [14,15,16,17,18,19,20]
const row5 = [7,8,9,10,11,12,13]
const row6 = [0,1,2,3,4,5,6]

function createBoard() {
    for (let i = 0; i < (width*height); i++) {
            const gridPart = document.createElement('div')
            const gridP1 = document.createElement("p1")
            gridPart.classList.add('grid')
            gridPart.setAttribute('id', i)
            gridP1.classList.add('token')
            gridP1.setAttribute('t-id', i)
            gridPart.appendChild(gridP1)
            gameBoard.append(gridPart)
     }
}

function dropPiece(e) {
    const dropper = e.target.id
    switch(dropper) {
        case 'dropper1' : 
            checkGrid(col1)
            return;
        case 'dropper2' :
            checkGrid(col2)
            return true
        case 'dropper3' :
            checkGrid(col3)
            return true
        case 'dropper4' :
            checkGrid(col4)
            return true
        case 'dropper5' :
            checkGrid(col5)
            return true
        case 'dropper6' :
            checkGrid(col6)
            return true
        case 'dropper7' :
            checkGrid(col7)
            return true
    }
}

createBoard()
function checkGrid(spot) {
    for (i=0; i < spot.length; i++) {
        const sp = document.querySelector(`[t-id="${spot[i]}"]`)
        if (sp.innerText === "") {
            if (playerGo === "Black") {
                sp.innerText = blackToken
                playerGo = "White"
                playerDisplay.textContent = playerGo
                checkWin(spot[i])
                return
            } else {
                sp.innerText = whiteToken
                playerGo = "Black"
                playerDisplay.textContent = playerGo
                checkWin(spot[i])
                return
            }
        }
    }
}

function checkWin(i) {
    const sp = document.querySelector(`[t-id="${i}"]`)
    const wb = sp.innerText
    /*
    array for columns and arrays for rows, then have incremental counter
    that goes up for sequential colors and returns on different color.
    no clue for diags yet.
    */
    var counter = 0
    //check vert down win cause you can only get a vert win with down 4
    if (document.querySelector(`[t-id="${i + width}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + width * 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i + width * 3}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //horizontal right win, allows wrap around win.
    if (document.querySelector(`[t-id="${i + 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i + 3}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i + 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i + 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i -2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i -1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i - 3}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i - 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //diag backslash win
    if (document.querySelector(`[t-id="${i + width + 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + width * 2 + 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i + width * 3 + 3}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i + width + 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + width * 2 + 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - width - 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i + width + 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i - width * 2 - 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - width - 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i - width * 3 - 3}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i - width * 2 - 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - width - 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //diag forwardslash win
    if (document.querySelector(`[t-id="${i + width - 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + width * 2 - 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i + width * 3 - 3}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i + width - 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i + width * 2 - 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - width + 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i + width - 1}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i - width * 2 + 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - width + 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
    //--
    if (document.querySelector(`[t-id="${i - width * 3 + 3}"]`)?.innerText === wb) {
        if (document.querySelector(`[t-id="${i - width * 2 + 2}"]`)?.innerText === wb) {
            if (document.querySelector(`[t-id="${i - width + 1}"]`)?.innerText === wb) {
                gameCleanup()
            }
        }
    }
}

function gameCleanup() {
    //white wins
    if (playerGo === "Black") {
        gameInfo.innerHTML = "White wins"
    } else {
        gameInfo.innerHTML = "Black wins"
    }
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
    button5.disabled = true;
    button6.disabled = true;
    button7.disabled = true;
}

function resetBoard() {
    const allT = document.querySelectorAll("p1");
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = false;
    button5.disabled = false;
    button6.disabled = false;
    button7.disabled = false;
    gameInfo.innerHTML = ""
    playerGo = "Black"
    allT.forEach((it) => it.innerText="")
}
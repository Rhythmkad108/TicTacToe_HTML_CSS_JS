let playerText=document.getElementById('title')
let resBtn=document.getElementById('resbtn')
const boxes=Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT="O"
const X_TEXT="X"
let currentPlayer=X_TEXT
let spaces=Array(9).fill(null)

const startGame=() => {
    boxes.forEach(box =>box.addEventListener("click", boxClicked))
}

function boxClicked(e){
    const id=e.target.id

    if(!spaces[id]){
        spaces[id]=currentPlayer
        e.target.innerText=currentPlayer

        if(playerHasWon() !==false){
            var audio=new Audio('./sounds/winningsound.mp3')
            audio.play()
            playerText.innerHTML = `${currentPlayer} has won!`
            let winningBlocks=playerHasWon()

            winningBlocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        if(spaces[id]==="X"){
            var audio=new Audio('./sounds/blue.mp3')
            audio.play()
        }
        else{
            var audio=new Audio('./sounds/green.mp3')
            audio.play()
        }

        currentPlayer=currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for(const condition of winningCombos){
        let [a, b, c]=condition

        if(spaces[a] && spaces[a]==spaces[b] && spaces[a]==spaces[c]){
            return [a, b, c]
        }
    }
    return false
}

resBtn.addEventListener('click', restart)

function restart(){
    var audio=new Audio('./sounds/yellow.mp3')
    audio.play()
    spaces.fill(null)

    boxes.forEach(box =>{
        box.innerText=''
        box.style.backgroundColor=''
    })

    playerText.innerHTML='Tic Tac Toe'

    currentPlayer=X_TEXT
}

startGame()
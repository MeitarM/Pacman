'use strict'

const WALL = '#'
const FOOD = '.'
const POWER_FOOD = '+'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false
}
var gBoard


function onInit() {
    gGame.score = 0
    updateScore(gGame.score)
    
    gBoard = buildBoard()

    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)

    gGame.isOn = true
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            else if(i===1 && (j===1 || j===size-2)) board[i][j] = POWER_FOOD
            else if(i===size-2 && (j===1 || j===size-2)) board[i][j] = POWER_FOOD
        }
    }
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    // console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = 'Game Over'
    elModal.style.display = 'block'

}

function gameVictory(board) {
    for (var i =0; i<board.length;i++){
        for(var j=0; j<board[0].length;j++){
            if (board[i][j] === FOOD) return
        }
    }
    console.log('Victory')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = 'Victory!!!'
    elModal.style.display = 'block'
}
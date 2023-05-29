'use strict'

// const GHOST = '👻'
const GHOST = ['<img src="img/ghost1.png">', '<img src="img/ghost2.png">', '<img src="img/ghost3.png">']
const WEAK_GHOST = ['<img src="img/weak_ghost1.jpg">', '<img src="img/weak_ghost2.jpg">', '<img src="img/weak_ghost3.jpg">']
var gGhosts
var gGhostImg = 0
var gIntervalGhosts

function createGhost(board) {
    var ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        img: GHOST[gGhostImg++]
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = ghost.img
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    // console.log('gGhosts:', gGhosts)
    gGhostImg = 0
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    if (!gGame.isOn) return
    // console.log('ghost.location:', ghost.location)
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation)
    // console.log(gBoard[nextLocation.i][nextLocation.j])
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (GHOST.includes(nextCell)) return
    if (WEAK_GHOST.includes(nextCell)) return
    // hitting a pacman? call gameOver
    if (nextCell === PACMAN && !WEAK_GHOST.includes(ghost.img)) {
        gameOver()
        return
    }

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = ghost.img

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function weakGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].img = WEAK_GHOST[i]
    }
    gPacman.isSuper = true
    setTimeout(function () { regGhost() }, 5000);
}

function regGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].img = GHOST[i]
    }
    gPacman.isSuper = false
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span>${ghost.img}</span>`
}
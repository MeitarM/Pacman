'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log('nextCell:', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (GHOST.includes(nextCell)) {
        gameOver()
        return
    }
    if (nextCell === FOOD) {
        updateScore(1)
    }
    // if (gPacman.isSuper) {
    //     console.log('check')
    //     if (test) {
    //         gBoard[gPacman.location.i][gPacman.location.j] = POWER_FOOD
    //         renderCell(gPacman.location, POWER_FOOD)
    //         gPacman.location = nextLocation
    //         gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    //         renderCell(gPacman.location, PACMAN)
    //         gameVictory(gBoard)
    //     }
    //     test = true
    //     return
    // }
    if (nextCell === POWER_FOOD && !gPacman.isSuper) {
        updateScore(1)
        weakGhost()
    }
    if (WEAK_GHOST.includes(nextCell)) {
        var ghostIdx = gGhosts.indexOf(nextCell)
        gGhosts.splice(ghostIdx, 1)
    }
    // moving from current location:
    // update the model

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)


    // update the DOM

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)

    gameVictory(gBoard)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}

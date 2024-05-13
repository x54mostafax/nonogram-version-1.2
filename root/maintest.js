// //documents
const screen = document.querySelector('.screen')
const PlayBtns = document.querySelectorAll('.option')
const Back = document.querySelector('.Back')
const containerOfHearts = document.querySelector('.hearts')
const inGame = document.querySelector('.inGame')
const Game = document.querySelector('.game')
const ContainerMessege = document.querySelector('.messege-container')
const messege = document.querySelector('.messege')
const titleMessege = document.querySelector('.title')
const txtMessege = document.querySelector('.text-message')
const returnBtn = document.querySelector('.return')
const SwitchBtn = document.querySelector('.switch-game')
const iconX = document.querySelector('.icon-x')
const iconSquare = document.querySelector('.icon-sq')
const iconHidden = document.querySelector('.icon-hidden')
const ExitBtn = document.querySelector('.Exit')
let numberOfClicks = 0
// data for my game
let IsSquare = true
let IsWin = false
let numberOfHearts = 3
let IsLose = false
let numberOfSquares = 5
// styles
// for loop
numberOfClicks = 0
const rows = numberOfSquares / 5
const numberOfBigSquares = rows ** 2
const WidthFont = 40
const arrayOfSquares = []
const numbersOfSulutionX = []
const numbersOfSulutionY = []
const boleans = [true, false]
let ArOfSquaresX = []
let ArOfSquaresY = []
containerOfHearts.innerHTML = ''
Game.innerHTML = ` <div class="x-axios"></div>
  <div class="y-axios"></div>
  <div class="game-area"></div>`
const gameArea = document.querySelector('.game-area')
const XAxios = document.querySelector('.x-axios')
const YAxios = document.querySelector('.y-axios')
XAxios.style.cssText = `grid-template-columns: repeat(${numberOfSquares}, 1fr);`
YAxios.style.cssText = `grid-template-rows: repeat(${numberOfSquares}, 1fr);`
gameArea.style.cssText += `grid-template-columns: repeat(${rows}, 1fr);grid-template-rows: repeat(${rows}, 1fr);`
//
for (let i = 0; i < numberOfHearts; i++) {
  const Heart = document.createElement('i')
  Heart.className = 'fa-solid fa-heart heart'
  containerOfHearts.appendChild(Heart)
}
const AllHearts = document.querySelectorAll('.heart')
for (let i = 0; i < numberOfSquares; i++) {
  const element = (arrayOfSquares[i] = [])
  for (let j = 0; j < numberOfSquares; j++) element.push(randint(boleans))
}

for (let i = 0; i < numberOfBigSquares; i++) {
  const BigSquare = document.createElement('div')
  BigSquare.classList.add('big-Square')
  for (let j = 0; j < 25; j++) {
    const indexY = Math.floor(j / 5) + Math.floor(i / 3) * 5 + 1
    const indexX = j % 5 + 1 + i * 5 % 15
    BigSquare.innerHTML += `<div class="Square x-${indexX}-y-${indexY}"></div>`
  }
  gameArea.appendChild(BigSquare)
}

// axios-X & axios-Y

for (let i = 0; i < numberOfSquares; i++) {
  let start = 0
  let x = 0
  let y = 0
  numbersOfSulutionX[i] = []
  numbersOfSulutionY[i] = []
  for (let j = 0; j < numberOfSquares; j++) {
    const elementX = +arrayOfSquares[i][j]
    const elementY = +arrayOfSquares[j][i]
    ArOfSquaresX[i]
      ? (ArOfSquaresX[i] += elementX)
      : (ArOfSquaresX[i] = elementX)
    ArOfSquaresY[i]
      ? (ArOfSquaresY[i] += elementY)
      : (ArOfSquaresY[i] = elementY)
    // ArOfSquaresX[i] = +ArOfSquaresX[i] + elementX;
    if (elementY) ++y
    else {
      start = j
      console.log(j, i, 'start')
      if (y) {
        numbersOfSulutionY[i].push(y)
        y = 0
      }
    }
    if (elementX) ++x
    else if (x) {
      numbersOfSulutionX[i].push(x)
      x = 0
    }
    if (j == numberOfSquares - 1 && elementX) numbersOfSulutionX[i].push(x)
    if (j == numberOfSquares - 1 && elementY) numbersOfSulutionY[i].push(y)
  }
}
const ConstArOfSquaresX = [...ArOfSquaresX]
const ConstArOfSquaresY = [...ArOfSquaresY]
// `${Math.trunc(WidthFont / numbersOfSulutionY[i].length)}px`;
// //axios-X
for (let i = 0; i < numberOfSquares; i++) {
  const NewDivX = document.createElement('div')
  const NewDivY = document.createElement('div')
  NewDivX.classList.add('x')
  NewDivY.classList.add('y')
  for (const n of numbersOfSulutionY[i]) {
    const span = document.createElement('span')
    span.textContent = `${n}`
    NewDivX.appendChild(span)
  }
  for (const n of numbersOfSulutionX[i]) NewDivY.innerHTML += `<div>${n}</div>`
  XAxios.appendChild(NewDivX)
  YAxios.appendChild(NewDivY)
}
// Squares
const Squares = document.querySelectorAll('.Square')
Squares.forEach((Square, i) => {
  Square.addEventListener('click', e => {
    if (IsLose || IsWin) return
    if (Square.dataset.clicked == 'true') return
    numberOfClicks++
    Square.dataset.clicked = true
    const indexX = i % 5 + Math.trunc(i / 25) % rows * 5
    const indexY = Math.floor(i / 5) % 5 + Math.floor(i / (rows * 25)) * 5
    const el = arrayOfSquares[indexY][indexX]
    if (!el == IsSquare) {
      --numberOfHearts
      const lastHeart = containerOfHearts.children[numberOfHearts]
      lastHeart.classList.add('lose-heart')
    }
    if (numberOfHearts <= 0) {
      IsLose = true
      ContainerMessege.style.display = 'block'
      titleMessege.innerHTML = `Game Over`
      txtMessege.innerHTML = `Do you want play again?`
    }
    if (el) {
      ArOfSquaresX[indexY] -= 1
      ArOfSquaresY[indexX] -= 1
      Square.classList.add('success')
      if (ArOfSquaresY[indexX] == 0) validY(indexX)
      if (ArOfSquaresX[indexY] == 0) validX(indexY)
    } else {
      Square.innerHTML = `<i class="fa-solid fa-x" style="color: #c20000;"></i>`
    }
    if (numberOfClicks == numberOfSquares ** 2) {
      IsWin = true
      ContainerMessege.style.display = 'block'
      titleMessege.innerHTML = `You Are Win`
      txtMessege.innerHTML = `Do you want play again?`
    }
  })
  Square.style.fontSize = `${50 / numberOfSquares}vw`
})

function CreateGame () {}
// functios
function randint (ar) {
  return ar[Math.floor(Math.random() * 100) % ar.length]
}

function refresh () {
  const Squares = document.querySelectorAll('.Square')
  const AllHearts = document.querySelectorAll('.heart')
  numberOfClicks = 0
  ArOfSquaresX = [...ConstArOfSquaresX]
  ArOfSquaresY = [...ConstArOfSquaresY]
  numberOfHearts = 3
  IsLose = false
  IsWin = false
  Squares.forEach((Square, i) => {
    Square.classList.remove('success')
    Square.innerHTML = ''
    Square.dataset.clicked = 'false'
  })
  AllHearts.forEach(Heart => {
    Heart.classList.remove('lose-heart')
  })
}
function validX (indexY) {
  if (ArOfSquaresX[indexY] == 0) {
    for (let i = 0; i < numberOfSquares; i++) {
      const rowelementX = document.querySelector(`.x-${i + 1}-y-${indexY + 1}`)
      if (rowelementX.dataset.clicked != 'true') {
        rowelementX.dataset.clicked = true
        numberOfClicks += 1
        if (arrayOfSquares[indexY][i]) {
          rowelementX.classList.add('success')
        } else {
          rowelementX.innerHTML = `<i class="fa-solid fa-x" style="color: #c20000;"></i>`
        }
      }
    }
  }
}

function validY (indexX) {
  if (ArOfSquaresY[indexX] == 0) {
    for (let i = 0; i < numberOfSquares; i++) {
      const columnelementY = document.querySelector(
        `.x-${indexX + 1}-y-${i + 1}`
      )
      if (columnelementY.dataset.clicked != 'true') {
        columnelementY.dataset.clicked = true
        numberOfClicks += 1
        if (arrayOfSquares[i][indexX]) {
          columnelementY.classList.add('success')
        } else {
          columnelementY.innerHTML = `<i class="fa-solid fa-x" style="color: #c20000;"></i>`
        }
      }
    }
  }
}
Back.addEventListener('click', e => {
  inGame.style.display = 'none'
  screen.style.display = 'block'
})
PlayBtns.forEach(PlayBtn => {
  PlayBtn.addEventListener('click', e => {
    numberOfSquares = +PlayBtn.dataset.mode
    console.log(+PlayBtn.dataset.mode)
    screen.style.display = 'none'
    inGame.style.display = 'block'
    CreateGame()
  })
})
iconX.addEventListener('click', e => {
  IsSquare = !IsSquare
  iconHidden.style.left = '0px'
  iconHidden.style.transform = `translate(${IsSquare * 100})`
  console.log(IsSquare)
})
iconSquare.addEventListener('click', e => {
  IsSquare = !IsSquare
  iconHidden.style.transform = `translate(${IsSquare * 100}%)`
})
returnBtn.addEventListener('click', e => {
  ContainerMessege.style.display = 'none'
  refresh()
})
SwitchBtn.addEventListener('click', e => {
  ContainerMessege.style.display = 'none'
  refresh()
  CreateGame()
})
ExitBtn.onclick = () => window.close()

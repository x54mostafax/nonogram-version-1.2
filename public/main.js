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
let ConstArOfSquaresX = []
let ConstArOfSquaresY = []
let stopWrong = false
// styles
// for loop
async function CreateGame () {
  // for loop
  numberOfClicks = 0
  const arrayOfSquares = []
  const rows = numberOfSquares / 5
  const numberOfBigSquares = rows ** 2
  const WidthFont = 40
  const numbersOfSulutionX = []
  const numbersOfSulutionY = []
  const boleans = [true, false]
  ArOfSquaresX = []
  ArOfSquaresY = []
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
      const indexY = Math.floor(j / 5) + Math.floor(i / rows) * 5 + 1
      const indexX = j % 5 + 1 + i % rows * 5
      BigSquare.innerHTML += `<div class="Square x-${indexX}-y-${indexY}" data-pos="(${indexX},${indexY})" data-input="${arrayOfSquares[
        indexX - 1
      ][indexY - 1]}">
      <span class="hid"></span>
      </div>`
    }
    gameArea.appendChild(BigSquare)
  }

  //   start = 0;
  // pok = 1;
  // for (let i = 0; i < example.length; i++) {
  //   const element = example[i];
  //
  // }
  // axios-X & axios-Y
  for (let i = 0; i < numberOfSquares; i++) {
    let x = 0
    let y = 0
    let start = 0
    let pok = 1
    let startY = 0
    let pokY = 1
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
      if (elementY) {
        ++y
        if (j == numberOfSquares - 1) {
          for (let index = startY; index <= j; index++) {
            if (!arrayOfSquares[index][i]) continue
            let currentEl = document.querySelector(
              `.x-${i + 1}-y-${index + 1}`
            )
            currentEl.dataset.indexY = `(${pokY},${y})`
          }
          startY = j
          pokY++
        }
      } else if (y) {
        for (let index = startY; index <= j; index++) {
          if (!arrayOfSquares[index][i]) continue
          let currentEl = document.querySelector(`.x-${i + 1}-y-${index + 1}`)
          currentEl.dataset.indexY = `(${pokY},${y})`
        }
        startY = j
        pokY++
        numbersOfSulutionY[i].push(y)
        y = 0
      }
      if (elementX) {
        ++x
        if (j == numberOfSquares - 1) {
          for (let o = start; o <= j; o++) {
            if (!arrayOfSquares[i][o]) continue
            let currentEl = document.querySelector(`.x-${o + 1}-y-${i + 1}`)

            currentEl.dataset.indexX = `${pok}`
          }
          start = j
          pok++
        }
      } else if (x) {
        for (let o = start; o <= j; o++) {
          if (!arrayOfSquares[i][o]) continue
          let currentEl = document.querySelector(`.x-${o + 1}-y-${i + 1}`)
          currentEl.dataset.indexX = `${pok}`
        }
        start = j
        pok++
        numbersOfSulutionX[i].push(x)
        x = 0
      }
      if (j == numberOfSquares - 1 && elementX) numbersOfSulutionX[i].push(x)
      if (j == numberOfSquares - 1 && elementY) numbersOfSulutionY[i].push(y)
    }
  }
  ConstArOfSquaresX = [...ArOfSquaresX]
  ConstArOfSquaresY = [...ArOfSquaresY]
  // `${Math.trunc(WidthFont / numbersOfSulutionY[i].length)}px`;
  // //axios-X
  for (let i = 0; i < numberOfSquares; i++) {
    const NewDivX = document.createElement('div')
    const NewDivY = document.createElement('div')
    NewDivX.classList.add('x')
    NewDivX.classList.add(`x-${i + 1}`)
    NewDivY.classList.add('y')
    NewDivY.classList.add(`y-${i + 1}`)
    for (let index = 0; index < numbersOfSulutionY[i].length; index++) {
      const n = numbersOfSulutionY[i][index]
      const span = document.createElement('span')
      span.textContent = `${n}`
      span.dataset.indexY = `${index + 1}`
      span.dataset.clickY = `${n}`
      if (numberOfSquares > 20) {
        span.style.fontSize = '6px'
      }
      NewDivX.appendChild(span)
    }
    // for (const n of numbersOfSulutionX[i])
    //   NewDivY.innerHTML += `<div>${n}</div>`;
    for (let index = 0; index < numbersOfSulutionX[i].length; index++) {
      const n = numbersOfSulutionX[i][index]
      const span = document.createElement('span')
      span.textContent = `${n}`
      span.dataset.indexX = `${index + 1}`
      span.dataset.clickX = `${n}`
      NewDivY.appendChild(span)
      if (numberOfSquares > 20) {
        span.style.fontSize = '7px'
      }
    }

    XAxios.appendChild(NewDivX)
    YAxios.appendChild(NewDivY)
  }
  // Squares
  const Squares = document.querySelectorAll('.Square')

  Squares.forEach((Square, i) => {
    Square.addEventListener('click', async e => {
      if (IsLose || IsWin || stopWrong) return
      if (Square.dataset.clicked == 'true') return
      numberOfClicks++
      Square.dataset.clicked = true
      const indexX = +Square.dataset.pos.match(/\d+/gi)[0] - 1
      const indexY = +Square.dataset.pos.match(/\d+/gi)[1] - 1
      const el = arrayOfSquares[indexY][indexX]
      // valid wrong
      if (!el == IsSquare) {
        --numberOfHearts
        stopWrong = true
        const lastHeart = containerOfHearts.children[numberOfHearts]
        lastHeart.classList.add('lose-heart')
      }
      // valid lose
      if (numberOfHearts <= 0) {
        stopWrong = true
        IsLose = true
        ContainerMessege.style.display = 'block'
        titleMessege.innerHTML = `Game Over`
        txtMessege.innerHTML = `Do you want play again?`
      }
      // valid type
      if (el) {
        ArOfSquaresX[indexY] -= 1
        ArOfSquaresY[indexX] -= 1
        Square.classList.add('success')
        if (ArOfSquaresY[indexX] == 0) validY(indexX)
        if (ArOfSquaresX[indexY] == 0) validX(indexY)
      } else {
        Square.innerHTML = `<i class="fa-solid fa-x" style="color: #c20000;"></i>`
      }
      // valid Win
      if (numberOfClicks == numberOfSquares ** 2) {
        IsWin = true
        stopWrong = true
        ContainerMessege.style.display = 'block'
        titleMessege.innerHTML = `You Are Win`
        txtMessege.innerHTML = `Do you want play again?`
      }
      // number
      if (Square.dataset.indexY) {
        let pi = Square.dataset.pos.match(/\d+/gi)[0]
        let indexr = Square.dataset.indexY.match(/\d+/gi)[0]
        let elementText = document.querySelector(
          `.x-${pi} span[data-Index-y="${indexr}"]`
        )
        elementText.dataset.clickY -= 1
        if (!+elementText.dataset.clickY) {
          elementText.classList.add('finished')
        }
      }
      if (Square.dataset.indexY) {
        let pi = Square.dataset.pos.match(/\d+/gi)[1]
        let indexr = Square.dataset.indexX
        let elementText = document.querySelector(
          `.y-${pi} span[data-index-x="${+indexr}"]`
        )
        let containerText = document.querySelector(
          `.y-${pi} span[data-index-x="${+indexr}"]`
        )

        elementText.dataset.clickX -= 1
        if (!+elementText.dataset.clickX) {
          elementText.classList.add('finished')
        }
      }
    })
    Square.style.fontSize = `${50 / numberOfSquares}vw`
  })
  function validX (indexY) {
    if (ArOfSquaresX[indexY] == 0) {
      const container = document.querySelector(`.y-axios .y-${indexY + 1}`)
      for (let i = 0; i < numberOfSquares; i++) {
        const rowelementX = document.querySelector(
          `.x-${i + 1}-y-${indexY + 1}`
        )
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
      const container = document.querySelector(`.x-axios .x-${indexX + 1}`)
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
      container.classList.add('finishing')
    }
  }
}
// functios
function randint (ar) {
  return ar[Math.floor(Math.random() * 100) % ar.length]
}

function refresh () {
  const Squares = document.querySelectorAll('.Square')
  const AllHearts = document.querySelectorAll('.heart')
  const AllX = document.querySelectorAll('.x span')
  const AllY = document.querySelectorAll('.y span')
  const AllcontainersX = document.querySelectorAll(`.x-axios .x`)
  const AllcontainersY = document.querySelectorAll(`.y-axios .y`)
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
  AllX.forEach(el => el.classList.remove('finished'))
  AllY.forEach(el => el.classList.remove('finished'))
  AllcontainersX.forEach(el => el.classList.remove('finishing'))
  AllcontainersY.forEach(el => el.classList.remove('finishing'))
  iconSquare.click()
  IsSquare = true
  iconHidden.style.transform = `translate(${IsSquare * 100}%)`
}
Back.addEventListener('click', e => {
  inGame.style.display = 'none'
  screen.style.display = 'block'
})
PlayBtns.forEach(PlayBtn => {
  PlayBtn.addEventListener('click', e => {
    numberOfSquares = +PlayBtn.dataset.mode

    screen.style.display = 'none'
    inGame.style.display = 'block'
    refresh()
    CreateGame()
  })
})
iconX.addEventListener('click', e => {
  IsSquare = !IsSquare
  iconHidden.style.left = '0px'
  iconHidden.style.transform = `translate(${IsSquare * 100}%)`
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
document.body.addEventListener('touchstart', e => {
  stopWrong = false
  if (!stopWrong) {
    Game.addEventListener('touchmove', e => {
      let el = e.touches[0]
      let element = document.elementFromPoint(el.clientX, el.clientY)
      if (element.classList.contains('Square')) {
        document.elementFromPoint(el.clientX, el.clientY).click()
      }
    })
  }
})

ExitBtn.onclick = () => window.close()

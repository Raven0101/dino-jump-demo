// import Dino from './dino.js'
// import Bricks from './bricks.js'
const dinoCanvas = document.querySelector('#dino')
const dinoApp = dinoCanvas.getContext('2d')
const backgroundColor = '#fff'
const dinoColor = '#da7f8f'
const brickColor = '#fff'
const brickBorderColor = '#000'
// dinoApp.fillStyle = backgroundColor
// dinoApp.fillRect(0, 0, dinoCanvas.width, dinoCanvas.height)
let dinoImg = document.createElement('img')
dinoImg.src = './assets/dino.png'
const dinoInfo = {
  height: 50,
  width: 50,
  dx: 0,
  dy: 0,
  ax: 0,
  ay: 0,
  x: dinoCanvas.width / 2,
  y: dinoCanvas.height,
}
const totalBricks = 10
const testBrick = { x: 0, y: 400 }
var bricks = []
var dino = new Dino([
  dinoInfo.height,
  dinoInfo.width,
  dinoInfo.dx,
  dinoInfo.dy,
  dinoInfo.ax,
  dinoInfo.ay,
  dinoInfo.x,
  dinoInfo.y,
  dinoCanvas.height,
  dinoCanvas.width,
])
var playing = false

function createBrick(n) {
  let rest = n
  if (rest) {
    bricks.push(new Bricks('random', dinoCanvas))
    rest -= 1
    createBrick(rest)
  }
}
function drawBricks() {
  // if (bricks.length < totalBricks) {
  //   let y = Math.floor((Math.random() * dinoCanvas.height) / 2)
  //   let x = Math.floor(Math.random() * dinoCanvas.width)
  //   bricks.push(new Bricks('default', dinoCanvas, [x, y]))
  // }
  dinoApp.strokeStyle = brickBorderColor
  dinoApp.fillStyle = brickColor
  bricks.forEach((b) => {
    dinoApp.fillRect(b.x, b.y, b.width, b.height)
    dinoApp.strokeRect(b.x, b.y, b.width, b.height)
  })
}
function moveAllThings(d) {
  // console.log('move', d)
  let i = []
  bricks.forEach((b, index) => {
    b.y += d
    if (b.y > dinoCanvas.height) {
      i.push(index)
    }
  })
  dino.y += d
  i.forEach((ind) => {
    let y = Math.floor(
      Math.random() * dinoCanvas.height - dinoCanvas.height / 2
    )
    let x = Math.floor(Math.random() * dinoCanvas.width)
    bricks.splice(ind, 1, new Bricks('default', dinoCanvas, [bricks[ind].x, y]))
  })
}
function heightAdjust() {
  if (dino.y < dinoCanvas.height / 2) {
    moveAllThings(dinoCanvas.height / 2 - dino.y)
  }
}
function platformDetect() {
  let i = undefined
  bricks.forEach((b, index) => {
    let lending =
      dino.x >= b.x - dino.width &&
      dino.x <= b.x + b.width &&
      dino.dy >= 0 &&
      dino.ay > 0 &&
      dino.y >= b.y &&
      dino.y <= b.y + b.height
    // console.log(lending)
    if (lending) {
      dino.y = b.y
      // dino.dy *= -1
      // dino.ay = 0;
      dino.jumping = 0
      // dino.onBrick = true;
      dino.jump()
      i = index
      // console.log('lend on', i)
    } else {
    }
  })
  if (i) {
    // bricks.splice(i, 1)
  }
  // moveAllBricks()
}
function offPlatformDetect() {
  bricks.forEach((b) => {
    let off = !(dino.x >= b.x - dino.width && dino.x <= b.x + b.width)
    if (off) {
      dino.fall()
    }
  })
}

function drawDino() {
  dinoApp.fillStyle = dinoColor
  // dinoApp.fillRect(dino.x, dino.y - dino.height, dino.width, dino.height)
  dinoApp.drawImage(
    dinoImg,
    dino.x,
    dino.y - dino.height,
    dino.width,
    dino.height
  )
}

function gameOver() {
  let hint = document.getElementById('hint')
  hint.innerText = 'You DIED! Press SPACE to resart.'
}
function beforeStart() {
  let hint = document.getElementById('hint')
  hint.innerText = 'Press SPACE to start'
  drawCanvas()
}
function start() {
  let hint = document.getElementById('hint')
  hint.innerText = ' '
}
function drawCanvas() {
  dinoApp.clearRect(0, 0, dinoCanvas.width, dinoCanvas.height)
  dinoApp.fillStyle = backgroundColor
  dinoApp.strokeStyle = '#000'
  dinoApp.fillRect(0, 0, dinoCanvas.width, dinoCanvas.height)
  dinoApp.strokeRect(0, 0, dinoCanvas.width, dinoCanvas.height)

  if (!dino.onBrick) {
    platformDetect()
  } else {
    offPlatformDetect()
  }
  // console.log(dino.onBrick)
  dino.moveDino()
  heightAdjust()
  drawBricks()
  drawDino()
  if (!dino.start) {
    gameOver()
  } else {
    requestAnimationFrame(drawCanvas)
  }
}

function keyDown(e) {
  switch (e.code) {
    case 'Space':
      if (!dino.start) {
        dino.start = true
        start()
        drawCanvas()
      }
      // console.log(dino.start)
      dino.jump()
      break
    case 'ArrowRight':
      dino.moveRight()
      break
    case 'ArrowLeft':
      dino.moveLeft()
      break
    case 'ShiftLeft':
      dino.dash()
      break
    case 'ShiftRight':
      dino.dash()
      break
  }
}
function keyUp(e) {
  // console.log('keyup', e.code)
  switch (e.code) {
    case 'ArrowRight':
      dino.stopXmove()
      break
    case 'ArrowLeft':
      dino.stopXmove()
      break
    default:
      break
  }
}
console.log(dino.foo())
createBrick(totalBricks)
// beforeStart()
// drawCanvas()
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

//   export default{}

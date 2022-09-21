class Dino {
  constructor(initValue) {
    ;[
      this.height,
      this.width,
      this.dx,
      this.dy,
      this.ax,
      this.ay,
      this.x,
      this.y,
      this.maxHeight,
      this.maxWidth,
    ] = initValue
    this.jumping = 0
    this.normalXspeed = 8
    this.maxXspeed = 10
    this.maxYspeed = 20
    this.globalAX = 1
    this.globalAY = 1
    this.onBrick = false
    this.start = false
  }
  foo() {
    console.log(this.maxXspeed)
  }
  jump() {
    if (this.jumping >= 2) {
      return
    } else {
      this.dy = -1 * this.maxYspeed
      this.ay = 1
      this.jumping += 1
      this.onBrick = false
      // this.start = true
    }
  }
  fall() {
    this.dy = 0
    this.ay = 1
    this.onBrick = false
  }
  moveRight() {
    this.dx = this.normalXspeed
  }
  moveLeft() {
    this.dx = -1 * this.normalXspeed
  }
  dash() {
    if (this.dx == 0) {
      console.log('not moving')
      return
    }
    let dir = this.dx > 0
    this.dx = dir ? this.maxXspeed : -1 * this.maxXspeed
    this.ax = dir ? -1 : 1
  }
  stopXmove() {
    // console.log('keyup')
    this.dx = 0
    this.ax = 0
  }
  calcDinoSpeed() {
    if (this.y < this.maxHeight) {
      this.dy += this.ay
      if (this.dy >= this.maxYspeed) {
        this.dy = this.maxYspeed
      }
    } else if (this.y >= this.maxHeight) {
      if (this.dy > 0) {
        this.y = this.maxHeight
        this.ay = 0
        this.dy = 0
        this.jumping = 0
        this.start = false
      }
    }
    if (this.ax) {
      if (this.ax < 0) {
        this.dx = Math.max(this.dx + this.ax, this.normalXspeed)
        //  this.dx =  this.dx +  this.ax
      } else if (this.ax > 0) {
        this.dx = Math.min(this.dx + this.ax, -1 * this.normalXspeed)
      }
      if (this.dx == this.normalXspeed || this.dx == -1 * this.normalXspeed) {
        this.ax = 0
      }
      // console.log(this.dx, this.ax)
    }
  }
  moveDino() {
    this.calcDinoSpeed()
    this.x += this.dx
    this.y += this.dy
    // if(this.y<0){
    //   this.y=0
    //   this.fall()
    // }
    if (this.x >= this.maxWidth) {
      this.x = 0
    } else if (this.x < 0) {
      this.x = this.maxWidth - this.x - 1
    }
    if (this.y > this.maxHeight && this.start) {
      this.start = false
    }
  }
}

// export default Dino

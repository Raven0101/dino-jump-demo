class Bricks {
  constructor(type, canvas, initValue = undefined) {
    this.type = type
    this.canvasProp = canvas
    this.height = 15
    this.width = 50
    this.x = 0
    this.y = 0
    this.setProperty(initValue)
  }
  setProperty(initValue) {
    // console.log(this)
    switch (this.type) {
      case 'random':
        this.width = Math.floor(Math.random() * 50) + 50
        do {
          this.x = Math.floor(Math.random() * this.canvasProp.width)
          this.y = Math.floor(Math.random() * this.canvasProp.height)
        } while (
          !(
            this.x < this.canvasProp.width - this.width &&
            this.y < this.canvasProp.height - this.height
          )
        )

        break
      case 'default':
        ;[this.x, this.y] = initValue
        break
      case 'selfDefine':
        ;[this.height, this.width, this.x, this.y] = initValue
        break
      default:
        throw TypeError('invalid brick type')
    }
  }
  foo() {
    console.log(this)
  }
}

// const canvas = { width: 800, height: 500 }
// const brickInfo = {
//   height: 10,
//   width: 50,
//   x: 0,
//   y: 0,
// }
// let b = new Bricks('', canvas)
// b.foo()

// export default Bricks

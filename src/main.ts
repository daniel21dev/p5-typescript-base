import P5 from 'p5'
import './style.css'
const sketch = (p5: P5) => {
	const W = window.innerWidth
	const H = window.innerHeight
	let img: P5.Image
	let balls: Ball[] = []
	let spin = 0
	let bColor = 0

	p5.preload = () => {
		img = p5.loadImage('https://i.ibb.co/JdFS99Y/112.gif')
		img.resize(100, 100)
	}

	p5.setup = () => {
		const canvas = p5.createCanvas(W, H, p5.WEBGL)
		p5.frameRate(120)
		p5.noStroke()
		p5.smooth()
		canvas.parent('app')
		for (let i = 0; i < 300; i++) {
			balls.push(new Ball(p5.random(1, 100), 1))
		}
	}

	p5.draw = () => {
		p5.background(0)
		p5.push()
		p5.rotateX(spin * p5.mouseX * 0.001)
		p5.rotateY(spin * p5.mouseX * 0.001)
		p5.rotateZ(spin * p5.mouseX * 0.001)
		p5.normalMaterial()
		p5.texture(img)
		p5.box(100, 100, 100)
		p5.pop()
		p5.translate(-W / 2, -H / 2)
		balls.forEach((ball) => {
			ball.update()
			ball.show()
		})

		spin += 0.05
		bColor = bColor >= 255 ? 0 : bColor + 1
	}

	class Ball {
		private size: number
		private speedX: number
		private speedY: number
		private x: number = p5.random(0, W)
		private y: number = p5.random(0, H)

		constructor(size: number, speed: number) {
			this.size = size
			this.speedX = speed * (Math.random() < 0.5 ? -1 : 1)
			this.speedY = speed * (Math.random() < 0.5 ? -1 : 1)
		}

		update() {
			if (this.y <= 0 || this.y >= H) this.speedY *= -1
			if (this.x <= 0 || this.x >= W) this.speedX *= -1
			this.x += this.speedX
			this.y += this.speedY
		}

		show() {
			p5.fill(p5.mouseX, p5.mouseY, 150, this.size)
			p5.ellipse(this.x, this.y, this.size)
		}
	}
}

new P5(sketch)

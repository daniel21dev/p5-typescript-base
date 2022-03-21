import P5 from 'p5'

const sketch = (p5: P5) => {
	p5.setup = () => {
		const canvas = p5.createCanvas(200, 200)
		canvas.parent('app')
	}

	p5.draw = () => {
		p5.background(0)
		p5.ellipse(p5.mouseX, p5.mouseY, 30)
	}
}

new P5(sketch)

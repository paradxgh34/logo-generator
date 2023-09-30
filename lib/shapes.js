// sets calss for shapes
class Shape {
    constructor() {
        // set color to empty string to start
        this.color = '';
    }
    // chose color of shape
    setColor(color) {
        this.color = color;
    }
}



// circle class: 1 for cirlce in inquirer prompt
class Circle extends Shape {
    render() {
        return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}">`;
    }
}

// square class: 2 for square in inquirer prompt
class Square extends Shape {
    render() {
        return `<rect x="50" height="200" width="200" fill="${this.color}">`;
    }
}

// triangle class: 3 for triangle in inquirer prompt
class Triangle extends Shape {
    render() {
        return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}">`;
    }
}

module.exports = { Circle, Square, Triangle };
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const minRadius = 5;
const maxRadius = 10;
const mass = 1;

const count = 1000;

const boxColors = ["#08F7FE", "#09FBD3", "FE53BB", "F5D300", "17DEEE", "#21B20C", "#002FA7", "#FFFF00", "#C5341F"];

var boxes;

const generateRandomFromRange = (min, max) => {

    return Math.floor(Math.random() * (max - min + 1) + min)
};

const generateRandomColor = (boxColors) => {

    return boxColors[Math.floor(Math.random() * boxColors.length)]
};

const calculateDistance = (x1, y1, x2, y2) => {
    const X = x2 - x1;
    const Y = y2 - y1;
    
    return Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2))
}

canvas.width = innerWidth - 30;
canvas.height = innerHeight - 30;

function Box(x, y, radius, color, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.velocity = {
        x: Math.random() - 0.5 * 5,
        y: Math.random() - 0.5 * 5
    };

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    };

    this.update = () => {
        this.draw();
        
        for(let i = 0; i < boxes.length; i++){
            if(this === boxes[i]) continue;
            if(calculateDistance(this.x, this.y, boxes[i].x, boxes[i].y) - (this.radius + boxes[i].radius) < 0){
                resolveCollision(this, boxes[i]);
            }
        }
    
        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            this.velocity.x = -this.velocity.x;
        }
    
        if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
            this.velocity.y = -this.velocity.y;
        }
    
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    
    }

}



const init = () => {
    boxes = [];

    for(let i = 0; i < count; i++){
        let radius = generateRandomFromRange(minRadius, maxRadius);
        let x = generateRandomFromRange(radius, canvas.width - radius);
        let y = generateRandomFromRange(radius, canvas.height - radius);
        let color = generateRandomColor(boxColors);

        if(i !== 0){
            for(let j = 0; j < boxes.length; j++){
                if(calculateDistance(x, y, boxes[j].x, boxes[j].y) - (radius + boxes[j].radius) < 0){
                    x = generateRandomFromRange(radius, canvas.width - radius);
                    y = generateRandomFromRange(radius, canvas.height - radius);
                    j =- 1;
                }
            }
        }
        boxes.push(new Box(x, y, radius, color, mass));
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    boxes.forEach(box => {
        box.update();
    });
    
}

init();
animate();
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
// Sprite class for sprite properties
const gravity = 0.2 
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150   
    } 
    
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    
    update() {
        this.draw()// Trigger the drawing process
        
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y // Update the position 

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity //Stopping gravity at bootom of Screen
    }
}
// Create instances of Sprite
const player = new Sprite({
    position : {
    x: 50,
    y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }
})
 


const player2 = new Sprite({
    position : {
    x: 924,
    y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }
})
 


console.log(player);

// Animation loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player2.update()
}

animate()

window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                player.velocity.x += 1 // Increase horizontal velocity
                break;
            case 'a':
                player.velocity.x += -1 // Increase horizontal velocity
                break; 
            case 'w':
                player.velocity.y += -10 // Increase horizontal velocity
                break;    
            case 's':
                player.velocity.y += 10 // Increase horizontal velocity
                break;
            case '6':
                player2.velocity.x += 1 // Increase horizontal velocity
                break;
            case '4':
                player2.velocity.x += -1 // Increase horizontal velocity
                 break; 
            case '8':
                player2.velocity.y += -10 // Increase horizontal velocity
                break;    
            case '5':
                player2.velocity.y += 10 // Increase horizontal velocity
                break;                                                                                    
        }          
window.addEventListener('keyup', (event) => {
        switch (event.key) {
         case 'd':
                player.velocity.x = 0 // Increase horizontal velocity
                break;
        case 'a':
                player.velocity.x = 0 // Increase horizontal velocity
                break; 
        case 'w':
                player.velocity.y = 0 // Increase horizontal velocity
                break;    
        case 's':
                player.velocity.y = 0 // Increase horizontal velocity
                break;
        case '6':
                player2.velocity.x = 0 // Increase horizontal velocity
                break;
        case '4':
                player2.velocity.x = 0 // Increase horizontal velocity
                break; 
        case '8':
                player2.velocity.y = 0 // Increase horizontal velocity
                break;    
        case '5':
                player2.velocity.y = 0 // Increase horizontal velocity
                break;                        
        }
            })
            console.log(event.key);
    })

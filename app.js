const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
// Sprite class for sprite properties
const gravity = 0.6 
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey  
        this.hitBox = {
            position: this.position ,
            width: 100, 
            height: 50
        }
    } 
    
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        //hit box
        c.fillStyle = 'pink'
        c. fillRect(
            this.hitBox.position.x, 
            this.hitBox.position.y, 
            this.hitBox.width, 
            this.hitBox.height
            )
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
 
console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
    }

// Animation loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player2.update()

    player.velocity.x = 0
    player2.velocity.x = 0
//Movment
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd'){
      player.velocity.x = 5  
    }

    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft'){
        player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight'){
      player2.velocity.x = 5  
    }
}

animate()
//Movement Controls
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -18
            break
        case 's':
            player.velocity.y = 20
            break
    }
    //Player 2 Controls    
    switch (event.key) {   
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            player2.velocity.y = -18
            break
        case 'ArrowDown':
            player2.velocity.y = 20
            break                                                          
    }
    console.log(event.key)  
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
           keys.a.pressed = false
            break  
    }
            //Player 2 Controls
    
    switch (event.key) {    
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
           keys.ArrowLeft.pressed = false
            break                                           
    }
    console.log(event.key)
})

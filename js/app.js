const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');


canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
// Sprite class for sprite properties
const gravity = 0.6 

// Create instances of Sprite
const player = new Fighter({
    position : {
    x: 50,
    y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    }, 
    offset: {
        x: 0,
        y: 0
    }
})
 const player2 = new Fighter({
    position : {
    x: 924,
    y: 0
    }, 
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset : {
        x: -50,
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
const background = new Sprite({
    position: {
        x: 0, 
        y: 0,
    },
    imageSrc: './img/Background2.png'
})
function rectangularCollision({rectangle1,rectangle2}) {
    return (
        rectangle1.hitBox.position.x + rectangle1.hitBox.width >= rectangle2.position.x && 
        rectangle1.hitBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.hitBox.position.y + rectangle1.hitBox.height >= rectangle2.position.y &&
        rectangle1.hitBox.position.y <= rectangle2.position.y + rectangle2.height
    )    
}
//Timer/match result
function determineMatch({player, player2, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    } else if (player.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
    } else if (player.health < player2.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    }
}
//Change Match Time
let timer = 60
let timerId
function decreaseTimer(){
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
    document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
       determineMatch({player, player2, timerId})  
    }
}

decreaseTimer()
// Animation loop
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'orange'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
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
// Collision detection
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: player2
        })&&
        player.isAttacking
    ){
        player.isAttacking = false
        player2.health -= 4
        document.querySelector('#player2Health').style.width = player2.health + '%'
    }
    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player
        })&&
        player2.isAttacking
    ){
        player2.isAttacking = false
        player.health -= 4
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }
//match by health
    if (player2.health <= 0 || player.health <= 0) {
        determineMatch({ player, player2,timerId })
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
        case ' ':
            player.attack()
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
        case '0':
            player2.isAttacking = true
            break                                                             
    }  
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
        case '0':
            player2.isAttacking = false
            break                                                            
    }

})

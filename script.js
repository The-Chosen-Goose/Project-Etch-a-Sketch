let board = document.querySelector('#board')
let range = document.querySelector('#range')
let range_value = document.querySelector('#range_value')
let black_button = document.querySelector('#black_button')
let rainbow_button = document.querySelector('#rainbow_button')
let erase_button = document.querySelector('#erase_button')
let clear_button = document.querySelector('#clear_button')
let grid_button = document.querySelector('#grid_button')
let default_span = document.querySelector('#default_span')
let rainbow_span = document.querySelector('#rainbow_span')
let erase_span = document.querySelector('#erase_span')
let grid = true
let black_check = false
let rainbow_check = false
let erase_check = false

draw()

function grid_draw(grid_number){
    let grid_size = 1/(grid_number)*700
    for(let i = 0 ; i < grid_number*grid_number ; i++){
        let div = document.createElement('div')
        div.style.cssText = `height: ${grid_size}px; width : ${grid_size}px;border:1px solid black`
        range_value.innerHTML = `${grid_number} x ${grid_number}`
        board.appendChild(div)
    }
}

function grid_clear(){
    while(board.firstChild){
        board.removeChild(board.firstChild)
    }
}

function random_color(){
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    
    let rgb = `rgba(${r},${g},${b})`
    return rgb
}

function options(button){
    board.childNodes.forEach(element => {
        element.addEventListener('mouseenter', function(){
            if(button =='black' && black_check == true){
                element.style.backgroundColor = 'black'
            }
            else if(button == 'rainbow' && rainbow_check == true){
                element.style.backgroundColor = random_color()
            }
            else if(button == 'white'&& erase_check == true){
                element.style.backgroundColor = 'white'
            }
        })
        if(button == 'clear'){
            element.style.backgroundColor = 'white'
        }
    })

    if(button == 'grid'){
        if(grid == false){
            board.childNodes.forEach(element => {
                element.style.border = '1px solid black'
            })
            grid = true
        }
        else {
            board.childNodes.forEach(element => {
                element.style.border = ''
            })
            grid = false
        }
    }
    
}

function enable_button(span,button){
        span.classList.remove('inactive')
        span.classList.add('active')
    setTimeout(() => {
        button.style.backgroundColor = '#FF6907'
        button.style.transition = '.4s'
    }, 350);
}

function disable_button(span,button){
        span.classList.add('inactive')
        setTimeout(() => {
            button.style.backgroundColor = 'black'
            button.style.transition = '.4s'
        }, 350);
}

function check(bool,span,button){
    if(bool == false){  
        enable_button(span,button)
        bool = true
        return bool
    }
    else {
        disable_button(span,button)
        bool = false
        return bool
    }
}

function settings(){

    black_button.addEventListener('click', function(){
        options('black')
        black_check = check(black_check,default_span,black_button)
        rainbow_check = check(true,rainbow_span,rainbow_button)
        erase_check = check(true,erase_span,erase_button)
    })
     
    rainbow_button.addEventListener('click', function(){
        options('rainbow')
        black_check = check(true,default_span,black_button)
        rainbow_check = check(rainbow_check,rainbow_span,rainbow_button)
        erase_check = check(true,erase_span,erase_button)
    })
     
    erase_button.addEventListener('click', function(){
        options('white')
        black_check = check(true,default_span,black_button)
        rainbow_check = check(true,rainbow_span,rainbow_button)
        erase_check = check(erase_check,erase_span,erase_button)
    })

    clear_button.addEventListener('click', function(){
        options('clear')
    })
    
    grid_button.addEventListener('click', function() {
        options('grid')
    })
}

settings()

function draw(){
    grid_clear()
    grid_size()
    grid_draw(range.value)
}

function grid_size(){
    range.addEventListener('input', draw)
    black_check = check(true,default_span,black_button)
    rainbow_check = check(true,rainbow_span,rainbow_button)
    erase_check = check(true,erase_span,erase_button) 
    grid = true
}
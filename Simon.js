
let h1 = document.querySelector('h1');
let h2 = document.querySelector('h2');
let btn_container = document.querySelectorAll('.btn-container');
let level = 0;
let gameActive = true;
let systemarray = [];
let userarray = [];
let res;
let gameOver = () => {
    h2.innerText = `Game Over! You score : ${level-1}`;
    btn_container.forEach(b => {
        b.removeEventListener('click', matching);
        b.removeEventListener('click', gameStart);
    })
    h1.innerText = "";
    systemarray = [];
    userarray = [];
    level = 0;
    gameActive = false;

    let start = document.createElement('button');
    start.innerText = 'Restart Game';
    start.setAttribute('class','restart')
    document.querySelector('body').prepend(start);

    start.addEventListener('click',()=>{
        location.reload();
    })

}
function matchSequence() {
    btn_container.forEach(b => {
        b.addEventListener('click', matching)
    })
}
function matching(event) {
    if (userarray.length >= systemarray.length) {
        return;
    }

    let item = event.target.dataset.index
    event.target.style.backgroundColor = 'white';

    setTimeout(() => {
        colorchange(item, event.target);
    }, 500);

    userarray.push(item);
    console.log('userarray', userarray)

    if (!checksequence()) {
        gameOver();
        return;
    }

    if (userarray.length === systemarray.length) {
        // Disable buttons temporarily
        btn_container.forEach(b => b.removeEventListener('click', matching));

        // Proceed to result check and next level
        checkResult();
    }
}

function checksequence() {
    for (let i = 0; i < userarray.length; i++) {
        if (userarray[i] != systemarray[i]) {
            return false;
        }
    }
    return true
}
function checkResult() {
    // Check if sequences match
    if (checksequence()) {
        console.log("moving to next level");
        gameActive = true;
        levelUp();
        setTimeout(() => {
            sequenceGeneration();
        }, 1500);
    } else {
        gameOver();
    }
    userarray = []; // Reset user input for next round
}
let sequenceGeneration = () => {
    let random = Math.floor(Math.random() * 4);
    systemarray.push(random);
    console.log('Sequence func systemarray = ', systemarray)
    let btns = document.querySelectorAll('.btn')
    let selectbtn = btns[random];
    let index = selectbtn.dataset.index;
    selectbtn.style.backgroundColor = 'white';
    setTimeout(() => {
        colorchange(index, selectbtn);
    }, 1000);
    setTimeout(() => {
        matchSequence();
    }, 1200);
}

function initiate() {
    btn_container.forEach(b => {
        console.log("CLICK FOR NEXR LEVEL")
        b.addEventListener('click', gameStart)
    })

}


function gameStart(event) {
    event.target.style.backgroundColor = 'white'
    levelUp();
    let index = event.target.dataset.index;
    setTimeout(() => {
        colorchange(index, event.target);
    }, 350);
    setTimeout(() => {
        sequenceGeneration();
    }, 1000);
    btn_container.forEach(b => {
        b.removeEventListener('click', gameStart)
    })
}

function levelUp() {
    if (gameActive) {
        level++;
        h2.innerText = `Level ${level} \n Score: ${level-1}`;
        gameActive = false;
    }
}

let colorchange = (index, event) => {
    if (index == 0) {
        event.style.backgroundColor = '#d95980'
    }
    else if (index == 1) {
        event.style.backgroundColor = '#f99b45'
    }
    else if (index == 2) {
        event.style.backgroundColor = '#63aac0'
    }
    else if (index == 3) {
        event.style.backgroundColor = '#819ff9'
    }
}



initiate();

const body = document.body;
const frameRight = document.querySelector('.frame-right');
const frameLeft = document.querySelector('.frame-left');
const frameTop = document.querySelector('.frame-top');
const frameBottom = document.querySelector('.frame-bottom');
const audio = document.querySelector('audio')
const message = document.querySelector('.message')
const audioBtn = document.querySelector('.audioBtn')
const pause = document.querySelector('.pause')
const play = document.querySelector('.play')
const next = document.querySelector('.next')
const containerFinal = document.querySelector('.container-3')
let audioClick = 0;
let nextClick = 0;



const containers = document.querySelectorAll('.container')
containers.forEach(container => {
    container.style.opacity = 0;

})
containers[0].style.opacity = 1;
const loadingTime = 9000
timeDisappear(containers[0].children[0], 'on', loadingTime)

next.addEventListener('click', () => {
    nextClick++
    // containers[nextClick - 1].style.opacity = 0;
    containers[nextClick].style.opacity = 1;
    document.querySelector('#tsparticles').classList.add('confetti-animation')
    containers[nextClick - 1].children[0].style.transform = 'translateZ(1px)'
    containers[nextClick - 1].classList.add('container-animation');
    if (nextClick === 3) {
        next.style.opacity = 0;
        timeDisappear(next)
        timeDisappear(containers[nextClick], 'on')
    } else {
        containers[nextClick].children[0].classList.remove('display-none')
    }
})

for (let i = 0; i < 170; i++) {
    div = document.createElement('div');
    div.classList.add('snowflake');
    div.classList.add('display-none');
    containerFinal.append(div)
}

function timeDisappear(element, state = 'off', timeOut = 100) {
    if (state === 'on') {
        element.style.opacity = 1;
        setTimeout(() => {
            element.classList.remove('display-none')
        }, timeOut)
    }
    else {
        element.style.opacity = 1;
        setTimeout(() => {
            containers[0].style.opacity = 0;
            element.classList.add('display-none')
        }, timeOut)
    }
}

audioBtn.addEventListener('click', () => {

    if (audioClick % 2 === 0) {
        document.querySelectorAll('.snowflake').forEach((item) => {
            item.classList.remove('display-none');

            setInterval(() => {
                item.style.opacity = 1;
            }, 500)
        })
        message.classList.remove('display-none')
        audioBtn.classList.add('audioAnimation')
        pause.style.opacity = 1;
        play.style.opacity = 0;
        if (audioClick === 0) {
            containerFinal.style.opacity = 1;
            let volume = .2;
            audio.volume = volume
            setInterval(() => {
                if (volume < 1) {
                    audio.volume = volume
                    volume = volume + 0.02;
                }
            }, 200)
        }
        audio.play();
        audioClick++
    }
    else {
        pause.style.opacity = 0;
        play.style.opacity = 1;
        audio.pause()
        audioClick++
    }

})


containers.forEach(container => {

    const frameRight = document.createElement('section');
    frameRight.classList.add('frame-right')
    const frameLeft = document.createElement('section');
    frameLeft.classList.add('frame-left')
    const frameTop = document.createElement('section');
    frameTop.classList.add('frame-top')
    const frameBottom = document.createElement('section');
    frameBottom.classList.add('frame-bottom')
    const frame = document.createElement('div');
    frame.classList.add('frame')
    for (let i = 0; i < 500; i++) {
        let div = document.createElement('div')
        let divT = document.createElement('div')
        let divB = document.createElement('div')
        let divL = document.createElement('div')
        frameRight.append(div)
        frameLeft.append(divL)
        frameTop.append(divT)
        frameBottom.append(divB)
    }
    frame.append(frameRight)
    frame.append(frameLeft)
    frame.append(frameTop)
    frame.append(frameBottom)
    container.append(frame)
})







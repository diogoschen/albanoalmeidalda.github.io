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
const containerFinal = document.querySelector('.container-4')
let audioClick = 0;
let nextClick = 0;

const yes = document.querySelector('.yes')
const no = document.querySelector('.no')



yes.addEventListener('click', () => {
    nextClick++
    console.log(nextClick)
    timeDisappear(next, 'on', 1000)
    containers[nextClick].style.opacity = 1;
    containers[nextClick].children[0].classList.remove('display-none')
    document.querySelector('#tsparticles').classList.add('confetti-animation')
    containers[nextClick - 1].children[0].style.transform = 'translateZ(1px)'

    containers[nextClick - 1].classList.remove('container-animation-back');
    containers[nextClick - 1].classList.add('container-animation');
})



const containers = document.querySelectorAll('.container')

const loadingTime = 9000
setTimeout(() => {
    containers[0].children[0].classList.remove('display-none')
    containers[0].children[0].style.opacity = 1;
}, loadingTime)



next.addEventListener('click', () => {
    containers[nextClick + 1].style.opacity = 1;
    containers[nextClick].children[0].style.transform = 'translateZ(1px)'
    console.log(nextClick)
    if (nextClick === 0) {
        timeDisappear(next, 'off', 1000)
    }
    if (nextClick === 2) {

        containers[nextClick + 1].classList.remove('display-none')
        containers[nextClick].classList.add('container-animation')
        timeDisappear(next, 'off', 0)
    }
    else {
        containers[nextClick + 1].classList.remove('display-none')
        containers[nextClick + 1].children[0].classList.remove('display-none')

        containers[nextClick].style.transform = 'rotateY(-100deg)'

    }
    nextClick++
})

no.addEventListener('click', () => {
    console.log(nextClick)
    containers[nextClick - 1].style.transform = 'rotateY(0deg)'
    timeDisappear(containers[nextClick], 'off', 1000)
    timeDisappear(next, 'on', 1000)
    nextClick = nextClick - 1
})

for (let i = 0; i < 170; i++) {
    div = document.createElement('div');
    div.classList.add('snowflake');
    div.classList.add('display-none');
    containerFinal.append(div)
}

function timeDisappear(element, state = 'off', timeOut = 100) {
    if (state === 'on') {
        element.classList.remove('display-none')
        setTimeout(() => {
            element.style.opacity = 1;
        }, timeOut)
    }
    else {
        element.style.opacity = 0;
        setTimeout(() => {
            // containers[0].style.opacity = 0;
            element.classList.add('display-none')
            console.log('done')
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







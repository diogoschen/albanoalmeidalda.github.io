const body = document.body;
let div = [];
for (let i = 0; i < 50; i++) {
    let div = document.createElement('div');
    div.classList.add('snowflake');
    body.append(div)
}
const audio = document.querySelector('audio')
const message = document.querySelector('.message')
const audioBtn = document.querySelector('.audioBtn')

audioBtn.addEventListener('click', () => {
    audioBtn.classList.add('display-none')
    message.classList.remove('display-none')
    let volume = .2;
    audio.volume = volume
    audio.play();
    setInterval(() => {
        if (volume <= 1) {
            volume = volume + 0.01;
            audio.volume = volume
            console.log(volume)
        }
    }, 200)

})


// document.querySelector('audio').addEventListener('clicked', (e) => { console.log(e) })

// div.forEach(item => { body.append(item); })
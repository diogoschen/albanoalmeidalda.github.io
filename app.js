const innerBox = document.querySelectorAll('.innerBox');
const boxFront = document.querySelectorAll('.boxFront');
const bottom = document.querySelector('.innerBottom');
const boxBack = document.querySelectorAll('.boxBackInner');
const button = document.querySelector('button');
const form = document.querySelectorAll('form');
const ranget = document.querySelectorAll('input')[0];

const rangeh = document.querySelectorAll('input')[1];
const bubblet = document.querySelectorAll('.bubble')[0];
const bubbleh = document.querySelectorAll('.bubble')[1];
const bubbleTextt = document.querySelectorAll('.bubbleText')[0];
const bubbleTexth = document.querySelectorAll('.bubbleText')[1];

setBubble(ranget, bubblet, '&#186;C', bubbleTextt);
setBubble(rangeh, bubbleh, '%', bubbleTexth);

ranget.addEventListener('input', () => {
    setBubble(ranget, bubblet, '&#186;C', bubbleTextt);
});
rangeh.addEventListener('input', () => {
    setBubble(rangeh, bubbleh, '%', bubbleTexth);
});

function setBubble(range, bubble, term, bubbleText) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubbleText.innerHTML = `${val} ${term}`;
    bubble.style.left = `${newVal}%`;
}

let click = 0;

innerBox.forEach((val, i) => {
    boxFront[i].addEventListener('click', (e) => {
        innerBox[i].style.transform = 'rotateY(180deg)';
        bottom.style.transform = 'rotateY(180deg)';
        click++;
    });

    boxBack[i].addEventListener('click', (e) => {
        innerBox[i].style.transform = 'rotateY(0deg)';
        bottom.style.transform = 'rotateY(0deg)';
        click++;
    });
});

button.addEventListener('click', (e) => {
    form[2][0].value = form[0].elements[0].value;
    form[2][1].value = form[1].elements[0].value;
    form[2].submit();
});

if (window.location.href.split('s')[1]) {
    window.location = '/';
};

button.innerHTML = "👆 Submit";
button.style.fontWeight = "bold"

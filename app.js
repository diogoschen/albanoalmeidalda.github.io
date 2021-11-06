const innerBox = document.querySelectorAll('.innerBox');
const boxFront = document.querySelectorAll('.boxFront');
const bottom = document.querySelector('.innerBottom');
const boxBack = document.querySelectorAll('.boxBackInner');
const button = document.querySelector('button');
const form = document.querySelectorAll('form');

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

// button.addEventListener('click', (e) => {
//     form[2][0].value = form[0].elements[0].value;
//     form[2][1].value = form[1].elements[0].value;
//     form[2].submit();
// });

// if (window.location.href.split('s')[1][0] === 'u') {
//     window.location = '/';
// };

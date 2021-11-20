// Iniciação de variáveis

const header = document.querySelector('header')
const bodyChange = document.querySelector('.bodyChange')
const nameForm = document.querySelector('#nameForm')
const focusForm = document.querySelector('#focusForm')
const nameWindow = document.querySelector('.nameWindow')
const mainWindow = document.querySelector('.mainWindow')
const userName = document.querySelector('#userName')
const clock = document.querySelector('.clock')
const focus = document.querySelector('.focus')
const mainFocus = document.querySelector('.mainFocus')
const task = document.querySelector('.task')
const taskName = document.querySelector('#taskName')
const quoteText = document.querySelector('.quoteText')
const quoteAuthor = document.querySelector('.quoteAuthor')
const checkBtn = document.querySelector('.inputContainer')
const removeBtn = document.querySelector('.removeBtn')
const timeDay = document.querySelector('#timeDay')
const weatherBox = document.querySelector('.weather')
const locWeather = document.querySelector('#locWeather')
const weatherTemp = document.querySelector('.weatherTemp')
const weatherLocText = document.querySelector('.weatherLoc')
const imgWeather = document.querySelector('.weatherImg')
const linkBtn = document.querySelector('.linkList button')
const linkUl = document.querySelector('.linkList ul')
const inputTask = document.querySelector('.todo input')
const todoBtn = document.querySelector('.todo button')
const formTask = document.querySelector('.todo form')
const checkTask = document.querySelector('.todo .secundTasks')
const todoBox = document.querySelector('.weather')
const todoUl = document.querySelector('.todo ul')
const todoLi = document.querySelector('.todo li')
const dayText = ['Good night', 'Good morning', 'Good afternoon', 'Good evening']
const settings = document.querySelector('.settings')
const settingsBox = document.querySelector('.settingsBox')
const settingsBtn = document.querySelector('.settings button')
const clearStorage = document.querySelector('#clear')
const changeBg = document.querySelector('#changeBg')
const quote = document.querySelector('.quote')
let listOfTasks = [];
let clickTask = localStorage.isFocusChecked === 'true' ? 1 : 0;
let clickBg = localStorage.bgChosen ? parseInt(localStorage.bgChosen) : 1
document.body.style.backgroundImage = `url('img/${clickBg}.jpg')`

// API para o estado do tempo

function getWeather(loc = 'Lisboa') {
    const apikey = 'c3e2e26d276d81e70a8b3409c17c563d'
    const city = loc
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            imgWeather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weatherTemp.innerHTML = Math.round(data.main.temp, 0) + '&#176'
            weatherLocText.innerHTML = loc
        })
        .catch(e => {
            console.log(e)
        })
}

// API por novas quotes

function getQuote(quote, author) {
    fetch('https://type.fit/api/quotes')
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            const randomNumber = Math.round(Math.random() * data.length, 0)
            quote.innerHTML = `&ldquo;${data[randomNumber].text}&rdquo;`;
            if (data[randomNumber].author) {
                author.innerHTML = `${data[randomNumber].author}`
            };
        })
        .catch((e) => {
            console.log(e)
        })
}

// Apresenta a hora e o altura do dia

setInterval(setTime, 1000)

//Inicio do página
init()

function setTime() {
    let time = new Date()
    let hours = parseInt(time.getHours())
    let minutes = ('0' + time.getMinutes()).slice(-2)
    timeFormatted = `${hours}:${minutes}`;
    clock.innerHTML = timeFormatted;
    if ((hours >= 22 && hours <= 24) || hours < 6) { timeDay.innerHTML = dayText[0] }
    if (hours >= 6 && hours < 12) { timeDay.innerHTML = dayText[1] }
    if (hours >= 12 && hours < 18) { timeDay.innerHTML = dayText[2] }
    if (hours >= 18 && hours < 22) { timeDay.innerHTML = dayText[3] }
}

// Efeito de transição entre vários elementos
function transitionElement(element, state, display = '') {
    element.style.opacity = state;
    if (state === 1) {
        element.style.zIndex = 1;
        element.style.visibility = 'visible'
    } else {
        element.style.zIndex = -1;
        element.style.visibility = 'hidden'
        if (display) { setTimeout(() => { element.remove() }, 1000) }
    }
}

function init() {
    getQuote(quoteText, quoteAuthor)
    getWeather(localStorage.localWeather)
    if (localStorage.name) {
        transitionElement(nameWindow, 0, 'none')
        transitionElement(mainWindow, 1)
        transitionElement(header, 0)
        userName.innerHTML = localStorage.name;
        if (localStorage.focus) {
            transitionElement(focusForm, 0)
            transitionElement(mainFocus, 1)
            task.innerHTML = localStorage.focus;
            if (localStorage.isFocusChecked === 'true') {
                task.style.textDecoration = "line-through"
                checkBtn.classList.add('taskComplete')
                taskName.checked = true;
            }
        } else {
            transitionElement(focusForm, 1)
            transitionElement(mainFocus, 0)
        }

        getTasks()
        setTime()
    } else {
        transitionElement(nameWindow, 1, 'none')
        transitionElement(header, 1)
        transitionElement(mainWindow, 0)
        localStorage.setItem('secundaryTasks', '')
        localStorage.setItem('bgChosen', 1)
    }
}

//Preenchimento do nome
nameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.setItem('name', e.target[0].value)
    userName.innerHTML = localStorage.name;
    transitionElement(nameWindow, 0, 'none')
    transitionElement(header, 0)
    transitionElement(mainWindow, 1)
    transitionElement(focusForm, 1)
    transitionElement(nameWindow, 0, 'none')
})

//Preenchimento da tarefa focus
focusForm.addEventListener('submit', (e) => {
    e.preventDefault()
    navigator.userAgent.indexOf('Mobile') > 0 ? transitionElement(quote, 1) : ""
    localStorage.setItem('focus', e.target[0].value)
    e.target[0].value = '';
    transitionElement(focusForm, 0)
    transitionElement(mainFocus, 1)
    task.innerHTML = localStorage.focus;
})

// Focus completo / incompleto
taskName.addEventListener('change', (e) => {
    if (clickTask % 2 === 0) {
        task.style.textDecoration = "line-through"
        checkBtn.classList.add('taskComplete')
        localStorage.setItem('isFocusChecked', true)
        clickTask++
    }
    else {
        task.style.textDecoration = "none"
        checkBtn.classList.remove('taskComplete')
        localStorage.setItem('isFocusChecked', false)
        clickTask++
    }
})

// remove a tarefa focus
removeBtn.addEventListener('click', (e) => {
    clickTask = 0;
    localStorage.setItem('isFocusChecked', false)
    taskName.checked = false;
    removeBtn.classList.add('taskComplete')
    task.style.textDecoration = "none"
    localStorage.removeItem('focus')
    transitionElement(focusForm, 1)
    transitionElement(mainFocus, 0)
})

// lista de tarefas
document.addEventListener('click', e => {

    if (e.target === linkBtn || e.target === linkUl || e.target.parentElement === linkUl) {
        linkUl.style.top = '40px';
        transitionElement(linkUl, 1)
    }
    else {
        transitionElement(linkUl, 0)
        linkUl.style.top = '-40px'
    }
    if (e.target === inputTask) {
        inputTask.value = ''
    }
    else {
        inputTask.value = 'Add a new task'
    }
    if (e.target.className.indexOf('todo') > -1) {
        todoUl.style.bottom = '50px'
        transitionElement(todoUl, 1)
    }
    else {
        todoUl.style.bottom = '-100vh'
        transitionElement(todoUl, 0)
    }
    if (e.target.className.indexOf('settings') > -1) {
        settingsBox.style.bottom = '50px'
        transitionElement(settingsBox, 1)
    }
    else {
        settingsBox.style.bottom = '-100vh'
        transitionElement(settingsBox, 0)
    }
    if (e.target.id.indexOf('focus') > -1) {
        navigator.userAgent.indexOf('Mobile') > 0 ? transitionElement(quote, 0) : ""
    }
    else {
        navigator.userAgent.indexOf('Mobile') > 0 ? transitionElement(quote, 1) : ""
    }
})

function taskCreation() {
    const li = document.createElement('li')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const spanCheck = document.createElement('span')
    const spanText = document.createElement('span')
    const btn = document.createElement('button')
    li.classList.add('secundTasks')
    li.classList.add('todo')
    label.classList.add('inputSecundary')
    label.classList.add('todo')
    input.setAttribute('id', 'taskName')
    input.setAttribute('type', 'checkbox')
    input.classList.add('todo')
    spanCheck.classList.add('checkmark')
    spanCheck.classList.add('todo')
    spanText.classList.add('todo')
    btn.classList.add('todo')
    btn.classList.add('removeBtn')
    btn.innerHTML = '&times;'
    label.append(input)
    label.append(spanCheck)
    li.append(label)
    li.append(spanText)
    li.append(btn)
    todoUl.append(li)
    return [spanText, input, btn, spanText]
}

formTask.addEventListener('submit', (e) => {
    e.preventDefault()
    const [spanText, input, btn] = taskCreation()
    spanText.innerHTML = e.target[0].value;
    addEvent(input, btn, spanText)
    const task = e.target[0].value + '/' + false;
    listOfTasks.push(task)
    localStorage.secundaryTasks = localStorage.secundaryTasks + ',' + task;
    e.target[0].value = '';
})

function getTasks() {
    listOfTasks = localStorage.secundaryTasks.split(',')
    for (let i = 1; i < listOfTasks.length; i++) {
        const [spanText, input, btn] = taskCreation()
        let isChecked = listOfTasks[i].split('/')[1]
        console.log(isChecked)
        if (isChecked === 'true') {
            input.setAttribute('checked', '')
            spanText.style.textDecoration = "line-through"
        }
        spanText.innerHTML = listOfTasks[i].split('/')[0];
        addEvent(input, btn, spanText)
    }
}

function addEvent(input, btn, spanText) {
    input.addEventListener('click', (e) => {
        if (e.target.checked) {
            input.setAttribute('checked', '')
            spanText.style.textDecoration = "line-through"
            console.log(spanText.innerHTML)
            listOfTasks[listOfTasks.indexOf(spanText.innerText + '/false')] = listOfTasks[listOfTasks.indexOf(spanText.innerText + '/false')].split('/')[0] + '/true'
        }
        else {
            input.removeAttribute('checked', '')
            spanText.style.textDecoration = "none"
            listOfTasks[listOfTasks.indexOf(spanText.innerText + '/true')] = listOfTasks[listOfTasks.indexOf(spanText.innerText + '/true')].split('/')[0] + '/false'
        }
        localStorage.secundaryTasks = listOfTasks;
    })

    btn.addEventListener('click', (e) => {
        const notCompleted = listOfTasks.indexOf(e.path[1].children[1].outerText + '/false')
        const completed = listOfTasks.indexOf(e.path[1].children[1].outerText + '/true')

        if (completed > 0) {
            listOfTasks.splice(completed, 1)
        }
        else {
            listOfTasks.splice(notCompleted, 1)
        }
        localStorage.secundaryTasks = listOfTasks;
        e.path[1].remove()
    })

}

clearStorage.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
    return false
})

changeBg.addEventListener('click', () => {
    bodyChange.style.background = '#000'
    clickBg > 3 ? clickBg = 1 : clickBg++
    setTimeout(() => {
        setTimeout(() => {
            bodyChange.style.background = 'none'
        }, 250);
        document.body.style.backgroundImage = `url('img/${clickBg}.jpg')`
    }, 250)
    localStorage.bgChosen = clickBg
})

locWeather.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather(e.target[0].value)
    localStorage.setItem('localWeather', e.target[0].value)
    e.target[0].value = ''
})

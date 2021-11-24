// Iniciação de variáveis
const linkSVG = "<svg viewBox='0 0 275.183 275.183'><path id='XMLID_16_' d='M255.559,114.521l-45.155,45.155c-4.147,4.147-9.674,6.433-15.561,6.434c-5.889,0-11.416-2.285-15.565-6.435  l-5.072-5.072c-4.296-4.296-4.296-11.261,0-15.557c4.297-4.295,11.26-4.295,15.557,0l5.073,5.073l45.167-45.155  c17.589-17.589,17.588-46.209,0-63.8c-17.592-17.588-46.213-17.591-63.801-0.001L131.046,80.32l24.117,24.126l24.868-24.868  c4.297-4.295,11.26-4.295,15.557,0c4.296,4.296,4.296,11.261,0,15.557l-60.045,60.045l24.115,24.116  c4.147,4.147,6.432,9.675,6.432,15.563s-2.284,11.415-6.433,15.563l-45.154,45.155c-12.632,12.631-29.486,19.588-47.455,19.588  c-0.001,0,0,0-0.001,0c-17.97,0-34.824-6.957-47.456-19.59C6.958,242.941,0,226.088,0,208.118c0-17.97,6.957-34.823,19.589-47.456  l45.155-45.155c4.147-4.147,9.673-6.433,15.561-6.434c5.889,0,11.417,2.285,15.565,6.435l5.072,5.073  c4.296,4.296,4.295,11.261,0,15.556c-4.296,4.295-11.261,4.295-15.556-0.001l-5.073-5.072l-45.167,45.155  c-17.589,17.589-17.589,46.209,0,63.799c17.59,17.59,46.211,17.592,63.8,0.002l45.155-45.156l-24.116-24.126l-24.872,24.872  c-4.296,4.295-11.261,4.295-15.557,0c-4.295-4.296-4.295-11.261,0-15.557l32.641-32.641c0.003-0.004,0.007-0.008,0.011-0.011  c0.003-0.004,0.007-0.007,0.01-0.01l27.387-27.388L115.49,95.887c-4.147-4.147-6.432-9.675-6.432-15.563s2.285-11.415,6.433-15.563  l45.154-45.155C173.276,6.976,190.13,0.019,208.1,0.019c0.001,0,0,0,0.001,0c17.971,0,34.824,6.957,47.456,19.59  C281.724,45.776,281.725,88.353,255.559,114.521z'/></svg>"
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
const linkUl = document.querySelector('.linkContainer')
const linkList = document.querySelector('.linkList')
const linkListUl = document.querySelector('.linkList UL')
const newLinkBtn = document.querySelector('.linkList>button')
const linkInput = document.querySelector('.linkInput')
const linkBack = document.querySelector('.linkInput>button')
const newLinkForm = document.querySelector('#newLink')
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
let dnsList = [];
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
        getLinks()
        setTime()
    } else {
        transitionElement(nameWindow, 1, 'none')
        transitionElement(header, 1)
        transitionElement(mainWindow, 0)
        localStorage.setItem('secundaryTasks', listOfTasks)
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

function goBack() {
    linkList.style.left = "0"
    linkInput.style.left = "0"
    linkInput.style.height = "0"
    linkList.style.maxHeight = "80vh"
    linkList.style.overflow = "visible"
}

function newLink() {
    linkList.style.left = "-250px"
    linkInput.style.left = "-250px"
    linkInput.style.height = "100%"
    linkList.style.maxHeight = "180px"
    linkList.style.overflow = "hidden"
}

newLinkBtn.addEventListener('click', () => {
    newLink()
})

linkBack.addEventListener('click', () => {
    goBack()
})

newLinkForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let dns = e.target[0].value
    let address = e.target[1].value
    e.target[0].value = ''
    e.target[1].value = ''
    newLinkAdd(dns, address)
    goBack()
})

function newLinkAdd(dns, address, update = true) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    const a = document.createElement('a')
    btn.addEventListener('click', (e) => {
        dnsList.splice(dnsList.indexOf(e.path[1].children[0].innerText), 2)
        localStorage.listDNS = dnsList
        li.remove()
    })
    btn.innerText = 'x'
    a.href = address
    a.innerHTML = linkSVG + dns
    li.append(a)
    li.append(btn)
    linkListUl.append(li)
    if (update) {
        dnsList.push(dns, address)
        localStorage.listDNS = dnsList
    }
}

function getLinks() {
    if (localStorage.listDNS) {
        dnsList = localStorage.listDNS.split(',')
        for (let i = 0; i < dnsList.length; i = i + 2) {
            newLinkAdd(dnsList[i], dnsList[i + 1], false)
        }
    }
    else {
        localStorage.setItem('listDNS', dnsList)
    }
}

function clickedElement(e) {
    for (let parent of e.path) {
        try {
            if (parent.className.indexOf('links') >= 0) {
                return 'links'
            }
            if (parent.className.indexOf('settings') >= 0) {
                return 'settings'
            }
            if (parent.className.indexOf('todo') >= 0) {
                return 'todo'
            }
        }
        catch {
            return 'outside';
        }
    }
}

function closeEverything() {
    transitionElement(linkUl, 0)
    transitionElement(settingsBox, 0)
    transitionElement(todoUl, 0)
    linkUl.style.top = '-40px'
    todoUl.style.bottom = '-10vh'
    settingsBox.style.bottom = '-10vh'
}

document.addEventListener('click', e => {
    let name = clickedElement(e)
    if (name == 'links') {
        closeEverything()
        linkUl.style.top = '50px';
        transitionElement(linkUl, 1)
    }
    if (name == 'settings') {
        closeEverything()
        settingsBox.style.bottom = '50px'
        transitionElement(settingsBox, 1)
        console.log('up')
    }
    if (name == 'todo') {
        closeEverything()
        todoUl.style.bottom = '50px'
        transitionElement(todoUl, 1)
    }
    if (name == 'outside') {
        closeEverything()
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
    clickBg > 4 ? clickBg = 1 : clickBg++
    setTimeout(() => {
        setTimeout(() => {
            bodyChange.style.background = 'none'
        }, 250);
        document.body.style.backgroundImage = `url('img/${clickBg}.jpg')`
    }, 500)
    localStorage.bgChosen = clickBg
})

locWeather.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather(e.target[0].value)
    localStorage.setItem('localWeather', e.target[0].value)
    e.target[0].value = ''
})



/*import { validateForm } from './utility.js'

const taskButtonNow = document.querySelector('#taskButton')

taskButtonNow.addEventListener('click', function(){
    validateForm()
})*/



/*
Project features

client validation
adding activity/task
reset task

*/


const taskButtonNow = document.querySelector('#taskButton')
const task = JSON.parse(localStorage.getItem('task'))
let currentPosition  = -1

taskButtonNow.addEventListener('click', function () {
    const isValidated = validationForm()

    if (!isValidated) 
    return
    

    const getActivity = getTaskActivity()

    reset()

    const label = this.value

    if (label === 'Edit Task') {
        //edit task

        task[currentPosition] = getActivity
        this.value = 'Add Task'
        currentPosition = -1
    }else{
        task.push(getActivity)
    }

    const stringifyTask = JSON.stringify(task)
    localStorage.setItem('task', stringifyTask)

    renderTask(task)
})




//client side Validation
const activityInput = document.querySelector("#activity-field")
const dateInput = document.querySelector("#date-field")
const timeInput = document.querySelector("#time-field")
const addButton = document.querySelector("#taskButton")
const validationForm = () => {
    const inputField = document.querySelectorAll('input')

 
        inputField.forEach(input =>{
         input.classList.remove('error-alert')
        })
     

    //check if input fields are empty
    if (activityInput.value === '' || dateInput.value === '' || timeInput.value === '') {
       inputField.forEach(input =>{
        input.classList.add('error-alert')
       })
       return false
    }
   return true
}

const getTaskActivity = () =>{
    fieldActivity = activityInput.value
    dateActivity = dateInput.value
    timeActivity = timeInput.value
   return{
    fieldActivity, dateActivity, timeActivity, taskstatus: 'undone'
   }
}

const reset = () =>{
    activityInput.value = ''
    dateInput.value = ''
    timeInput.value = ''
}

const setTask = (task) =>{
    activityInput.value = task.fieldActivity
    dateInput.value = task.dateActivity
    timeInput.value = task.timeActivity

    addButton.value = 'Edit Task'
}


const renderTask = (task) =>{
    const displayTask  = document.querySelector("#taskDisplay")
    displayTask.innerHTML = ""
   for(let itempos = 0; itempos < task.length; itempos++){
    const tasksitem = task[itempos]
    const renderItem = createTask(tasksitem, itempos)
    displayTask.appendChild(renderItem)
   }
    
}



const createTask = (items, position) =>{
 const cardDiv = document.createElement("div")
 cardDiv.setAttribute("class", "card")
 
const imagegroup = document.createElement("div")
imagegroup.setAttribute("class", "img-group")
const imagetag = document.createElement("img")
imagetag.setAttribute("src", "./images/todolisticon1.png")
imagetag.setAttribute("style", "width: 60px")

imagegroup.appendChild(imagetag)


const inputnow = document.createElement("input")
inputnow.setAttribute("type", "checkbox")
imagegroup.appendChild(inputnow)

cardDiv.appendChild(imagegroup)

const cardbod = document.createElement("div")
cardbod.setAttribute("class", "cardbody")

const title = document.createElement("h4")
title.textContent = items.fieldActivity

const paraDiv = document.createElement("div")
paraDiv.setAttribute("class", "para")
const dateEle =document.createElement("p")
dateEle.textContent = `${items.dateActivity} : ${items.timeActivity}`
const taskEle =document.createElement("p")
taskEle.textContent = `${items.taskstatus}`

paraDiv.appendChild(dateEle)
paraDiv.appendChild(taskEle)

cardbod.appendChild(title)
cardbod.appendChild(paraDiv)

cardDiv.appendChild(cardbod)

const btngroupDiv = document.createElement("div")
btngroupDiv.setAttribute("class", "btn-group")

const editButton = document.createElement("button")
editButton.textContent = 'Edit'
editButton.setAttribute("class", "btn-danger")

editButton.addEventListener('click', function(){
    setTask(task[position])
    currentPosition = position
})

const deleteButton = document.createElement("button")
deleteButton.textContent = 'Delete'
deleteButton.setAttribute("class", "btn-update")

deleteButton.addEventListener('click', function(){
    task.splice(position, 1)
    const stringifyTask = JSON.stringify(task)
    localStorage.setItem('task', stringifyTask)
    renderTask(task)

})

btngroupDiv.appendChild(editButton)
btngroupDiv.appendChild(deleteButton)

cardDiv.appendChild(btngroupDiv)

return cardDiv
}

renderTask(task)


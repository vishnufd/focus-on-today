const checkBox = document.querySelectorAll('.check-box')
const errorLabel = document.querySelector('.error-label')
const inputField = document.querySelectorAll('.goal-one')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')
const footerMsg = document.querySelector('.mini-footer')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    },
    fourth: {
        name: '',
        completed: false
    }
}
let completeGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completeGoalCount / inputField.length * 100}%`
progressValue.firstElementChild.innerText = `${completeGoalCount} / ${inputField.length} completed`


checkBox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const inputGoalFilled = [...inputField].every((input) => {
            return input.value
        })
        if (inputGoalFilled) {
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
            completeGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completeGoalCount / inputField.length * 100}%`
            progressValue.firstElementChild.innerText = `${completeGoalCount} / ${inputField.length} completed`

            if (completeGoalCount == 1) {
                progressLabel.innerText = "Well begun is half done!"
                footerMsg.innerText = "“Keep Going, You’re making great progress!”"
            } else if (completeGoalCount == 2 && completeGoalCount == 3) {
                progressLabel.innerText = "Just a step away, keep going!"
            } else if (completeGoalCount == 4) {
                progressLabel.innerText = "Whoa! You just completed all the goals, time for chill :D"
                footerMsg.innerText = "“That's it you done it!”"
            } else if (completeGoalCount == 0) {
                progressLabel.innerText = "Raise the bar by completing your goals!"
                footerMsg.innerText = "“Move one step ahead, today!”"
            }
        } else {
            progressBar.classList.add('show-error')
        }
    })
})


inputField.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name
        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        if (allGoals[input.id])
            allGoals[input.id].name = input.value

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})


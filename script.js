// Select all necessary dom element
const addButton = document.getElementById("button")
const unorderedList = document.getElementById("bug")
const inputFrom = document.getElementById("input")
const okButton = document.getElementById("ok-button")
const msgText = document.getElementById("msg-text")
const msgBox = document.getElementById("msg-box")

// Todo list holder
const todoListData = []
const key = "Todo"
const store = localStorage

if (store["Todo"]) {
    const liList = JSON.parse(store["Todo"])
    liList.forEach((item) => {
        createTodo(item)
        todoListData.push(item)
    })
}

// Formate user input text to nice capitalize one
function capitalize(text) {
    // slice text and formate it
    return text[0].toUpperCase() + text.slice(1).toLowerCase()
}

//  Change text style base on state
function changeStyle() {
    if (this.classList.contains("under-line")) {
        this.classList.remove("under-line")
    } else {
        this.classList.add("under-line")
    }
}

// delete dblclick todo and remove it text from todoListData
function dltTodo() {
    const removeTodo = this.innerText
    // locate removed todo text index value in todoListData and remove it from array using this index value
    const index = todoListData.indexOf(removeTodo)
    todoListData.splice(index, 1)
    this.remove()
    store.setItem(key, JSON.stringify(todoListData))
}

function updateData(text) {
    todoListData.push(text)
    store.setItem(key, JSON.stringify(todoListData))
}

// Create Todo and add it text to todoListData
function createTodo(text) {
    // Creating dom element li and inside li put user type text and finlay append it to parent
    const li = document.createElement("li")
    li.setAttribute("title", "Single click to mark & double click to remove")
    li.innerText = text
    unorderedList.appendChild(li)
    // Clear old typed text to input from
    inputFrom.value = ""
    // Add event lister to li to dlt it or edit it
    li.addEventListener("dblclick", dltTodo)
    li.addEventListener("click", changeStyle)
}

function alertMsg(alertText) {
    msgText.innerText = alertText
    msgBox.classList.add("show-msg")
    okButton.addEventListener("click", () => {
        msgBox.classList.remove("show-msg")
    })
}

//  Main Function that combine all function to work together
addButton.addEventListener("click", () => {
    // check user type anything or not!
    if (inputFrom.value) {
        // calling capitalize function to formate user inputted text
        const formattedText = capitalize(inputFrom.value)

        // checking user already add this todo or not!
        const addTodo = todoListData.includes(formattedText, 0)
        if (!addTodo) {
            //  Calling createTodo function to create todo
            createTodo(formattedText, inputFrom)
            // Add todo text to todoListData array
            updateData(formattedText)
        } else {
            // If todo is already in todoListData thn showing alert and clean input from
            const msg = `You already add the todo called  - "${formattedText}"`
            alertMsg(msg)
            inputFrom.value = ""
        }
    } else {
        // If user noting but try to add todo thn showing alert]
        alertMsg("Input box is empty please type something than try again")
    }
})

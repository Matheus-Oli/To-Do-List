const taskInput = document.querySelector(".task-input input")
const btnAdd = document.querySelector(".btn-add")
const btnDeleteAll = document.querySelector(".btn-delete-all")
const taskList = document.querySelector(".task-list")

let tasks = JSON.parse(localStorage.getItem("todolist")) || []

function updateLocalStorage() {
  localStorage.setItem("todolist", JSON.stringify(tasks))
}

function createTaskElement(task, index) {
  const li = document.createElement("li")
  li.className = "task-item"
  if (task.status === "checked") {
    li.classList.add("completed")
  }

  li.innerHTML = `
    <input type="checkbox" ${task.status} onchange="toggleTask(${index})">
    <span>${task.item}</span>
    <div class="task-actions">
      <button class="btn-edit" onclick="editTask(${index})"><i class='bx bx-edit-alt'></i></button>
      <button class="btn-delete" onclick="deleteTask(${index})"><i class='bx bx-trash'></i></button>
    </div>
  `

  return li
}

function renderTasks() {
  taskList.innerHTML = ""
  tasks.forEach((task, index) => {
    taskList.prepend(createTaskElement(task, index))
  })
}

function addTask() {
  const taskText = taskInput.value.trim()
  if (taskText && tasks.length < 20) {
    tasks.push({ item: taskText, status: "" })
    updateLocalStorage()
    renderTasks()
    taskInput.value = ""
  } else if (tasks.length >= 20) {
    alert("Limite máximo de 20 itens atingido!")
  }
}

function toggleTask(index) {
  tasks[index].status = tasks[index].status === "checked" ? "" : "checked"
  updateLocalStorage()
  renderTasks()
}

function editTask(index) {
  const newText = prompt("Editar tarefa:", tasks[index].item)
  if (newText !== null) {
    tasks[index].item = newText.trim()
    updateLocalStorage()
    renderTasks()
  }
}

function deleteTask(index) {
  tasks.splice(index, 1)
  updateLocalStorage()
  renderTasks()
}

function deleteAllTasks() {
  if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
    tasks = []
    updateLocalStorage()
    renderTasks()
  }
}

btnAdd.addEventListener("click", addTask)
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask()
  }
})
btnDeleteAll.addEventListener("click", deleteAllTasks)

renderTasks()


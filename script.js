let tasks = [];

function addTask() {
    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("taskDate").value;
    let time = document.getElementById("taskTime").value;

    if (text === "") {
        alert("Enter a task!");
        return;
    }

    tasks.push({
        text,
        date,
        time,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {
        if (task.completed) completedCount++;

        let div = document.createElement("div");
        div.className = "task";

        let text = document.createElement("span");
        text.innerText = `${task.text} (${task.date} ${task.time})`;

        if (task.completed) text.classList.add("completed");

        let actions = document.createElement("div");
        actions.className = "actions";

        let completeBtn = document.createElement("button");
        completeBtn.innerText = "✔";
        completeBtn.onclick = () => toggleComplete(index);

        let editBtn = document.createElement("button");
        editBtn.innerText = "✏";
        editBtn.onclick = () => editTask(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        div.appendChild(text);
        div.appendChild(actions);

        list.appendChild(div);
    });

  
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText = completedCount;
    document.getElementById("pending").innerText = tasks.length - completedCount;
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
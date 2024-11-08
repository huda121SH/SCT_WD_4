const taskInput = document.getElementById('taskInput');
const taskTime = document.getElementById('taskTime');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', function () {
    const taskValue = taskInput.value.trim();
    const taskDateTime = taskTime.value;

    if (taskValue !== "" && taskDateTime !== "") {
        const li = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = taskValue;

        const timeText = document.createElement('span');
        timeText.classList.add('task-time');
        timeText.textContent = `Due: ${new Date(taskDateTime).toLocaleString()}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            li.remove();
        });

        const completeBtn = document.createElement('button');
        completeBtn.textContent = "Complete";
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', function () {
            li.classList.toggle('completed');
            completeBtn.textContent = li.classList.contains('completed') ? "Undo" : "Complete";
        });

        const dueBtn = document.createElement('button');
        dueBtn.textContent = "Edit";
        dueBtn.classList.add('due-btn');
        dueBtn.addEventListener('click', function () {
            enableDateEdit(li, timeText, taskDateTime);
        });

        li.appendChild(taskText);
        li.appendChild(timeText);
        li.appendChild(completeBtn);
        li.appendChild(dueBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        taskInput.value = "";
        taskTime.value = "";

        checkDue(li, taskDateTime);
    } else {
        alert("Please enter both a task and a due time.");
    }
});

function checkDue(taskElement, dueDateTime) {
    const now = new Date();
    const taskDueDate = new Date(dueDateTime);

    if (taskDueDate <= now) {
        taskElement.classList.add('overdue');
    } else {
        taskElement.classList.remove('overdue');
    }
}

function enableDateEdit(taskElement, timeTextElement, originalDueDateTime) {
    const dueBtn = taskElement.querySelector('.due-btn');
    dueBtn.style.display = 'none';

    const newDateInput = document.createElement('input');
    newDateInput.type = 'datetime-local';
    newDateInput.value = originalDueDateTime;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = "Save";
    saveBtn.classList.add('save-btn');
    saveBtn.addEventListener('click', function () {
        const newDueDate = newDateInput.value;
        if (newDueDate) {
            timeTextElement.textContent = `Edit: ${new Date(newDueDate).toLocaleString()}`;
            checkDue(taskElement, newDueDate);
        
            newDateInput.remove();
            saveBtn.remove();
            dueBtn.disabled = true;
         
            dueBtn.style.display = 'inline-block';
        }
    });

    taskElement.appendChild(newDateInput);
    taskElement.appendChild(saveBtn);
}


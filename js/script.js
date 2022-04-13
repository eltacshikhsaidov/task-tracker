let taskClear = document.querySelector('#taskClear');
let taskInput = document.querySelector('#taskInput');
let sort = document.querySelector('.sort>i');
let addTaskButton = document.querySelector('#addTaskButton');
let taskList = document.querySelector('.todos');

// Clear task input
taskClear.addEventListener('click', () => {
    taskInput.value = '';
});

// Add task
let todoList = [];
addTaskButton.addEventListener('click', () => {
    let task = taskInput.value;
    if(task !== ''){
        todoList.push(task);

        // Create task
        createTask(task);

        // Remove task when clicking 'x' icon
        deleteTask();

        // clear input bar after creating task
        taskInput.value = '';
    } else {
        let popup = document.getElementById('myPopup');
        popup.classList.toggle('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }

    // Sort tasks
    sort.addEventListener('click', () => {

        if(sort.classList.contains('fa-sort-amount-asc')){
            sort.classList.remove('fa-sort-amount-asc');
            sort.classList.add('fa-sort-amount-desc');
            todoList.sort();

            // clearing everything inside the list
            taskList.innerHTML = '';

            // Iterate sorted items and display them
            todoList.forEach(item => {
                createTask(item);
                deleteTask();
            });

        } else {
            sort.classList.remove('fa-sort-amount-desc');
            sort.classList.add('fa-sort-amount-asc');

            // sort list in descending order
            todoList.sort().reverse();

            // clearing everything inside the list
            taskList.innerHTML = '';

            // Iterate sorted items and display them
            todoList.forEach(item => {
                // Create task
                createTask(item);

                // Remove task when clicking 'x' icon
                deleteTask();
            });
        }
    });
});


// Delete task
function deleteTask() {
    let deleteTask = document.querySelectorAll('.delete');
    deleteTask.forEach(item => {
        item.addEventListener('click', () => {
            let index = todoList.indexOf(item.parentElement.innerText);
            console.log(todoList);
            if (index > -1) {
                console.log(index);
                todoList.splice(index, 1);
            }
            item.parentElement.remove();
        });
    });
}

// Create task
function createTask(item) {
    let taskItem = document.createElement('p');
    taskItem.classList.add('todo');
    taskItem.innerHTML = item;
    let removeTask = document.createElement('i');
    removeTask.classList.add('fa', 'fa-times', 'delete');
    taskItem.appendChild(removeTask);
    taskList.appendChild(taskItem);
}
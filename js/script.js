// Disable inspect option for browser
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
//     alert('inspect option is disabled!')
// });

// document.onkeydown = function (e) {
//     // disable F12 key
//     if(e.keyCode == 123) {
//         alert('F12 disabled!')
//         return false;
//     }
//     // disable U key
//     if(e.ctrlKey && e.keyCode == 85) {
//         alert('ctrl+U disabled!');
//         return false;
//     }
// }

// Drag and drop source code: https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js
function onDragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    draggableElement.style.backgroundColor = '#94ee71';
    const dropzoneElement = event.target;
    dropzoneElement.appendChild(draggableElement);
    event.dataTransfer.clearData();
    
    // remove element after dragging from array
    const index = todoList.indexOf(draggableElement.innerText);
    if (index > -1) {
        todoList.splice(index, 1);
        console.log('task' + index + ' deleted');
    }
    
}

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
    wholeAction();
});

document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        wholeAction();
    }
});

// Delete task
function deleteTask(idNumber) {
    let deleteTaskById = document.querySelector('#task' + (idNumber) + '>.delete');
    deleteTaskById.addEventListener('click', () => {
        deleteTaskById.parentElement.remove();
        let index = todoList.indexOf(deleteTaskById.parentElement.innerText);
        console.log(todoList);

        if (index > -1) {
            todoList.splice(index, 1);
            console.log('task' + index + ' deleted');
        }
    });
}

// Create task
function createTask(item, index) {
    let taskItem = document.createElement('p');
    taskItem.classList.add('todo');

    // drag and drop
    taskItem.draggable = "true";
    
    taskItem.id = 'task' + index;

    taskItem.innerHTML = item;
    let removeTask = document.createElement('i');
    removeTask.classList.add('fa', 'fa-times', 'delete');

    taskItem.appendChild(removeTask);
    taskList.appendChild(taskItem);
}

function wholeAction() {
    let task = taskInput.value;
    if(task !== ''){

        if (task.length > 30) {
            let popup = document.getElementById('myPopup');
            popup.innerText = 'Task is too long!';
            popup.classList.toggle('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        } else {

            // Add task to array
            todoList.push(task);

            // Create task
            createTask(task, todoList.length);

            // Remove task when clicking 'x' icon
            deleteTask(todoList.length);

            // clear input bar after creating task
            taskInput.value = '';
        }

    } else {

        let popup = document.getElementById('myPopup');
        popup.innerText = 'Task is empty!';
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
            todoList.forEach((item, index) => {

                // create new task 
                createTask(item, index);

                // delete task by id
                deleteTask(index);
            });

        } else {
            sort.classList.remove('fa-sort-amount-desc');
            sort.classList.add('fa-sort-amount-asc');

            // sort list in descending order
            todoList.sort().reverse();

            // clearing everything inside the list
            taskList.innerHTML = '';

            // Iterate sorted items and display them
            todoList.forEach((item, index) => {

                // create new task 
                createTask(item, index);

                // delete task by id
                deleteTask(index);
            });
        }
    });
}
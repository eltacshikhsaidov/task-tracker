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

    // drag and drop
    taskItem.draggable = "true";
    // taskItem.ondragstart = "drag(event)";
    taskItem.id = 'task' + todoList.indexOf(item);


    taskItem.innerHTML = item;
    let removeTask = document.createElement('i');
    removeTask.classList.add('fa', 'fa-times', 'delete');
    taskItem.appendChild(removeTask);
    taskList.appendChild(taskItem);
}

/* ---- particles.js config ---- */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area":1000
        }
      },
      "color": {
        "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
      },
      
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#fff"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 120,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
});
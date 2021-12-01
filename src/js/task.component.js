//HTML REFs
import {
    Task
} from '../classes/index.js';
import {
    taskService
} from '../index';

const tasksContainer = document.querySelector('.todo-list');
const inputAddTask = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const filters = document.querySelector('.filters');

export const createHTMLTask = (task) => {
    const newTask = `
    <li class="${(task.completed) ? 'completed' : 'pending'}" id="${task.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(task.completed) ? 'checked' : ''}>
            <label>${task.name}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    </li>`
    tasksContainer.innerHTML += newTask;

    return newTask;
}

//Events
inputAddTask.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
        const newTask = new Task(e.target.value);
        taskService.addTask(newTask);
        createHTMLTask(newTask);
        e.target.value = '';
    }
});

tasksContainer.addEventListener('click', (e) => {
    const taskWrapper = e.target.parentElement.parentElement;
    const id = taskWrapper.getAttribute('id');

    if(e.target.localName === 'input'){
        taskService.toggleCompleted(id);
        taskWrapper.classList.toggle('completed');
    };

    if(e.target.localName === 'button'){
        taskService.deleteTask(id);
        taskWrapper.remove();
    };
});

clearCompleted.addEventListener('click', (e) =>{
    const completedTasks = document.querySelectorAll('.completed');

    taskService.deleteCompletedTasks(); 
    completedTasks.forEach(element => {
        element.remove();
    }); 
});

filters.addEventListener('click', (e) => {
    if(!e.target.text){ return; }
    
    addFilters(e.target.text.toLowerCase());
});


const addFilters = (option) => {
    const filterOption = {
        todos:() => {
            const completedTasks = document.querySelectorAll('.hidden');
            completedTasks.forEach(element => {
                element.classList.toggle('hidden');
            }); 
        },
        pendientes: () => {
            const completedTasks = document.querySelectorAll('.completed');
            completedTasks.forEach(element => {
                element.classList.toggle('hidden');
            }); 
        },
        completados: () => {
            const completedTasks = document.querySelectorAll('.pending');
            completedTasks.forEach(element => {
                element.classList.toggle('hidden');
            }); 
        },
        default: () => filterOption.todos()
    }

    return (filterOption[option] || filterOption['default'])()
}
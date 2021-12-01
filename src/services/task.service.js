export class TaskService {

    static #taskService;
    #tasks = [];

    get taskList() {
        // Se envía una copia para evitar la modificación de archivos por referencia, es lo mismo que this.#tasks.slice(0)
        return [...this.#tasks];
    }

    constructor() {
        this.loadTasks();
        // Se aplica un sigletone
        if (!!TaskService.#taskService) {
            console.log('Ya existe el servicio de tareas');
            return TaskService.#taskService
        } else {
            console.log('Servicio de tareas creado');
            TaskService.#taskService = this;
        }
    }

    addTask(task) {
        this.#tasks.push(task);
        this.setTasks();
    }

    deleteTask(id) {
        for (let i in this.#tasks) {
            if (this.#tasks[i].id == id) {
                this.#tasks.splice(i, 1);
                this.setTasks();
                break;
            }
        }
    }

    toggleCompleted(id) {
        for (let i in this.#tasks) {
            if (this.#tasks[i].id == id) {
                this.#tasks[i].completed = !this.#tasks[i].completed;
                this.setTasks();
                break;
            }
        }
    }

    deleteCompletedTasks() {
        this.#tasks = this.#tasks.filter(task => !task.completed);
        this.setTasks();
    }

    setTasks(){
        localStorage.setItem('tasks', JSON.stringify(this.#tasks));
    }

    loadTasks() {
        this.#tasks = (localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    }
}
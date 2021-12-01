/* Estilos de la app */
import './styles.css';
// Importaciones y exportanciones centralizadas
import { TaskService } from './classes/index';
import { createHTMLTask } from './js/task.component';


export const taskService = new TaskService();

taskService.taskList.forEach(task => {
    createHTMLTask(task);
});


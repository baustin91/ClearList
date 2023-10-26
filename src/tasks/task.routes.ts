import { Router } from "express";
import * as TaskController from './task.controller';

const router = Router();
router.
    route('/tasks').
    get(TaskController.readAllTasksByListID);

router. 
    route('/tasks/:taskID'). 
    get(TaskController.readTaskByTaskID);

router. 
    route('/tasks'). 
    post(TaskController.createTask);

router. 
    route('/tasks'). 
    put(TaskController.updateTask);

router. 
    route('/tasks/:taskID'). 
    delete(TaskController.deleteTask);

export default router;
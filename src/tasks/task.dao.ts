import { OkPacket  } from "mysql";
import { execute } from "../services/mysql.connector";
import { Task } from "./task.model";
import { taskQueries } from './task.queries';

export const readAllTasksByListID = async (listID: number) => {
    return execute<Task[]>(taskQueries.readAllTasksByListID, [listID]);
};

export const readTaskByTaskID = async (taskID: number) => {
    return execute<Task[]>(taskQueries.readTaskByTaskID, [taskID]);
};

export const createTask = async (task: Task) => {
    return execute<OkPacket>(taskQueries.createTask,
        [task.listID, task.task_title, task.due_date, task.task_note]);
};

export const updateTask = async (task: Task) => {
    return execute<OkPacket>(taskQueries.updateTask,
        [task.listID, task.task_title, task.due_date, task.task_note, task.taskID]);
};

export const deleteTask = async (taskID: number) => {
    return execute<OkPacket>(taskQueries.deleteTask, [taskID]);
};
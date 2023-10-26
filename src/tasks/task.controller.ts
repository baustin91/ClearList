import { Request, RequestHandler, Response } from 'express';
import { Task } from './task.model';
import * as TaskDao from './task.dao';
import { OkPacket } from 'mysql';

export const readAllTasksByListID: RequestHandler = async (req: Request, res: Response) => {
    try {
        let listID = parseInt(req.query.listID as string);

        console.log('listID', listID);
        if (Number.isNaN(listID)) {
            return res.status(400).json({
                message: 'Invalid list ID'
            });
        }

        const tasks = await TaskDao.readAllTasksByListID(listID);

        res.status(200).json(
            tasks
        );
    } catch (error) {
        console.error('[task.controller][readAllTasksByListID][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching tasks'
        });
    }
};

export const readTaskByTaskID: RequestHandler = async (req: Request, res: Response) => {
    try {

        let taskID = parseInt(req.params.taskID);
        const task = await TaskDao.readTaskByTaskID(taskID);

        res.status(200).json(
            task
        );
    } catch (error) {
        console.error('[task.controller][readTaskByTaskID][Error', error);
        res.status(500).json({
            message: 'There was an error when fetching task'
        });
    }
};

export const createTask: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await TaskDao.createTask(req.body);

        console.log('req.body', req.body);

        console.log('task', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[task.controller][createTask][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing task'
        });
    }
};

export const updateTask: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await TaskDao.updateTask(req.body);

        console.log('req.body', req.body);

        console.log('Task', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[task.controller][updateTask][Error]', error);
        res.status(500).json({
            message: 'There was an error when updating task'
        });
    }
};

export const deleteTask: RequestHandler = async (req: Request, res: Response) => {
    try {
        let taskID = parseInt(req.params.taskID);
        const task = await TaskDao.readTaskByTaskID(taskID);

        console.log('TaskID', taskID);
        if (!Number.isNaN(taskID)) {
            const response = await TaskDao.deleteTask(taskID);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for taskID");
        }
    } catch (error) { 
        console.error('[task.controller][deleteTask][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting task'
        });
    }
};
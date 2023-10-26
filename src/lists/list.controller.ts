import { Request, RequestHandler, Response } from 'express';
import { List } from './list.model';
import { Task } from '.././tasks/task.model';
import * as ListDao from './list.dao';
import * as TaskDao from '../tasks/task.dao';
import { OkPacket } from 'mysql';

export const readAllListsByUserID: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userID = parseInt(req.query.userID as string);

        console.log('userID', userID);
        if (Number.isNaN(userID)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        const list = await ListDao.readAllListsByUserID(userID);
        await readTasks(list, res);


        res.status(200).json(
            list
        );
    } catch (error) {
        console.error('[list.controller][readAllListsByUserID][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching lists'
        });
    }
};

export const readListByListID: RequestHandler = async (req: Request, res: Response) => {
    try {
        let listID = parseInt(req.params.listID);
        const list = await ListDao.readListByListID(listID);

        await readTasks(list, res);

        res.status(200).json(
            list
        );
    } catch (error) {
        console.error('[list.controller][readListByListID][Error', error);
        res.status(500).json({
            message: 'There was an error when fetching lists'
        });
    }
};

export const createList: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await ListDao.createList(req.body);

        console.log('req.body', req.body);

        console.log('list', okPacket); 

        /*
        req.body.tasks.forEach(async (task: Task, index: number) => {
            try {
                task.listID = okPacket.insertId;
                await TaskDao.createTask(task);
            } catch (error) {
                console.error('[list.controller][createListTask][Error', error);
                res.status(500).json({
                    message: 'There was an error when writing list tasks'
                });
            }
        });;
        */
        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[list.controller][createList][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing list'
        });
    }
};

export const updateList: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await ListDao.updateList(req.body);

        console.log('req.body', req.body);

        console.log('list', okPacket);

        /*
        req.body.tracks.forEach(async (task: Task, index: number) => {
            try {
                await TaskDao.updateTask(task);
            } catch (error) {
                console.error('[list.controller][updateList][Error]', error);
                res.status(500).json({
                    message: 'There was an error when updating Task list'
                });
            }
        });
        */

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[list.controller][updateList][Error]', error);
        res.status(500).json({
            message: 'There was an error when updating list'
        });
    }
};

async function readTasks(list: List[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < list.length; i++) {
        try {
            const task = await TaskDao.readAllTasksByListID(list[i].listID);
            list[i].tasks = task;

        } catch (error) {
            console.error('[list.controller][readTasks][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching list tasks'
            });
        }
    }
}

export const deleteList: RequestHandler = async (req: Request, res: Response) => {
    try {
        let listID = parseInt(req.params.listID);
        const list = await ListDao.readListByListID(listID);

        console.log('ListID', listID);
        if (!Number.isNaN(listID)) {
            const response = await ListDao.deleteList(listID);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for listID");
        }
    } catch (error) { 
        console.error('[list.controller][deleteList][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting list'
        });
    }
};
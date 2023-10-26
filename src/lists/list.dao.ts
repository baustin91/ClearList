import { OkPacket  } from "mysql";
import { execute } from "../services/mysql.connector";
import { List } from "./list.model";
import { listQueries } from './list.queries';

export const readAllListsByUserID = async (userID: number) => {
    return execute<List[]>(listQueries.readAllListsByUserID, [userID]);
};

export const readListByListID = async (listID: number) => {
    return execute<List[]>(listQueries.readListByListID, [listID]);
};

export const createList = async (list: List) => {
    return execute<OkPacket>(listQueries.createList,
        [list.userID, list.list_title]);
};

export const updateList = async (list: List) => {
    return execute<OkPacket>(listQueries.updateList,
        [list.list_title, list.listID]);
};

export const deleteList = async (listID: number) => {
    return execute<OkPacket>(listQueries.deleteList, [listID]);
};
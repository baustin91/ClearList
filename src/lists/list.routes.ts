import { Router } from "express";
import * as ListController from './list.controller';

const router = Router();
router.
    route('/lists').
    get(ListController.readAllListsByUserID);

router. 
    route('/lists/:listID'). 
    get(ListController.readListByListID);

router. 
    route('/lists'). 
    post(ListController.createList);

router. 
    route('/lists'). 
    put(ListController.updateList);

router. 
    route('/lists/:listID'). 
    delete(ListController.deleteList);

export default router;
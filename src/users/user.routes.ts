import express from 'express';
import { getUserById } from './user.controller'; // Adjust the path as necessary

const router = express.Router();

router.get('/getUserID/:username', getUserById);

export default router;

import { Request, Response } from 'express';
import { execute } from "../services/mysql.connector";
import { User } from '../users/user.model';

export const getUserById = async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const results = await execute<User[]>('SELECT userID FROM users WHERE username = ?', [username]);

    if (results.length > 0) {
      res.json({ userID: results[0].userID });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send((error as any).message);
  }
};

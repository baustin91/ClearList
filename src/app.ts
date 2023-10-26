import express, { Request, Response } from 'express';
import listRouter from './lists/list.routes';
import taskRouter from './tasks/task.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true}));

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);

if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the ClearList API</h1>');
});

app.use('/', [listRouter , taskRouter] );

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

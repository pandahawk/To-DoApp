import express, { Request, Response } from 'express';
import todoRouter from './routes/todos';
import bodyParser from 'body-parser';


const app = express();  
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/todos', todoRouter);

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})

app.get('/health', (req: Request, res: Response) => {
    const healthCheck = {
        status: 'UP',
        timestamp: new Date().toLocaleString(),
        message: 'Server is healthy'
    };
    res.json(healthCheck);
});
import express, { json, Request, Response } from 'express';
import * as database from '../utils/database';
import { Todo } from '../models/todo';
import * as httpStatus from 'http-status-codes';
//import bodyParser from 'body-parser';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const todos = database.getAllTodos();
  res.json(todos);
});

router.post('/', (req: Request, res: Response) => {
  const title = req.body.title;
  if (title) {
    const newTodo = database.addTodo(title);
    res.status(201).json(newTodo);
  } else {
    res
      .status(httpStatus.StatusCodes.OK)
      .json({ error: "JSON Property 'title' not found in request body" });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = database.getTodoById(id);
  if (todo) {
    res.json(todo);
  } else {
    res
      .status(httpStatus.StatusCodes.BAD_REQUEST)
      .json({ error: `Todo with id ${id} not found` });
  }
});

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const newTodo: Todo = {
    id: id,
    title: title,
    completed: completed,
  };
  const updatedTodo = database.updateTodo(newTodo);
  if (updatedTodo) {
    res
      .status(httpStatus.StatusCodes.OK)
      .json({ info: 'Todo updated', todo: updatedTodo });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const success = database.deleteTodoById(id);
  if (success) {
    res.status(httpStatus.StatusCodes.OK).json({ info: 'Todo deleted' });
  } else {
    res.status(httpStatus.StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
  }
});

export default router;

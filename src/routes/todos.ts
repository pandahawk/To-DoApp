import express, { json, Request, Response } from 'express';
import * as database from '../utils/database';
import { Todo } from '../models/todo';
import * as httpStatus from 'http-status-codes';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  const todos = database.getAllTodos();
  res.status(httpStatus.StatusCodes.OK).json({
    code: res.statusCode,
    info: 'Todos fetched successfully',
    timestamp: new Date().toLocaleString(),
    todos: todos,
  });
});

router.post('/', (req: Request, res: Response) => {
  const title = req.body.title;
  if (typeof title === 'string' && title.length > 0) {
    const newTodo = database.addTodo(title);
    console.log('todo added');
    res.status(httpStatus.StatusCodes.CREATED).json({
      code: res.statusCode,
      info: 'Todo successfully created',
      timestamp: new Date().toLocaleString(),
      todo: newTodo,
    });
  } else {
    res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
      code: res.statusCode,
      info: 'Bad Request',
      timestamp: new Date().toLocaleString(),
      error: "Property 'title not found or is empty'",
    });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = database.getTodoById(id);
  if (todo) {
    res.json({
      code: res.statusCode,
      info: 'Todo found',
      timestamp: new Date().toLocaleString(),
      todo: todo,
    });
  } else {
    res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
      code: res.statusCode,
      info: 'Bad Request',
      timestamp: new Date().toLocaleString(),
      error: `Todo id=${id} not found`,
    });
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
    res.status(httpStatus.StatusCodes.OK).json({
      code: res.statusCode,
      info: 'Todo updated',
      timestamp: new Date().toLocaleString(),
      todo: updatedTodo,
    });
  } else {
    res.status(httpStatus.StatusCodes.NOT_FOUND).json({
      code: res.statusCode,
      info: 'Not found',
      timestamp: new Date().toLocaleString(),
      error: `Todo id=${id} not found`,
    });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const foundTodo = database.deleteTodoById(id);
  if (foundTodo) {
    res.status(httpStatus.StatusCodes.OK).json({
      info: 'Todo deleted',
      timestamp: new Date().toLocaleString(),
      todo: foundTodo,
    });
  } else {
    res.status(httpStatus.StatusCodes.NOT_FOUND).json({
      code: res.statusCode,
      info: 'Not found',
      timestamp: new Date().toLocaleString(),
      error: `Todo id=${id} not found`,
    });
  }
});

export default router;

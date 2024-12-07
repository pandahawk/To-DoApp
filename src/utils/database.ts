import { Todo } from '../models/todo';

let todos: Todo[] = [
  { id: 101, title: 'Wash the car', completed: false },
  { id: 102, title: 'Play with Caleb', completed: false },
  { id: 103, title: 'Kiss my wife', completed: false },
];

let idCounter = todos.length + 100;

export const getAllTodos = (): Todo[] => {
  return todos;
};

export const getTodoById = (id: number): Todo | undefined => {
  let todoFound = todos.find((todo) => todo.id === id);
  return todoFound;
};

export const addTodo = (title: string): Todo => {
  const newTodo: Todo = {
    id: ++idCounter,
    title: title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const deleteTodoById = (id: number): Todo | undefined => {
  const foundTodo = todos.find((todo) => todo.id === id);
  if (foundTodo) {
    todos = todos.filter((todo) => todo.id !== id);
    console.log(todos);
    return foundTodo;
  }
  return undefined;
};

export const updateTodo = (newTodo: Todo): Todo | undefined => {

    const todoIndex = todos.findIndex(todo => todo.id === newTodo.id)
    if (todoIndex !== -1) {
        todos[todoIndex] = newTodo;
        return todos[todoIndex];
    } 
    return undefined;
};

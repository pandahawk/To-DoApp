"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodoById = exports.addTodo = exports.getTodoById = exports.getAllTodos = void 0;
let todos = [
    { id: 101, title: 'Wash the car', completed: false },
    { id: 102, title: 'Play with Caleb', completed: false },
    { id: 103, title: 'Kiss my wife', completed: false },
];
let idCounter = todos.length + 100;
const getAllTodos = () => {
    console.log(todos);
    return todos;
};
exports.getAllTodos = getAllTodos;
const getTodoById = (id) => {
    let todoFound = todos.find((todo) => todo.id === id);
    return todoFound;
};
exports.getTodoById = getTodoById;
const addTodo = (title) => {
    const newTodo = {
        id: ++idCounter,
        title: title,
        completed: false,
    };
    todos.push(newTodo);
    return newTodo;
};
exports.addTodo = addTodo;
const deleteTodoById = (id) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
        todos = todos.filter((todo) => todo.id !== id);
        console.log(todos);
        return true;
    }
    return false;
};
exports.deleteTodoById = deleteTodoById;
const updateTodo = (newTodo) => {
    const todoIndex = todos.findIndex(todo => todo.id === newTodo.id);
    if (todoIndex !== -1) {
        todos[todoIndex] = newTodo;
        return todos[todoIndex];
    }
    return undefined;
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=database.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database = __importStar(require("../utils/database"));
const httpStatus = __importStar(require("http-status-codes"));
//import bodyParser from 'body-parser';
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const todos = database.getAllTodos();
    res.json(todos);
});
router.post('/', (req, res) => {
    const title = req.body.title;
    if (title) {
        const newTodo = database.addTodo(title);
        res.status(201).json(newTodo);
    }
    else {
        res
            .status(httpStatus.StatusCodes.OK)
            .json({ error: "JSON Property 'title' not found in request body" });
    }
});
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = database.getTodoById(id);
    if (todo) {
        res.json(todo);
    }
    else {
        res
            .status(httpStatus.StatusCodes.BAD_REQUEST)
            .json({ error: `Todo with id ${id} not found` });
    }
});
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const newTodo = {
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
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const success = database.deleteTodoById(id);
    if (success) {
        res.status(httpStatus.StatusCodes.OK).json({ info: 'Todo deleted' });
    }
    else {
        res.status(httpStatus.StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
    }
});
exports.default = router;
//# sourceMappingURL=todos.js.map
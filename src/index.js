"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/todos', todos_1.default);
app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
app.get('/health', (req, res) => {
    const healthCheck = {
        status: 'UP',
        timestamp: new Date().toLocaleString(),
        message: 'Server is healthy'
    };
    res.json(healthCheck);
});
//# sourceMappingURL=index.js.map
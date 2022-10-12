"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/imageRoute/index"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Welcome to image processing server, Created by @MazenAlahwani, try to resize any image');
});
app.get('/test?name=mazen', (req, res) => {
    if (req.query.name === 'mazen') {
        res.status(200).send('welcome mazen');
    }
    else {
        res.status(400).send('welcome guest');
    }
});
app.use('/imageApi', index_1.default);
//listen to port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
exports.default = app;

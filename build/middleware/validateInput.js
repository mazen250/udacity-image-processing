"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = exports.validateSize = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const root = path_1.default.join(__dirname);
const validateSize = (req, res, next) => {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (width > 0 &&
        height > 0 &&
        typeof width === 'number' &&
        typeof height === 'number') {
        console.log('valid width and height');
        next();
    }
    else {
        res
            .status(400)
            .send('please enter valid width and height, width and height must be numbers and greater than 0');
    }
};
exports.validateSize = validateSize;
//check if image exists in images folder
const validateName = (req, res, next) => {
    const imageName = req.query.imageName;
    const clientImage = path_1.default.join(root, `../images/${imageName}.JPG`);
    if (fs_1.default.existsSync(clientImage)) {
        console.log('image name existed');
        next();
    }
    else {
        res.status(400).send('image name does not exist');
    }
};
exports.validateName = validateName;

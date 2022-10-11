"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const root = path_1.default.join(__dirname);
const cache = (width, height, imageName) => {
    const resizedImage = path_1.default.join(root, `../resizedImage/${imageName}-${width}-${height}.JPG`);
    if (fs_1.default.existsSync(resizedImage)) {
        console.log('cached image exists ');
        return true;
    }
    else {
        return false;
    }
};
const cachedRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imageName = req.query.imageName;
    const cached = cache(width, height, imageName);
    if (cached) {
        res.sendFile(path_1.default.join(root, `../resizedImage/${imageName}-${width}-${height}.JPG`));
    }
    else {
        next();
    }
});
exports.default = cachedRoute;

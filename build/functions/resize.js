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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//create function to resize an image which is an input to the function
const root = path_1.default.join(__dirname);
const resize = (imagePath, width, height, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sharp_1.default)(imagePath)
        .resize({ width, height })
        .toBuffer()
        .then((data) => {
        console.log(data);
        fs_1.default.writeFileSync(path_1.default.join(root, `../resizedImage/${imageName}-${width}-${height}.JPG`), data);
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = resize;

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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("../../functions/resize"));
const validateInput_1 = require("../../middleware/validateInput");
const cach_1 = __importDefault(require("../../middleware/cach"));
const router = express_1.default.Router();
const root = path_1.default.join(__dirname);
//middleware to check if the image name exists and if the user entered valid width and height
router.use(validateInput_1.validateSize, validateInput_1.validateName);
//check cache first, if image exists cache will send it without creating a new one, else we will continue to resize the image
router.get('/resize', cach_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the image info from query
    const imageName = req.query.imageName;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //path to normal image
    const clientImage = path_1.default.join(root, `../../images/${imageName}.JPG`);
    //path to resized image
    const resizedImage = path_1.default.join(root, `../../resizedImage/${imageName}-${width}-${height}.JPG`);
    //if the cache middleware did not send the image, we will resize it and send it
    const image = yield (0, resize_1.default)(clientImage, width, height, imageName);
    if (image !== 'err') {
        //return res.sendFile(resizedImage)
        return res.status(200).sendFile(resizedImage);
    }
    else {
        return res.status(400).send('image not resized');
    }
}));
exports.default = router;

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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const resize_1 = __importDefault(require("../functions/resize"));
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
const root = path_1.default.resolve(__dirname);
//test the root route
describe('Test the root path', () => {
    describe('Test the root path', () => {
        it('It should return a text that i wrote', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            const res = response.text;
            expect(res).toBe('Welcome to image processing server, Created by @MazenAlahwani, try to resize any image');
        }));
    });
});
//start of testing the resize route with not valid inputs
describe('Test the resize route with not valid image name and not valid width and height', () => {
    describe('Test the resize route with not valid image name', () => {
        it('It should return a status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/imageApi/resize?imageName=0&width=300&height=300');
            const res = response.status;
            expect(res).toBe(400);
        }));
    });
    describe('Test the resize route with not valid width and height', () => {
        it('It should return please enter valid width and height, width and height must be numbers and greater than 0', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/imageApi/resize?imageName=coffee&width=0&height=0');
            const res = response.text;
            expect(res).toBe('please enter valid width and height, width and height must be numbers and greater than 0');
        }));
    });
});
//end of testing the resize route with not valid inputs
//start of testing resize function and cache function
describe('Test cache and resize', () => {
    describe('Test the resize function', () => {
        it('It should return a buffer', () => __awaiter(void 0, void 0, void 0, function* () {
            const image = yield (0, resize_1.default)(path_1.default.join(root, '../../src/images/coffee.JPG'), 500, 500, 'testing');
            //console.log("image:"+image);
            expect(image).toBeInstanceOf(Buffer);
        }));
    });
    describe('Test cache', () => {
        it('It should return the buffer without creating a new image ', () => __awaiter(void 0, void 0, void 0, function* () {
            const image = yield (0, resize_1.default)(path_1.default.join(root, '../../src/images/mazen.JPG'), 500, 500, 'testing');
            //console.log("image:"+image);
            expect(image).toBeInstanceOf(Buffer);
        }));
    });
});
//end of testing resize function and cache function

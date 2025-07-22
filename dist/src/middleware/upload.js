"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
// Armazena o arquivo na memória RAM (buffer)
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.default = upload;

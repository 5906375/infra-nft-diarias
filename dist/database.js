"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('✅ Conectado ao MongoDB');
    }
    catch (err) {
        console.error('Erro ao conectar no MongoDB:', err);
    }
}

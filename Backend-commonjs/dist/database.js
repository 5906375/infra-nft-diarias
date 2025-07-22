"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// src/database.ts
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/nftdiarias';
const connectDB = async () => {
    let tentativas = 5;
    while (tentativas) {
        try {
            await mongoose_1.default.connect(mongoURI);
            console.log('✅ Conectado ao MongoDB');
            break;
        }
        catch (error) {
            console.error(`❌ Erro na conexão com MongoDB (${tentativas} tentativas restantes).`);
            console.error(error);
            tentativas--;
            await new Promise(res => setTimeout(res, 5000)); // espera 5s
        }
    }
    if (!tentativas) {
        console.error("💥 Falha ao conectar ao MongoDB após múltiplas tentativas.");
        process.exit(1);
    }
};
exports.connectDB = connectDB;

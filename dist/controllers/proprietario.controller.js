"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarProprietario = criarProprietario;
const Proprietario_1 = __importDefault(require("../models/Proprietario"));
async function criarProprietario(req, res) {
    try {
        const novo = new Proprietario_1.default(req.body);
        await novo.save();
        res.status(201).json({ message: 'Proprietário cadastrado com sucesso!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar' });
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CadastroCompleto_model_1 = __importDefault(require("../models/CadastroCompleto.model"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const novoCadastro = new CadastroCompleto_model_1.default(req.body);
        await novoCadastro.save();
        res.status(201).json({ message: 'Cadastro salvo com sucesso!' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao salvar o cadastro.' });
    }
});
exports.default = router;

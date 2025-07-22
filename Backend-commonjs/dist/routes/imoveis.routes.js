"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Imovel_1 = __importDefault(require("../models/Imovel"));
const router = (0, express_1.Router)();
// Criar um novo imóvel vinculado a um perfil
router.post('/', async (req, res) => {
    try {
        const imovel = new Imovel_1.default(req.body);
        await imovel.save();
        res.status(201).json(imovel);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Erro ao criar imóvel' });
    }
});
// Listar todos os imóveis ou filtrar por idPerfil
router.get('/perfil/:idPerfil', async (req, res) => {
    const { idPerfil } = req.params;
    const imoveis = await Imovel_1.default.find({ idPerfil });
    res.status(200).json(imoveis);
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NFT_1 = __importDefault(require("../models/NFT"));
const router = (0, express_1.Router)();
// Criar NFT
router.post('/nfts', async (req, res) => {
    try {
        const nft = new NFT_1.default(req.body);
        await nft.save();
        res.status(201).json(nft);
    }
    catch (err) {
        res.status(400).json({ error: 'Erro ao criar NFT de diária' });
    }
});
// Listar NFTs por propriedade
router.get('/nfts', async (req, res) => {
    const { propriedadeId } = req.query;
    try {
        const filtro = propriedadeId ? { propriedadeId } : {};
        const nfts = await NFT_1.default.find(filtro);
        res.status(200).json(nfts);
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao buscar NFTs' });
    }
});
exports.default = router;

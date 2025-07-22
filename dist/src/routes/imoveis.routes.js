"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Simulação de banco de dados
const imoveis = [
    { id: '1', nome: 'Casa da Praia', endereco: 'Av. Atlântica, 123', valorDiaria: 300 },
    { id: '2', nome: 'Chalé na Montanha', endereco: 'Rua das Árvores, 456', valorDiaria: 250 },
];
// 🧾 Rota GET para listar todos os imóveis
router.get('/', (req, res) => {
    res.status(200).json(imoveis);
});
// Rota GET por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const imovel = imoveis.find((i) => i.id === id);
    if (imovel) {
        return res.status(200).json(imovel);
    }
    else {
        return res.status(404).json({ message: 'Imóvel não encontrado' });
    }
});
// ✅ Rota POST para cadastro de novo imóvel
router.post('/', (req, res) => {
    const novoImovel = req.body;
    // Gera ID simples (auto-incremento)
    const novoId = (imoveis.length + 1).toString();
    const imovelComId = { id: novoId, ...novoImovel };
    imoveis.push(imovelComId);
    console.log("📥 Novo imóvel cadastrado:", imovelComId);
    return res.status(201).json(imovelComId);
});
exports.default = router;

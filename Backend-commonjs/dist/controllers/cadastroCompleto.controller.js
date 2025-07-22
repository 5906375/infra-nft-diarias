"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salvarCadastroCompleto = salvarCadastroCompleto;
const Perfil_1 = __importDefault(require("../models/Perfil"));
const Imovel_1 = __importDefault(require("../models/Imovel"));
async function salvarCadastroCompleto(req, res) {
    try {
        const { nome, email, telefone, tipoPessoa, endereco, cadastrarPropriedade, nomePropriedade, finalidade } = req.body;
        // 1. Salvar perfil
        const perfil = await Perfil_1.default.create({
            nome,
            email,
            telefone,
            tipoPessoa,
            endereco
        });
        // 2. Opcionalmente salvar imóvel vinculado
        let imovel = null;
        if (cadastrarPropriedade) {
            imovel = await Imovel_1.default.create({
                idPerfil: perfil._id,
                nomePropriedade,
                finalidade
            });
        }
        res.status(201).json({
            message: 'Cadastro salvo com sucesso!',
            idPerfil: perfil._id,
            idPropriedade: imovel ? imovel._id : null
        });
    }
    catch (err) {
        console.error('Erro ao salvar cadastro completo:', err);
        res.status(500).json({ error: 'Erro ao salvar cadastro completo' });
    }
}

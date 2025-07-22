"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Perfil_1 = __importDefault(require("../models/Perfil"));
const Imovel_1 = __importDefault(require("../models/Imovel"));
const NFT_1 = __importDefault(require("../models/NFT"));
const router = express_1.default.Router();
router.get('/', async (_, res) => {
    try {
        const perfis = await Perfil_1.default.find();
        const imoveis = await Imovel_1.default.find();
        const nfts = await NFT_1.default.find();
        // Exemplo de estrutura de relatório
        const relatorio = perfis.map((perfil) => {
            const imoveisDoPerfil = imoveis.filter(imovel => imovel.idPerfil === perfil.id);
            const nftsDoPerfil = nfts.filter(nft => imoveisDoPerfil.some(imv => imv._id.toString() === nft.propriedadeId));
            return {
                nomeProprietario: perfil.nome,
                tipoPessoa: perfil.tipoPessoa,
                email: perfil.email,
                cidade: perfil.endereco?.cidade,
                totalImoveis: imoveisDoPerfil.length,
                totalNFTs: nftsDoPerfil.length,
                nfts: nftsDoPerfil.map(n => ({
                    nome: n.nome,
                    inicio: n.inicio,
                    fim: n.fim,
                    finalidade: n.finalidade,
                })),
            };
        });
        res.status(200).json(relatorio);
    }
    catch (err) {
        console.error('Erro ao gerar relatório:', err);
        res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
});
exports.default = router;

import express from 'express';
import Perfil, { PerfilType } from '../models/Perfil';
import Imovel from '../models/Imovel';
import NFT from '../models/NFT';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const perfis: PerfilType[] = await Perfil.find();
        const imoveis = await Imovel.find();
        const nfts = await NFT.find();

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
    } catch (err) {
        console.error('Erro ao gerar relatório:', err);
        res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
});

export default router;

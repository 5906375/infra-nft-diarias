import { Router } from 'express';
import Imovel from '../models/Imovel';

const router = Router();

/**
 * ✅ Criar um novo imóvel
 * POST /api/imoveis
 */
router.post('/', async (req, res) => {
    try {
        const { idPerfil, nomePropriedade } = req.body;

        if (!idPerfil || !nomePropriedade) {
            return res.status(400).json({ error: 'idPerfil e nomePropriedade são obrigatórios.' });
        }

        const imovel = new Imovel(req.body);
        await imovel.save();

        res.status(201).json({
            message: '✅ Imóvel cadastrado com sucesso!',
            _id: imovel._id,
            idPerfil: imovel.idPerfil,
            nomePropriedade: imovel.nomePropriedade
        });
    } catch (err) {
        console.error('❌ Erro ao criar imóvel:', err);
        res.status(400).json({ error: 'Erro ao criar imóvel' });
    }
});

/**
 * 🔍 Listar todos os imóveis
 * GET /api/imoveis
 */
router.get('/', async (req, res) => {
    try {
        console.log('🔍 [GET] /api/imoveis acionado');
        const imoveis = await Imovel.find();
        console.log('✅ Resultado do Mongo:', imoveis);
        res.status(200).json(imoveis);
    } catch (err: any) {
        console.error('❌ Erro ao buscar todos os imóveis:', err.message);
        res.status(500).json({ error: 'Erro ao buscar imóveis', detalhe: err.message });
    }
});


/**
 * 🔍 Listar imóveis por perfil
 * GET /api/imoveis/perfil/:idPerfil
 */
router.get('/perfil/:idPerfil', async (req, res) => {
    try {
        const { idPerfil } = req.params;
        const imoveis = await Imovel.find({ idPerfil });
        res.status(200).json(imoveis);
    } catch (err) {
        console.error('❌ Erro ao buscar imóveis por perfil:', err);
        res.status(500).json({ error: 'Erro ao buscar imóveis por perfil' });
    }
});

export default router;

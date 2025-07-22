import { Router } from 'express';
import Imovel from '../models/Imovel';
import Perfil from '../models/Perfil';
import { buscarEnderecoPorCEP } from '../utils/consultaCep';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// 🧾 Rota GET para listar imóveis por perfil
router.get('/', async (req, res) => {
    try {
        const { idPerfil } = req.query;

        const filtro = idPerfil ? { idPerfil } : {};
        const imoveis = await Imovel.find(filtro);

        res.status(200).json(imoveis);
    } catch (err) {
        console.error('Erro ao buscar imóveis:', err);
        res.status(500).json({ error: 'Erro ao buscar imóveis' });
    }
});

// 🔹 Configuração do multer para salvar os arquivos em /uploads
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// 🔹 GET todos os perfis
router.get('/', async (_, res) => {
    try {
        const perfis = await Perfil.find();
        res.status(200).json(perfis);
    } catch (err) {
        console.error('Erro ao buscar perfis:', err);
        res.status(500).json({ error: 'Erro ao buscar perfis' });
    }
});

// 🔹 POST criar novo perfil com arquivos + preenchimento via CEP
router.post(
    '/',
    upload.fields([
        { name: 'docIdentidade', maxCount: 1 },
        { name: 'comprovanteEndereco', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const dados = req.body;

            // 🧾 Tipagem de arquivos
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            // 📦 Preenchimento de endereço via CEP
            if (dados.endereco?.cep || dados['endereco.cep']) {
                const cep = dados.endereco?.cep || dados['endereco.cep'];
                const enderecoAuto = await buscarEnderecoPorCEP(cep);

                dados.endereco = {
                    cep,
                    rua: enderecoAuto.rua || dados['endereco.rua'],
                    numero: dados['endereco.numero'],
                    bairro: enderecoAuto.bairro || dados['endereco.bairro'],
                    cidade: enderecoAuto.cidade || dados['endereco.cidade'],
                    estado: enderecoAuto.estado || dados['endereco.estado'],
                    pais: enderecoAuto.pais || dados['endereco.pais'] || 'Brasil',
                };
            }

            // 🧾 Atribuição de arquivos
            dados.docIdentidade = files?.docIdentidade?.[0]?.filename || '';
            dados.comprovanteEndereco = files?.comprovanteEndereco?.[0]?.filename || '';

            // ✅ Criação do perfil
            const novoPerfil = await Perfil.create(dados);
            res.status(201).json({ idPerfil: novoPerfil._id });

        } catch (err) {
            console.error('Erro ao criar perfil:', err);
            res.status(500).json({ error: 'Erro ao criar perfil' });
        }
    }
);

export default router;

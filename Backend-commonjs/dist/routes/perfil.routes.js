"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Perfil_1 = __importDefault(require("../models/Perfil"));
const consultaCep_1 = require("../utils/consultaCep");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// 🔹 Configuração do multer para salvar os arquivos em /uploads
const uploadDir = path_1.default.join(__dirname, '..', '..', 'uploads');
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// 🔹 GET todos os perfis
router.get('/', async (_, res) => {
    try {
        const perfis = await Perfil_1.default.find();
        res.status(200).json(perfis);
    }
    catch (err) {
        console.error('Erro ao buscar perfis:', err);
        res.status(500).json({ error: 'Erro ao buscar perfis' });
    }
});
// 🔹 POST criar novo perfil com arquivos + preenchimento via CEP
router.post('/', upload.fields([
    { name: 'docIdentidade', maxCount: 1 },
    { name: 'comprovanteEndereco', maxCount: 1 },
]), async (req, res) => {
    try {
        const dados = req.body;
        // 🧾 Tipagem de arquivos
        const files = req.files;
        // 📦 Preenchimento de endereço via CEP
        if (dados.endereco?.cep || dados['endereco.cep']) {
            const cep = dados.endereco?.cep || dados['endereco.cep'];
            const enderecoAuto = await (0, consultaCep_1.buscarEnderecoPorCEP)(cep);
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
        const novoPerfil = await Perfil_1.default.create(dados);
        res.status(201).json({ idPerfil: novoPerfil._id });
    }
    catch (err) {
        console.error('Erro ao criar perfil:', err);
        res.status(500).json({ error: 'Erro ao criar perfil' });
    }
});
exports.default = router;

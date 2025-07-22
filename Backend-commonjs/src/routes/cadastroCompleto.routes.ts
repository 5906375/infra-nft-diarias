import express from 'express';
import { salvarCadastroCompleto } from '../controllers/cadastroCompleto.controller';

const router = express.Router();

// 🔹 POST /api/cadastro-completo
// Salva um perfil (e opcionalmente um imóvel vinculado)
router.post('/cadastro-completo', salvarCadastroCompleto);

export default router;

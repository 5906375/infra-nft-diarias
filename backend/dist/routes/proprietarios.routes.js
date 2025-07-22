import { Router } from 'express';
import { criarProprietario } from '../controllers/proprietario.controller.js';
const router = Router();
router.post('/', criarProprietario);
export default router;

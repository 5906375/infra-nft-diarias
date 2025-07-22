import { Router } from "express";
import { registrarPagamento, listarPagamentos } from "../controllers/pagamentoController.js";

const router = Router();

// POST /api/pagamento → Registra um novo pagamento
router.post("/", registrarPagamento);

// GET /api/pagamento → Lista todos os pagamentos cadastrados
router.get("/", listarPagamentos);

export default router;


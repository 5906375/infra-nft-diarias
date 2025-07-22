"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagamentoController_1 = require("../controllers/pagamentoController");
const router = (0, express_1.Router)();
// POST /api/pagamento → Registra um novo pagamento
router.post("/", pagamentoController_1.registrarPagamento);
// GET /api/pagamento → Lista todos os pagamentos cadastrados
router.get("/", pagamentoController_1.listarPagamentos);
exports.default = router;

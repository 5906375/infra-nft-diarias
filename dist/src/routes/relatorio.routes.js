"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/relatorio.routes.ts
const express_1 = __importDefault(require("express"));
const relatorio_controller_1 = require("../controllers/relatorio.controller");
const router = express_1.default.Router();
router.get("/reservas-por-dia", relatorio_controller_1.getReservasPorDia);
router.get("/reservas-por-mes", relatorio_controller_1.getReservasPorMes);
router.get("/receita-por-imovel", relatorio_controller_1.getReceitaPorImovel);
router.get("/receita-por-dia", relatorio_controller_1.getReceitaPorDia);
exports.default = router;

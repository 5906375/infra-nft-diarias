// src/routes/relatorio.routes.ts
import express from "express";
import { getReservasPorDia, getReservasPorMes, getReceitaPorImovel, getReceitaPorDia, } from "../controllers/relatorio.controller.js";
const router = express.Router();
router.get("/reservas-por-dia", getReservasPorDia);
router.get("/reservas-por-mes", getReservasPorMes);
router.get("/receita-por-imovel", getReceitaPorImovel);
router.get("/receita-por-dia", getReceitaPorDia);
export default router;

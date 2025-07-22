import express from "express";
import { listarImoveisPorPerfil } from "../controllers/imovel.controller.js";
const router = express.Router();
// GET imóveis de um perfil
router.get("/:idPerfil", listarImoveisPorPerfil);
export default router;

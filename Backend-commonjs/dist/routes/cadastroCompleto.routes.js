"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cadastroCompleto_controller_1 = require("../controllers/cadastroCompleto.controller");
const router = express_1.default.Router();
router.post('/cadastro-completo', cadastroCompleto_controller_1.salvarCadastroCompleto);
exports.default = router;

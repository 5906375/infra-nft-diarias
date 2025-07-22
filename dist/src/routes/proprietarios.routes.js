"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proprietario_controller_1 = require("../controllers/proprietario.controller");
const router = (0, express_1.Router)();
router.post('/', proprietario_controller_1.criarProprietario);
exports.default = router;

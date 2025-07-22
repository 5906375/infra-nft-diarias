"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RelatorioSchema = new mongoose_1.Schema({
    nomePropriedade: { type: String, required: true },
    nomeProprietario: { type: String, required: true },
    wallet: { type: String, required: true },
    checkin: [{ type: String, required: true }],
    checkout: [{ type: String, required: true }],
    maxHospedes: { type: Number, required: true },
    minHospedes: { type: Number, required: true },
    finalidade: [{ type: String, required: true }],
    regrasAdicionais: [{ type: String, required: true }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Relatorio", RelatorioSchema);

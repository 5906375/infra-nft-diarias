import { Schema, model } from "mongoose";
const RelatorioSchema = new Schema({
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
export default model("Relatorio", RelatorioSchema);

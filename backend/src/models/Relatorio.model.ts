import { Schema, model, Document } from "mongoose";

export interface IRelatorio extends Document {
    nomePropriedade: string;
    nomeProprietario: string;
    wallet: string;
    checkin: string[];
    checkout: string[];
    maxHospedes: number;
    minHospedes: number;
    finalidade: string[];
    regrasAdicionais: string[];
}

const RelatorioSchema = new Schema<IRelatorio>(
    {
        nomePropriedade: { type: String, required: true },
        nomeProprietario: { type: String, required: true },
        wallet: { type: String, required: true },
        checkin: [{ type: String, required: true }],
        checkout: [{ type: String, required: true }],
        maxHospedes: { type: Number, required: true },
        minHospedes: { type: Number, required: true },
        finalidade: [{ type: String, required: true }],
        regrasAdicionais: [{ type: String, required: true }],
    },
    { timestamps: true }
);

export default model<IRelatorio>("Relatorio", RelatorioSchema);


import { Schema, model, Document } from "mongoose";

export interface IPagamento extends Document {
    propriedadeId: string;
    dataEntrada: Date;
    dataSaida: Date;
    dataPagamento: Date;               // novo campo
    metodoPagamento: "pix" | "cripto";
    valor: number;
    status: "pendente" | "confirmado";
    idPagamento: string;
    walletPagador?: string;
}

const pagamentoSchema = new Schema<IPagamento>(
    {
        propriedadeId: { type: String, required: true },
        dataEntrada: { type: Date, required: true },
        dataSaida: { type: Date, required: true },
        dataPagamento: { type: Date, required: true },      // novo campo
        metodoPagamento: { type: String, enum: ["pix", "cripto"], required: true },
        valor: { type: Number, required: true },
        status: { type: String, enum: ["pendente", "confirmado"], default: "pendente" },
        idPagamento: { type: String, required: true },
        walletPagador: { type: String },
    },
    { timestamps: true }
);

export default model<IPagamento>("Pagamento", pagamentoSchema);


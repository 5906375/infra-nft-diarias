import mongoose, { Schema, Document } from 'mongoose';

export interface INFT extends Document {
    nome: string;
    descricao: string;
    inicio: string;
    fim: string;
    idPerfil: string;
    propriedadeId: string;
    documento?: string;
    finalidade?: string;
    hospedes?: number;
    link?: string;
    exclusivo?: boolean;
    imagens: string[]; // URLs IPFS das imagens
    tokenURI: string;  // IPFS metadata JSON
    txHash: string;    // hash da transação blockchain
    criadoEm: Date;
}

const NFTSchema = new Schema<INFT>({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    inicio: { type: String, required: true },
    fim: { type: String, required: true },
    idPerfil: { type: String, required: true },
    propriedadeId: { type: String, required: true },
    documento: { type: String },
    finalidade: { type: String },
    hospedes: { type: Number },
    link: { type: String },
    exclusivo: { type: Boolean, default: false },
    imagens: [{ type: String, required: true }],
    tokenURI: { type: String, required: true },
    txHash: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model<INFT>('NFT', NFTSchema);

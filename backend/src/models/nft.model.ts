import { Schema, model, Document } from 'mongoose';

export interface INFT extends Document {
    imovelId: string;
    tokenId: string;
    wallet: string;
    dataInicio: Date;
    dataFim: Date;
    metadataURI: string;
}

const NFTSchema = new Schema<INFT>({
    imovelId: { type: String, required: true },
    tokenId: { type: String, required: true },
    wallet: { type: String, required: true },
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true },
    metadataURI: { type: String, required: true },
}, { timestamps: true });

export default model<INFT>('NFT', NFTSchema);

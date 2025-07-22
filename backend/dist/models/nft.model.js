import { Schema, model } from 'mongoose';
const NFTSchema = new Schema({
    imovelId: { type: String, required: true },
    tokenId: { type: String, required: true },
    wallet: { type: String, required: true },
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true },
    metadataURI: { type: String, required: true },
}, { timestamps: true });
export default model('NFT', NFTSchema);

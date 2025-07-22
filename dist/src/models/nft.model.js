"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NFTSchema = new mongoose_1.Schema({
    imovelId: { type: String, required: true },
    tokenId: { type: String, required: true },
    wallet: { type: String, required: true },
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true },
    metadataURI: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('NFT', NFTSchema);

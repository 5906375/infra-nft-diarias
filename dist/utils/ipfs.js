"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToIPFS = uploadToIPFS;
// backend/src/utils/ipfs.ts
const ipfs_http_client_1 = require("ipfs-http-client");
const ipfs = (0, ipfs_http_client_1.create)({
    url: "http://localhost:5001/api/v0", // Porta do IPFS local
});
/**
 * Faz upload do buffer (arquivo) e retorna o tokenURI (URL pública)
 */
async function uploadToIPFS(fileBuffer) {
    const result = await ipfs.add(fileBuffer);
    const cid = result.path;
    const tokenURI = `https://ipfs.io/ipfs/${cid}`;
    return tokenURI;
}

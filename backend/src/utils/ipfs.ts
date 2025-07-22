// backend/src/utils/ipfs.ts
import { create } from "ipfs-http-client";
import { fetch as undiciFetch } from "undici";


// Porta do IPFS local
(globalThis as any).fetch = (url: any, options: any) => {
    return undiciFetch(url, {
        ...options,
        duplex: "half" as any,
    });
};

// 🚀 Cria cliente IPFS com fetch corrigido
const ipfs = create({
    url: "http://localhost:5001/api/v0",
});
  
  

/** Upload de arquivo binário (imagem, vídeo, etc) */
export async function uploadToIPFS(fileBuffer: Buffer): Promise<string> {
    const result = await ipfs.add(fileBuffer);
    return `https://ipfs.io/ipfs/${result.cid.toString()}`;
}

/** Upload de objeto JSON (metadados NFT) */
export async function uploadJSONToIPFS(data: object): Promise<string> {
    const json = JSON.stringify(data);
    const result = await ipfs.add(json);
    return `https://ipfs.io/ipfs/${result.cid.toString()}`;
}

/**
 * Faz upload do buffer (arquivo) e retorna o tokenURI (URL pública)
 */
//export async function uploadToIPFS(fileBuffer: Buffer): Promise<string> {
//    const result = await ipfs.add(fileBuffer);
//    const tokenURI = `https://ipfs.io/ipfs/${result.cid.toString()}`;
//    return tokenURI;
//}


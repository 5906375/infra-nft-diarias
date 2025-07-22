import { ethers } from "ethers";
import dotenv from "dotenv";
import NFTModel from "../models/nft.model.js";
import { uploadToIPFS } from "../utils/ipfs.js";
//import contratoAbi from "../abi/NFTDiarias.json"; // ✅ direto do JSON
import NFTDiarias from "../abi/NFTDiarias.json" assert { type: "json" };
dotenv.config();
export const mintNFT = async (req, res) => {
    try {
        const { nome, descricao, inicio, fim, proposito, hospedes, link, exclusivo, propriedadeId, } = req.body;
        const midia = req.file;
        if (!midia) {
            return res.status(400).json({ erro: "Arquivo de mídia não enviado." });
        }
        if (!process.env.RPC_URL || !process.env.PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
            return res.status(500).json({ erro: "Variáveis de ambiente não definidas corretamente." });
        }
        // ⬆️ Upload da mídia para o IPFS
        const tokenURI = await uploadToIPFS(midia.buffer);
        // 🔗 Conectar carteira e contrato
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, NFTDiarias.abi, // ✅ pegando direto do import
        wallet);
        // 🎯 Mint NFT
        const tx = await contract.mintNFT(wallet.address, tokenURI);
        await tx.wait();
        // 💾 Salvar no MongoDB
        const novoNFT = new NFTModel({
            imovelId: propriedadeId,
            tokenId: tx.hash,
            wallet: wallet.address,
            dataInicio: new Date(inicio),
            dataFim: new Date(fim),
            metadataURI: tokenURI
        });
        await novoNFT.save();
        return res.status(201).json({
            msg: "✅ NFT criada na blockchain e salva no banco!",
            txHash: tx.hash,
            nft: novoNFT
        });
    }
    catch (err) {
        console.error("Erro ao mintar NFT:", err);
        return res.status(500).json({ erro: "❌ Erro ao criar NFT" });
    }
};

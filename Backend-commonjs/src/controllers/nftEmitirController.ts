import { Request, Response } from "express";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import NFT from "../models/NFT";

dotenv.config();

const contractJson = require("../contracts/NFTDiarias.json");
const abi = contractJson.abi;
const ipfsClient = require("ipfs-http-client");

// IPFS v44 ou anterior
const ipfs = ipfsClient.create({
    url: process.env.IPFS_API_URL || "http://localhost:5001",
});

export const emitirNFT = async (req: Request, res: Response) => {
    try {
        const { nome, wallet, propriedadeId, descricao } = req.body;
        
        const imagens = req.files as Express.Multer.File[];

        if (!imagens || imagens.length === 0) {
            return res.status(400).json({ error: "Nenhuma imagem enviada" });
        }

        const imageURLs: string[] = [];

        for (const img of imagens) {
            const buffer = img.buffer;
            const result = await ipfs.add(buffer);
            const hash = result.path;
            const imageURL = `${process.env.IPFS_GATEWAY_URL || "https://ipfs.io/ipfs/"}${hash}`;
            imageURLs.push(imageURL);
        }

        // 2. Criar metadados NFT
        
        const metadata = {
            name: `NFT Diária - ${nome}`,
            description: descricao || "NFT de hospedagem emitido via NFTDiárias",
            image: imageURLs[0], // primeira imagem
            propriedadeId,
            owner: wallet,
        };

        const metadataResult = await ipfs.add(JSON.stringify(metadata));
        const tokenURI = `${process.env.IPFS_GATEWAY_URL}${metadataResult.path}`;

        // 3. Interação com contrato inteligente
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        const walletSigner = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, walletSigner);

        const tx = await contract.mintNFT(wallet, tokenURI);
        const receipt = await tx.wait();

        // 4. Salvar no MongoDB
        const novoNFT = new NFT({
            nome,
            descricao,
            inicio: req.body.inicio,
            fim: req.body.fim,
            idPerfil: req.body.idPerfil,
            propriedadeId,
            documento: req.body.documento,
            finalidade: req.body.finalidade,
            hospedes: req.body.hospedes,
            link: req.body.link,
            exclusivo: req.body.exclusivo === "true",
            imagens: imageURLs,
            tokenURI,
            txHash: receipt.transactionHash,
        });

        await novoNFT.save();

        // 5. Resposta
        return res.status(201).json({
            message: "✅ NFT emitido e salvo com sucesso!",
            txHash: receipt.transactionHash,
            tokenURI,
            imagens: imageURLs,
            nftId: novoNFT._id,
        });
    } catch (error) {
        console.error("Erro ao emitir NFT:", error);
        return res.status(500).json({ error: "Erro interno ao emitir NFT" });
    }
};

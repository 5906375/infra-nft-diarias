// backend-commonjs/src/routes/nft.routes.ts
import { Router } from 'express';
import multer from 'multer';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import NFT from '../models/NFT';
import { FileFilterCallback } from "multer";
const PDFDocument = require("pdfkit");

const contractJson = require("../contracts/NFTDiarias.json");
dotenv.config();

// 🚀 Configuração de ambiente segura
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const IPFS_API_URL = process.env.IPFS_API_URL || "http://localhost:5001";
const IPFS_GATEWAY_URL = process.env.IPFS_GATEWAY_URL || "https://ipfs.io/ipfs/";

if (!CONTRACT_ADDRESS || !PRIVATE_KEY || !RPC_URL) {
    throw new Error("Variáveis de ambiente obrigatórias não definidas");
}

const router = Router();

// 🖼️ Upload com validação para imagens
const upload = multer({
  storage: multer.memoryStorage(),
    fileFilter: (req, file, cb: FileFilterCallback) => {
    if (!file.mimetype.startsWith("image/")) {
        console.error("Upload recusado: tipo de arquivo inválido.");
        return cb(null, false);

    }
    cb(null, true);
  },
});


// 🔗 IPFS
const ipfsHttpClient = require("ipfs-http-client");
const ipfs = ipfsHttpClient({ url: IPFS_API_URL });

// 🃏 Blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contrato = new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, wallet);

// 🚀 Emitir NFT com metadados e imagens via IPFS
router.post('/nfts/emitir', upload.array('imagens', 10), async (req, res) => {
    try {
        const { nome, descricao, inicio, fim, idPropriedade, idPerfil, documento, link, exclusivo, wallet: destinatario } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada' });
        }

        const imagens: string[] = [];
        for (const file of req.files as Express.Multer.File[]) {
            const result = await ipfs.add(file.buffer);
            imagens.push(`${IPFS_GATEWAY_URL}${result.path}`);
        }

        const metadata = {
            type: "NFTDiaria",
            nome,
            descricao,
            periodo: { inicio, fim },
            idPropriedade,
            idPerfil,
            documento,
            imagens,
            link,
            exclusivo,
            timestamp: new Date().toISOString(),
        };

        const metaResult = await ipfs.add(JSON.stringify(metadata));
        const tokenURI = `${IPFS_GATEWAY_URL}${metaResult.path}`;

        const tx = await contrato.mintNFT(destinatario, tokenURI);
        const receipt = await tx.wait();

        const novoNFT = new NFT({
            nome,
            descricao,
            inicio,
            fim,
            idPropriedade,
            idPerfil,
            documento,
            imagens,
            link,
            exclusivo,
            tokenURI,
            txHash: receipt.transactionHash,
            createdAt: new Date(),
        });

        await novoNFT.save();

        res.status(201).json({
            msg: '✅ NFT emitido com sucesso!',
            tokenURI,
            txHash: receipt.transactionHash,
            nft: novoNFT,
        });
    } catch (err) {
        console.error('❌ Erro ao emitir NFT:', err);
        res.status(500).json({ error: 'Erro ao emitir NFT' });
    }
});

// 🔍 Consultar NFTs por wallet, idPerfil ou nome
router.get("/consultar", async (req, res) => {
    const { wallet, idPerfil, nome } = req.query;
    const filtro: any = {};

    if (wallet) filtro["wallet"] = wallet;
    if (idPerfil) filtro["idPerfil"] = idPerfil;
    if (nome) filtro["nome"] = new RegExp(String(nome), "i");

    try {
        const resultados = await NFT.find(filtro).sort({ createdAt: -1 });
        res.json(resultados);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar NFTs" });
    }
});

// 📄 Gerar recibo PDF do NFT
router.get("/:id/recibo-pdf", async (req, res) => {
    try {
        const nft = await NFT.findById(req.params.id);
        if (!nft) return res.status(404).json({ error: "NFT não encontrado" });

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `inline; filename=recibo_nft_${nft._id}.pdf`
        );

        doc.fontSize(20).text("📄 Recibo NFT Diárias", { align: "center" }).moveDown();
        doc.fontSize(12).text(`Nome: ${nft.nome}`);
        doc.text(`Descrição: ${nft.descricao}`);
        doc.text(`ID Propriedade: ${nft?.propriedadeId ?? 'Não informado'}`);
        doc.text(`Data: ${nft.inicio} a ${nft.fim}`);
        doc.text(`TokenURI: ${nft.tokenURI}`);
        doc.text(`TxHash: ${nft.txHash}`);
        doc.end();
        doc.pipe(res);
    } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        res.status(500).json({ error: "Erro ao gerar PDF" });
    }
});

export default router;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintNFT = void 0;
const ethers_1 = require("ethers");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nft_model_1 = __importDefault(require("../models/nft.model"));
const ipfs_1 = require("../utils/ipfs");
const mintNFT = async (req, res) => {
    try {
        const { nome, descricao, inicio, fim, proposito, hospedes, link, exclusivo, propriedadeId, } = req.body;
        const midia = req.file;
        if (!midia) {
            return res.status(400).json({ erro: "Arquivo de mídia não enviado." });
        }
        if (!process.env.RPC_URL || !process.env.PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
            return res.status(500).json({ erro: "Variáveis de ambiente não definidas corretamente." });
        }
        // 🖼️ URL pública do metadata
        //const tokenURI = `https://seu-servidor.com/uploads/${midia.filename}`;
        // 🖼️ Upload da mídia para o IPFS
        const tokenURI = await (0, ipfs_1.uploadToIPFS)(midia.buffer);
        // 🧠 Conectar carteira + contrato
        const provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_URL);
        const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const abiPath = path.join(__dirname, "../../artifacts/contracts/NFTDiarias.sol/NFTDiarias.json");
        const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        const contract = new ethers_1.ethers.Contract(process.env.CONTRACT_ADDRESS, contractJson.abi, wallet);
        // 🛠️ Mint NFT
        const tx = await contract.mintNFT(wallet.address, tokenURI);
        await tx.wait();
        // 🗃️ Salvar no MongoDB
        const novoNFT = new nft_model_1.default({
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
exports.mintNFT = mintNFT;

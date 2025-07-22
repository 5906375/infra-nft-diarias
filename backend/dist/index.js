// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import nftRoutes from "./routes/nft";
import relatorioRoutes from "./routes/relatorio.routes";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/nft", nftRoutes);
app.use("/api/relatorios", relatorioRoutes);
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

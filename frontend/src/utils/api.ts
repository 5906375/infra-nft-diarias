// frontend/src/utils/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export const apiIA = axios.create({
    baseURL: "http://localhost:5000", // backend_ia
});

// --- Perfis ---
export const criarPerfil = (data: FormData) =>
    api.post("/perfis", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const listarPerfis = () => api.get("/perfis");

// --- Imóveis ---
export const criarImovel = (data: any) => api.post("/imoveis", data);
export const listarImoveis = () => api.get("/imoveis");

// --- NFTs ---
export const criarNFT = (data: any) => api.post("/nfts", data);
export const consultarNFTPorId = (id: string) => api.get(`/nfts/${id}`);

// --- IA ---
export const getExplicacao = (contexto: string) =>
    apiIA.get(`/tutor/${contexto}`);

export default api;

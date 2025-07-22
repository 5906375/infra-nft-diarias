// backend_ia/src/routes/tutor.ts
import express from 'express';
const router = express.Router();

router.get('/explicacao/perfil-id', (req, res) => {
    const mensagem = `Seu identificador de perfil foi criado. Ele serve para conectar sua conta aos imóveis, reservas e NFTs de forma segura, tanto na Web2 quanto na Web3.`;
    res.json({ texto: mensagem });
});

# app / routes / tutor.py
from fastapi import APIRouter

router = APIRouter()

explicacoes = {
    "perfil-id": "O identificador de perfil é usado para vincular seus imóveis e NFTs.",
    "propriedade": "Cada imóvel vinculado ao seu perfil pode ter NFTs de diárias emitidos.",
    "regras": "As regras definem como a hospedagem será utilizada: check-in, hóspedes, etc.",
}

@router.get("/{contexto}")
def explicar(contexto: str):
texto = explicacoes.get(contexto, "Explicação não encontrada.")
return { "texto": texto }

export default router;
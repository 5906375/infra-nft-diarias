// src/components/ConectarCarteira.tsx
import { useState } from "react";
import { ethers } from "ethers";

export default function ConectarCarteira() {
    const [endereco, setEndereco] = useState("");
    const [autenticado, setAutenticado] = useState(false);

    const conectar = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask não encontrada");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            const mensagem = `Assine para autenticar com NFTDiárias - ${new Date().toISOString()}`;
            const assinatura = await signer.signMessage(mensagem);

            const resposta = await fetch("http://localhost:4000/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    address,
                    message: mensagem,
                    signature: assinatura,
                }),
            });

            const dados = await resposta.json();
            console.log("Resposta da verificação:", dados);

            if (resposta.ok) {
                setEndereco(address);
                setAutenticado(true);
                localStorage.setItem("wallet", address);
                alert("✅ Autenticado com sucesso!");
            } else {
                alert("❌ Assinatura inválida");
            }
        } catch (erro) {
            console.error("Erro na conexão com a carteira:", erro);
            alert("❌ Erro ao conectar a carteira");
        }
    };
    
    return (
        <div className="text-center my-4">
            {autenticado ? (
                <p className="text-green-700 font-semibold">
                    ✅ Carteira conectada: {endereco.slice(0, 6)}...{endereco.slice(-4)}
                </p>
            ) : (
                <button
                    onClick={conectar}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    🔐 Conectar Carteira
                </button>
            )}
        </div>
    );
}

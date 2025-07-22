// src/pages/Pagamento.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { motion } from "framer-motion";
import LayoutPadrao from "@/components/LayoutPadrao";

export default function Pagamento() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imovel, setImovel] = useState<any>(null);
    const [formData, setFormData] = useState({
        entrada: '',
        saida: '',
        metodo: '',
        rede: '',
        moeda: '',
    });

    useEffect(() => {
        fetch(`http://localhost:4000/api/imoveis/${id}`)
            .then((res) => res.json())
            .then((data) => setImovel(data))
            .catch((err) => console.error('Erro ao buscar imóvel', err));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let walletPagador = "";

            if (formData.metodo === "Cripto") {
                if (!window.ethereum) {
                    alert("MetaMask não encontrada.");
                    return;
                }

                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                walletPagador = await signer.getAddress();

                const tx = await signer.sendTransaction({
                    to: "0x000000000000000000000000000000000000dead",
                    value: ethers.parseEther("0.01"),
                });

                console.log("⛓️ Transação enviada:", tx.hash);
                await tx.wait();
                console.log("✅ Transação confirmada!");
            }

            const dias = Math.ceil(
                (new Date(formData.saida).getTime() - new Date(formData.entrada).getTime()) / (1000 * 60 * 60 * 24)
            );
            const valorTotal = dias * (imovel?.valorDiaria || 0);

            const payload = {
                propriedadeId: id,
                dataEntrada: formData.entrada,
                dataSaida: formData.saida,
                metodoPagamento: formData.metodo.toLowerCase(),
                valor: valorTotal,
                walletPagador,
            };

            const res = await fetch("http://localhost:4000/api/pagamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.erro || "Erro no pagamento");

            alert(data.msg || "Pagamento realizado com sucesso!");
            navigate("/");

        } catch (error) {
            console.error("❌ Erro:", error);
            alert("Erro ao processar o pagamento.");
        }
    };

    if (!imovel) return <p className="p-4">Carregando dados do imóvel...</p>;

    return (
        <LayoutPadrao>
            <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-purple-700">Pagamento</h1>

                    <div className="bg-gray-100 p-4 rounded shadow mb-6">
                        <h2 className="text-lg font-semibold">{imovel.nome}</h2>
                        <p className="text-sm text-gray-600">{imovel.endereco}</p>
                        <p className="text-sm mt-2">
                            Valor por diária: <strong>R$ {imovel.valorDiaria}</strong>
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Data de Entrada</label>
                        <input
                            type="date"
                            className="border p-2 w-full rounded"
                            value={formData.entrada}
                            onChange={(e) => setFormData({ ...formData, entrada: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1">Data de Saída</label>
                        <input
                            type="date"
                            className="border p-2 w-full rounded"
                            value={formData.saida}
                            onChange={(e) => setFormData({ ...formData, saida: e.target.value })}
                        />
                    </div>

                    {formData.entrada && formData.saida && (
                        <p className="text-green-700 font-semibold mb-4">
                            Valor total: R$ {(() => {
                                const dias = Math.ceil(
                                    (new Date(formData.saida).getTime() - new Date(formData.entrada).getTime()) / (1000 * 60 * 60 * 24)
                                );
                                return dias * (imovel?.valorDiaria || 0);
                            })()}
                        </p>
                    )}

                    <div className="mb-6">
                        <label className="block font-medium mb-2">Método de Pagamento</label>
                        <div className="flex gap-4">
                            {["Cripto", "PIX", "Cartão"].map((metodo) => (
                                <label key={metodo} className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="metodo"
                                        value={metodo}
                                        checked={formData.metodo === metodo}
                                        onChange={(e) => setFormData({ ...formData, metodo: e.target.value })}
                                    />
                                    {metodo}
                                </label>
                            ))}
                        </div>
                    </div>

                    {formData.metodo === "Cripto" && (
                        <div className="mb-6">
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Escolha sua rede</label>
                                <div className="flex gap-3 flex-wrap">
                                    {["Ethereum", "Polygon", "BNB Chain"].map((rede) => (
                                        <button
                                            key={rede}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rede })}
                                            className={`px-4 py-2 rounded border ${formData.rede === rede ? "bg-purple-600 text-white" : "bg-white"}`}
                                        >
                                            {rede}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Escolha sua Moeda</label>
                                <div className="flex gap-3 flex-wrap">
                                    {["USDC", "USDT", "DAI", "ETH"].map((moeda) => (
                                        <button
                                            key={moeda}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, moeda })}
                                            className={`px-4 py-2 rounded border ${formData.moeda === moeda ? "bg-purple-600 text-white" : "bg-white"}`}
                                        >
                                            {moeda}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                            Confirmar Pagamento
                        </button>
                    </div>
                </form>
            </motion.div>
        </LayoutPadrao>
    );
}

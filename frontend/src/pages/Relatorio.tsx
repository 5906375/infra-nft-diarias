// src/pages/Relatorio.tsx
import { useEffect, useState } from "react";
import LayoutPadrao from "@/components/LayoutPadrao";

interface RelatorioItem {
    nomePropriedade: string;
    nome: string;
    checkin: string[];
    checkout: string[];
    maxHospedes: number;
}

export default function Relatorio() {
    const [relatorios, setRelatorios] = useState<RelatorioItem[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/relatorios")
            .then((res) => res.json())
            .then(setRelatorios)
            .catch(console.error);
    }, []);

    return (
        <LayoutPadrao>
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-purple-700">📊 Relatórios de Imóveis</h1>

                {relatorios.length === 0 ? (
                    <p className="text-sm text-gray-500">Nenhum dado encontrado.</p>
                ) : (
                    <div className="overflow-x-auto rounded shadow border border-gray-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3 border">🏠 Propriedade</th>
                                    <th className="p-3 border">👤 Proprietário</th>
                                    <th className="p-3 border">🟢 Check-in</th>
                                    <th className="p-3 border">🔴 Check-out</th>
                                    <th className="p-3 border">👥 Máx. Hóspedes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relatorios.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-3 border">{item.nomePropriedade}</td>
                                        <td className="p-3 border">{item.nome}</td>
                                        <td className="p-3 border">{item.checkin?.join(", ")}</td>
                                        <td className="p-3 border">{item.checkout?.join(", ")}</td>
                                        <td className="p-3 border">{item.maxHospedes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </LayoutPadrao>
    );
}

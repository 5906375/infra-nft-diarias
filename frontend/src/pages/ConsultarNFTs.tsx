import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function ConsultarNFTs() {
    const [filtro, setFiltro] = useState({ campo: "wallet", valor: "" });
    const [nfts, setNfts] = useState<any[]>([]);

    const buscarNFTs = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/nfts/consultar`, {
                params: { [filtro.campo]: filtro.valor },
            });
            setNfts(res.data);
        } catch (err) {
            toast.error("Erro ao buscar NFTs");
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold text-purple-700">Consultar NFTs Emitidos</h1>

            <div className="flex gap-4">
                <select
                    value={filtro.campo}
                    onChange={(e) => setFiltro((f) => ({ ...f, campo: e.target.value }))}
                    className="border p-2 rounded"
                >
                    <option value="wallet">Por Wallet</option>
                    <option value="idPerfil">Por ID do Proprietário</option>
                    <option value="nome">Por Nome</option>
                </select>

                <input
                    type="text"
                    value={filtro.valor}
                    onChange={(e) => setFiltro((f) => ({ ...f, valor: e.target.value }))}
                    placeholder="Valor de busca"
                    className="border p-2 rounded flex-1"
                />

                <button onClick={buscarNFTs} className="bg-purple-700 text-white px-4 py-2 rounded">
                    Buscar
                </button>
            </div>

            {nfts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {nfts.map((nft, idx) => (
                        <div key={idx} className="border p-4 rounded shadow space-y-2">
                            <h2 className="font-bold">{nft.nome}</h2>
                            <p>{nft.descricao}</p>
                            <div className="flex gap-2 overflow-x-auto">
                                {nft.imagens?.map((url: string, i: number) => (
                                    <img key={i} src={url} alt={`img-${i}`} className="h-24 rounded" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-600">TokenURI: <a href={nft.tokenURI} target="_blank">{nft.tokenURI}</a></p>
                            <p className="text-sm text-gray-500">Tx: {nft.txHash}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

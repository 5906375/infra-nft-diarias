import { useState } from "react";
import LayoutPadrao from "@/components/LayoutPadrao";
import { toast } from "sonner";
import axios from "axios";

export default function EmitirNFTDiarias() {
    const [form, setForm] = useState({
        idProprietario: "",
        documento: "",
        idPropriedade: "",
        nome: "",
        inicio: "",
        fim: "",
        finalidade: "",
        link: "",
        exclusivo: "",
    });

    const [imagens, setImagens] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).slice(0, 10);
        setImagens(files);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.idPropriedade || !form.idProprietario || !form.documento) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        try {
            const data = new FormData();

            // Renomeando campos para o backend
            data.append("wallet", form.documento);
            data.append("propriedadeId", form.idPropriedade);
            data.append("idPerfil", form.idProprietario);

            // Enviando os demais campos (exceto os já tratados)
            Object.entries(form).forEach(([key, value]) => {
                if (!["documento", "idPropriedade", "idProprietario"].includes(key)) {
                    data.append(key, value);
                }
            });

            imagens.forEach((img) => data.append("imagens", img));

            const res = await axios.post("http://localhost:4000/api/nfts/emitir", data);

            toast.success("✅ NFT emitido com sucesso!");
            console.log(res.data);
        } catch (err: any) {
            toast.error("Erro ao emitir NFT");
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <LayoutPadrao>
            <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow space-y-6">
                <h1 className="text-2xl font-bold text-purple-700">Emitir NFT Diárias</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="idProprietario"
                        placeholder="ID do Proprietário ou Nome Completo"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="documento"
                        placeholder="Documento (RG, CPF ou Wallet)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="idPropriedade"
                        placeholder="ID da Propriedade"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="nome"
                        placeholder="Nome do NFT"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="inicio"
                            className="flex-1 border p-2 rounded"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="fim"
                            className="flex-1 border p-2 rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <textarea
                        name="finalidade"
                        placeholder="Finalidade / Descrição"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="link"
                        placeholder="Link Externo (opcional)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="exclusivo"
                        placeholder="Conteúdo Exclusivo (opcional)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <label className="block">
                        <span className="text-sm text-gray-700">Upload de imagens (máx. 10)</span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImagemChange}
                            className="mt-1 block w-full text-sm"
                        />
                    </label>

                    {imagens.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {imagens.map((img, i) => (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(img)}
                                    alt={`img-${i}`}
                                    className="h-24 w-full object-cover rounded"
                                />
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
                    >
                        Emitir NFT
                    </button>
                </form>
            </div>
        </LayoutPadrao>
    );
}

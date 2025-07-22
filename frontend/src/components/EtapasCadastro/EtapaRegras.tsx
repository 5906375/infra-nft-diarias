// src/components/EtapasCadastro/EtapaRegras.tsx
import React from "react";
import { useCadastroContext } from "@/context/CadastroContext";

export default function EtapaRegras() {
    const { formData, setField } = useCadastroContext();

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">📜 Regras da Hospedagem</h2>

            <label className="block font-medium">Finalidade da hospedagem:</label>
            <select
                name="finalidade"
                multiple
                value={formData.finalidade}
                onChange={(e) =>
                    setField(
                        "finalidade",
                        Array.from(e.target.selectedOptions).map((opt) => opt.value)
                    )
                }
                className="border p-2 w-full rounded h-24"
            >
                <option value="Turismo">Turismo</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Temporada">Temporada</option>
            </select>

            <div className="flex gap-4">
                <input
                    type="number"
                    name="maxHospedes"
                    placeholder="Máx. hóspedes"
                    value={formData.maxHospedes}
                    onChange={(e) => setField("maxHospedes", Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    name="minHospedes"
                    placeholder="Mín. hóspedes"
                    value={formData.minHospedes}
                    onChange={(e) => setField("minHospedes", Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
            </div>

            <label className="block font-medium">Regras adicionais:</label>
            <div className="flex flex-wrap gap-2">
                {["Proibido fumar", "Sem festas", "Pet permitido"].map((regra) => (
                    <label key={regra} className="inline-flex items-center gap-1">
                        <input
                            type="checkbox"
                            value={regra}
                            checked={formData.regrasAdicionais?.includes(regra)}
                            onChange={(e) => {
                                const { checked, value } = e.target;
                                const regras = formData.regrasAdicionais || [];
                                const atualizadas = checked
                                    ? [...regras, value]
                                    : regras.filter((r: string) => r !== value);
                                setField("regrasAdicionais", atualizadas);
                            }}
                        />
                        {regra}
                    </label>
                ))}
            </div>

            <textarea
                name="outrasRegras"
                placeholder="Outras regras relevantes"
                value={formData.outrasRegras}
                onChange={(e) => setField("outrasRegras", e.target.value)}
                className="border p-2 w-full rounded"
            />
        </div>
    );
}

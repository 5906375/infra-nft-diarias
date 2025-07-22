// EtapaPropriedade.tsx — acessível, validado e compatível com assistente
import React, { useState } from "react";
import { useCadastroContext } from "@/context/CadastroContext";

interface EtapaPropriedadeProps {
    formData: Record<string, any>;
    handleChange: (e: React.ChangeEvent<any>) => void;
    setEtapaAtual: (etapa: number) => void;
}

export default function EtapaPropriedade({
    formData,
    handleChange,
    setEtapaAtual,
}: EtapaPropriedadeProps) {
    const { etapa: etapaAtual } = useCadastroContext();
    const [errors, setErrors] = useState<Record<string, string>>(() => ({}));

    const validateField = (name: string, value: string) => {
        const newErrors: Record<string, string> = {};
        if (!value) newErrors[name] = "Este campo é obrigatório.";
        if (name === "emailPropriedade" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors[name] = "Email inválido.";
        }
        setErrors((prev) => ({ ...prev, ...newErrors }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        validateField(e.target.name, e.target.value);
    };

    return (
        <div className="space-y-4" aria-live="polite">
            <h2 className="text-lg font-bold">🏠 Propriedade</h2>

            <div>
                <label htmlFor="nomePropriedade" className="block text-sm font-medium">
                    Nome da Propriedade *
                </label>
                <input
                    id="nomePropriedade"
                    name="nomePropriedade"
                    placeholder="Ex: Casa na Serra"
                    value={formData.nomePropriedade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.nomePropriedade}
                    aria-describedby="erro-nomePropriedade"
                    className="border p-2 w-full rounded"
                    required
                />
                {errors.nomePropriedade && (
                    <p id="erro-nomePropriedade" className="text-red-600 text-sm">
                        {errors.nomePropriedade}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="emailPropriedade" className="block text-sm font-medium">
                    Email para contato *
                </label>
                <input
                    id="emailPropriedade"
                    type="email"
                    name="emailPropriedade"
                    placeholder="exemplo@email.com"
                    value={formData.emailPropriedade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.emailPropriedade}
                    aria-describedby="erro-emailPropriedade"
                    className="border p-2 w-full rounded"
                    required
                />
                {errors.emailPropriedade && (
                    <p id="erro-emailPropriedade" className="text-red-600 text-sm">
                        {errors.emailPropriedade}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="docCompraVenda" className="block text-sm font-medium">
                    Documento de Compra e Venda *
                </label>
                <input
                    id="docCompraVenda"
                    name="docCompraVenda"
                    placeholder="Número ou link do documento"
                    value={formData.docCompraVenda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.docCompraVenda}
                    aria-describedby="erro-docCompraVenda"
                    className="border p-2 w-full rounded"
                    required
                />
                {errors.docCompraVenda && (
                    <p id="erro-docCompraVenda" className="text-red-600 text-sm">
                        {errors.docCompraVenda}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="registroImovel" className="block text-sm font-medium">
                    Registro do Imóvel *
                </label>
                <input
                    id="registroImovel"
                    name="registroImovel"
                    placeholder="123456789"
                    value={formData.registroImovel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.registroImovel}
                    aria-describedby="erro-registroImovel aviso-lgpd"
                    className="border p-2 w-full rounded"
                    required
                />
                {errors.registroImovel && (
                    <p id="erro-registroImovel" className="text-red-600 text-sm">
                        {errors.registroImovel}
                    </p>
                )}
                <p id="aviso-lgpd" className="text-xs text-gray-500 mt-1">
                    🔒 Este dado será usado apenas para autenticar a posse do imóvel, conforme a LGPD.
                </p>
            </div>
        </div>
    );
}

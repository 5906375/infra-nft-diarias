import { useState, useEffect } from "react";
import * as CepApi from "../utils/CepApi"; // Importa tudo como objeto

console.log("CepApi:", CepApi);

type Props = {
    value: string;
    onChange: (cep: string) => void;
    onEnderecoEncontrado?: (endereco: CepApi.EnderecoCep) => void;
};

export default function CepInput({ value, onChange, onEnderecoEncontrado }: Props) {
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const cepLimpo = value.replace(/\D/g, "");
        if (cepLimpo.length === 8) {
            CepApi.buscarEnderecoPorCep(cepLimpo).then((endereco) => {
                if (endereco) {
                    setErro(null);
                    onEnderecoEncontrado?.(endereco);
                } else {
                    setErro("CEP inválido ou não encontrado.");
                }
            });
        }
    }, [value]);

    return (
        <div className="mb-2">
            <input
                type="text"
                name="cep"
                placeholder="Digite o CEP"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`border p-2 w-full rounded ${erro ? "border-red-500" : ""}`}
                maxLength={9}
            />
            {erro && <p className="text-xs text-red-600 mt-1">{erro}</p>}
        </div>
    );
}

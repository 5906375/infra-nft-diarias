// src/components/EtapasCadastro/EtapaFinal.tsx
import React from "react";
import { useCadastroContext } from "@/context/CadastroContext";
import QRCode from "react-qr-code";

export default function EtapaFinal() {
    const { formData } = useCadastroContext();

    return (
        <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-green-700">🎉 Cadastro Finalizado!</h2>
            <p className="text-gray-700">O NFT da diária foi criado com sucesso.</p>

            <div className="bg-white p-4 rounded shadow inline-block">
                <QRCode value={`https://nftdiarias.io/nft/${formData.idPropriedade}`} size={128} />
                <p className="text-xs mt-2 text-gray-600">Escaneie para visualizar o NFT</p>
            </div>

            <div className="mt-6 space-y-2">
                <p><strong>ID Perfil:</strong> {formData.idPerfil}</p>
                <p><strong>ID Propriedade:</strong> {formData.idPropriedade}</p>
                <p><strong>Finalidade:</strong> {formData.finalidade.join(", ")}</p>
                <p><strong>Período:</strong> {formData.inicio} até {formData.fim}</p>
            </div>

            <p className="text-gray-500 text-sm mt-4">
                Você pode gerenciar este NFT no painel ou compartilhar o QR code com os hóspedes.
            </p>
        </div>
    );
}

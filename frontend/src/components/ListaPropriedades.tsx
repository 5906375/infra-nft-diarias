// components/ListaPropriedades.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    idPerfil: string;
}

export default function ListaPropriedades({ idPerfil }: Props) {
    const [propriedades, setPropriedades] = useState([]);

    useEffect(() => {
        if (idPerfil) {
            axios
                .get(`http://localhost:4000/api/imoveis/perfil/${idPerfil}`)
                .then((res) => setPropriedades(res.data))
                .catch((err) => console.error("Erro ao buscar propriedades:", err));
        }
    }, [idPerfil]);

    return (
        <div className="mt-6">
            <h3 className="font-bold text-lg">🏠 Imóveis Cadastrados</h3>
            <ul className="space-y-2">
                {propriedades.map((p: any) => (
                    <li key={p._id} className="border p-2 rounded bg-white">
                        <strong>{p.nomePropriedade}</strong> <br />
                        Email: {p.emailPropriedade} <br />
                        ID: {p._id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

import { useEffect, useState } from "react";
import CepInput from "../../components/CepInput";
import * as CepApi from "../../utils/CepApi";
import axios from "axios";
import { toast } from "sonner";
import { useCadastroContext } from "@/context/CadastroContext";

interface EtapaProprietarioProps {
    formData: Record<string, any>;
    handleChange: (e: React.ChangeEvent<any>) => void;
    setField?: (name: string, value: any) => void;
}


export default function EtapaProprietario() {
    const { formData, handleChange, setField } = useCadastroContext();
    const [documento, setDocumento] = useState<File | null>(null);
    const [comprovante, setComprovante] = useState<File | null>(null);
    const [previewComprovante, setPreviewComprovante] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const tiposPessoaFisica = ["CNH", "RG", "CPF"];
    const tiposPessoaJuridica = ["CNPJ"];
    const tiposPermitidos = formData.tipoPessoa === "Jurídica" ? tiposPessoaJuridica : tiposPessoaFisica;

    useEffect(() => {
        const fala = new SpeechSynthesisUtterance("Vamos preencher os dados do proprietário.");
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(fala);
    }, []);

    const preencherEnderecoComCep = (endereco: CepApi.EnderecoCep) => {
        setField("endereco", endereco.logradouro);
        setField("bairro", endereco.bairro);
        setField("cidade", endereco.cidade);
        setField("estado", endereco.estado);
        setField("pais", endereco.pais);
    };

    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (e.target.name === "comprovanteEndereco") {
            setComprovante(file || null);
            setPreviewComprovante(file ? URL.createObjectURL(file) : "");
            setField("comprovanteEndereco", file);
        }
        if (e.target.name === "documentoIdentidade") {
            setDocumento(file || null);
            setField("documentoIdentidade", file);
        }
    };

    const handleSalvarProprietario = async () => {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value && typeof value !== "object") data.append(key, value);
        });

        if (documento) data.append("docIdentidade", documento);
        if (comprovante) data.append("comprovanteEndereco", comprovante);

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/api/perfis", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const idPerfil = response.data.idPerfil;
            setField("idPerfil", idPerfil);
            toast.success("✅ Cadastro do perfil concluído!");
        } catch (error) {
            console.error("❌ Erro ao cadastrar perfil:", error);
            toast.error("Erro ao cadastrar perfil.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">👤 Perfil</h2>

            <input name="nome" placeholder="Nome" onChange={handleChange} className="border p-2 w-full rounded" />

            <div className="flex gap-2">
                <select name="ddi" value={formData.ddi} onChange={handleChange} className="border p-2 rounded">
                    <option value="+55">🇧🇷 +55 (Brasil)</option>
                    <option value="+1">🇺🇸 +1 (EUA)</option>
                    <option value="+351">🇵🇹 +351 (Portugal)</option>
                </select>
                <input type="tel" name="telefone" placeholder="Telefone" onChange={handleChange} className="border p-2 w-full rounded" />
            </div>

            <select name="tipoPessoa" onChange={handleChange} className="border p-2 w-full rounded">
                <option value="Física">Pessoa Física</option>
                <option value="Jurídica">Pessoa Jurídica</option>
            </select>

            <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="assinatura" placeholder="Assinatura" onChange={handleChange} className="border p-2 w-full rounded" />

            <CepInput
                value={formData.cep}
                onChange={(cep) => setField("cep", cep)}
                onEnderecoEncontrado={preencherEnderecoComCep}
            />
            <input name="endereco" value={formData.endereco} placeholder="Endereço" onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="numero" placeholder="Número" onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="bairro" value={formData.bairro} placeholder="Bairro" onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="cidade" value={formData.cidade} placeholder="Cidade" onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="estado" value={formData.estado} placeholder="Estado" onChange={handleChange} className="border p-2 w-full rounded" />
            <input name="pais" value={formData.pais} placeholder="País" onChange={handleChange} className="border p-2 w-full rounded" />

            <input type="file" name="documentoIdentidade" accept=".pdf,.jpg,.jpeg,.png" onChange={handleArquivoChange} />
            <input type="file" name="comprovanteEndereco" accept=".pdf,.jpg,.jpeg,.png" onChange={handleArquivoChange} />
            {previewComprovante && <img src={previewComprovante} alt="Comprovante" className="w-32 mt-2 rounded border" />}

            <button onClick={handleSalvarProprietario} className={`bg-green-600 text-white px-4 py-2 rounded mt-4 ${loading ? "opacity-50 cursor-wait" : ""}`} disabled={loading}>
                {loading ? "Salvando..." : "Salvar Proprietário"}
            </button>
        </div>
    );
}

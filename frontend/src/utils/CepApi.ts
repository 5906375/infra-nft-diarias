// src/utils/CepApi.ts

export type EnderecoCep = {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
};

export async function buscarEnderecoPorCep(cep: string): Promise<EnderecoCep | null> {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return null;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) return null;

        return {
            cep: data.cep,
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
            pais: "Brasil",
        };
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        return null;
    }
    

}
  
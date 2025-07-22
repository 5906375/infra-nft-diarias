// src/hooks/useCadastro.ts
import { useReducer } from "react";

export interface CadastroState {
    etapa: number;
    formData: Record<string, any>;
}

const initialState: CadastroState = {
    etapa: 1,
    formData: {
        // Dados do perfil
        nome: "",
        tipoPessoa: "Física", // ou "Jurídica"
        wallet: "",
        email: "",
        ddi: "+55",
        telefone: "",
        assinatura: "",
        linkExterno: "",
        tipoDocumento: "",
        documentoIdentidade: null, // File
        comprovanteEndereco: null, // File

        // Endereço
        cep: "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",

        // Controle
        idPerfil: "",
        cadastrarPropriedade: false,

        // Propriedade
        nomePropriedade: "",
        idPropriedade: "",
        emailPropriedade: "",
        docCompraVenda: "",
        registroImovel: "",

        // Regras da hospedagem
        checkin: "",
        checkout: "",
        minHospedes: 1,
        maxHospedes: 1,
        finalidade: [],
        regrasAdicionais: "",
        outrasRegras: "",

        // Período da diária
        inicio: "",
        fim: "",
    },
};

function cadastroReducer(state: CadastroState, action: any): CadastroState {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                formData: { ...state.formData, [action.name]: action.value },
            };
        case "SET_ETAPA":
            return { ...state, etapa: action.etapa };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

export function useCadastro() {
    const [state, dispatch] = useReducer(cadastroReducer, initialState);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        dispatch({ type: "UPDATE", name, value });
        
    };
    
    const setField = (name: string, value: any) => {
        dispatch({ type: "UPDATE", name, value });
    };
    
    return {
        etapa: state.etapa,
        formData: state.formData,
        setEtapa: (etapa: number) => dispatch({ type: "SET_ETAPA", etapa }),
        handleChange,
        setField, // << ADICIONADO AQUI
        reset: () => dispatch({ type: "RESET" }),
    };
}

// ✅ src/context/CadastroContext.tsx
import React, { createContext, useContext } from "react";
import { useCadastro } from "@/hooks/useCadastro";

const CadastroContext = createContext<ReturnType<typeof useCadastro> | null>(null);

export const CadastroProvider = ({ children }: { children: React.ReactNode }) => {
    const cadastro = useCadastro();

    return (
        <CadastroContext.Provider value={cadastro}>
            {children}
        </CadastroContext.Provider>
    );
};

export const useCadastroContext = () => {
    const context = useContext(CadastroContext);
    if (!context) {
        throw new Error("useCadastroContext deve ser usado dentro de <CadastroProvider>");
    }
    return context;
};

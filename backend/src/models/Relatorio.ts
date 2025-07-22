export interface Relatorio {
    id: string;
    nomePropriedade: string;
    nomeProprietario: string;
    wallet: string;
    checkin: string[];
    checkout: string[];
    maxHospedes: number;
    minHospedes: number;
    finalidade: string[];
    regrasAdicionais: string[];
}
  
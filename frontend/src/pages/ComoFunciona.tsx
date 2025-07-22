
// src/pages/ComoFunciona.tsx
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import {
    UserCheck,
    Home,
    ShieldCheck,
    Database,
    Blocks,
    Wallet,
    BadgePlus,
    CalendarRange,
    Tag,
    DollarSign,
    FileBarChart2,
} from "lucide-react";
import imagemExplicacao from "@/assets/nft_utilidade_explicacao.png";
import LayoutPadrao from "@/components/LayoutPadrao";

const steps = [
    { title: "Cadastro do Proprietário", icon: UserCheck, description: "Proprietário (ou agente delegado) cria perfil com identidade verificada na Dapp." },
    { title: "Cadastro da Propriedade", icon: Home, description: "O bem é vinculado ao perfil do proprietário e detalhes são salvos." },
    { title: "Regras de Locação", icon: ShieldCheck, description: "Políticas de cancelamento, check‑in/out e limites de hóspedes são definidas." },
    { title: "Registro no Banco de Dados", icon: Database, description: "Todos os metadados são salvos, para consultas rápidas, conforme LGPD." },
    { title: "Registro na Blockchain", icon: Blocks, description: "Um hash imutável garante a autenticidade do cadastro." },
    { title: "Pagamento de Taxa de Listagem", icon: Wallet, description: "Proprietário paga taxa de serviço (fiat ou cripto) para publicar a oferta." },
    { title: "Voucher de Disponibilidade", icon: BadgePlus, description: "NFTs (Vouchers) equivalentes a diárias ou períodos mensais são minerados e listados." },
    { title: "Página do Hóspede", icon: CalendarRange, description: "Hóspede navega, filtra datas e seleciona o imóvel desejado." },
    { title: "Voucher de Reserva do Hóspede", icon: Tag, description: "Um NFT (Voucher) utilitário representa o direito de uso para o período escolhido." },
    { title: "Pagamento da Reserva", icon: DollarSign, description: "Contrato inteligente (smart contract) distribui valores conforme regras. Sem intervenção humana" },
    { title: "Registro Final na Blockchain", icon: Blocks, description: "Transação confirma reserva e bloqueia datas no smart‑contract." },
    { title: "Dashboard", icon: FileBarChart2, description: "Dados atualizam o relatórios administrativos do proprietários e hóspedes em tempo real para análise." },
];

export default function ComoFunciona() {
    return (
        <LayoutPadrao>
            <section
                className="relative min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${imagemExplicacao})`,
                }}
            >
                {/* Overlay claro */}
                <div className="absolute inset-0 bg-white/60 z-0" />

                {/* Conteúdo principal */}
                <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
                    {/* Imagem banner */}
                    <img
                        src={imagemExplicacao}
                        alt="Fluxo do NFT utilitário nas diárias"
                        className="w-full h-auto rounded-lg shadow-xl object-cover"
                    />

                    {/* Título */}
                    <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-600 text-[clamp(1.8rem,4vw,3rem)] font-extrabold">
                        Como Funciona o NFT de Diárias
                    </h1>

                    {/* Grid de Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                        {steps.map(({ title, icon: Icon, description }) => (
                            <Card key={title} className="hover:shadow-xl transition-shadow bg-white/90 backdrop-blur-sm">
                                <CardHeader className="flex items-center gap-3">
                                    <Icon className="w-6 h-6 text-purple-600" />
                                    <h2 className="font-semibold text-[clamp(1rem,2vw,1.125rem)]">{title}</h2>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600">{description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </LayoutPadrao>
    );
}

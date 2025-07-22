📦 NFTDiarias - Smart Contracts (Hardhat)

Esta pasta contracts-nft/ contém os smart contracts desenvolvidos para o projeto NFTDiarias, organizados com o framework Hardhat e focados em funcionalidades Web3 de tokenização de imóveis, locação, venda, tributação e rendimentos.

🎯 Objetivo

Fornecer contratos auditáveis e reutilizáveis para:

Emissão de NFTs representando diárias (ERC-721)

Locação com integração de pagamento (ERC-20)

Venda tokenizada de imóveis (ERC-721/1155)

Tributário (hash de documento, tipo de imposto)

Vaults para rendimentos fracionados (ERC-4626)

📂 Estrutura da Pasta

contracts-nft/
├── contracts/             # Código-fonte dos contratos .sol
│   ├── DiariaNFT.sol
│   ├── LocacaoNFT.sol
│   ├── VendaImovel.sol
│   ├── TributacaoNFT.sol
│   └── VaultAluguel.sol
├── test/                  # Testes unitários (Mocha/Chai)
│   └── DiariaNFT.test.js
├── scripts/               # Scripts de deploy
│   └── deploy.js
├── hardhat.config.js      # Configuração do Hardhat

🧪 Comandos de Desenvolvimento

Instalar dependências:

npm install

Compilar contratos:

npx hardhat compile

Rodar testes:

npx hardhat test

Executar script de deploy:

npx hardhat run scripts/deploy.js --network localhost

Iniciar Hardhat local:

npx hardhat node

🔗 Padrões Utilizados

Contrato

Padrão

Função Principal

DiariaNFT.sol

ERC-721

NFT para uso exclusivo de uma diária

LocacaoNFT.sol

Custom

Aluguel, cancelamento, pagamento tokenizado

VendaImovel.sol

ERC-721/1155

Venda tokenizada de imóveis

TributacaoNFT.sol

Custom

Vincula imposto, hash do documento, tipo fiscal

VaultAluguel.sol

ERC-4626

Vault para rendimentos de locação fracionados

🧠 Regras e Conformidade

Integração futura com oráculos Chainlink (pagamentos, dados fiscais)

Armazenamento descentralizado via IPFS para hashes

Suporte à validação jurídica via assistente IA

Cláusulas como foro, cancelamento e assinatura digital podem ser inseridas via metadados

👥 C-Levels e Perspectivas

Perfil

Exemplo de Decisão

CTO

Modularização por padrão ERC

CFO

Rastreabilidade de receita por contrato

CLO

Conformidade com LGPD e obrigações fiscais

CPO

NFT deve ser intuitivo e legível ao usuário

📚 Referências

OpenZeppelin Contracts

ERC Standards - Ethereum

Chainlink Oracles

Receita Federal - Criptoativos

RealT Tokenization

Manutenção: Equipe NFT - D (Agent Autônomo Web3 + Time NFTDiarias)
Atualizado: julho/2025



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseDiariaNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title LocacaoNFT
/// @notice Representa o direito de uso de um imóvel via tokenização de diárias pagas
contract LocacaoNFT is BaseDiariaNFT {
    IERC20 public immutable tokenPagamento;

    /// @notice Representa uma locação ativa com valor pago
    struct Locacao {
        address locador;
        uint256 valor;
        bool ativa;
    }

    mapping(uint256 => Locacao) private locacoes;

    event Alugado(uint256 indexed tokenId, address indexed locatario, uint256 valor);
    event CanceladoAluguel(uint256 indexed tokenId, address indexed locador);

    /// @param _tokenPagamento Endereço do token ERC20 aceito como pagamento
    constructor(address _tokenPagamento) ERC721("LocacaoNFT", "LNFT") {
        require(_tokenPagamento != address(0), "Token inválido");
        tokenPagamento = IERC20(_tokenPagamento);
    }

    /// @notice Emite um NFT de locação após pagamento em token
    /// @param to Locatário
    /// @param imovelId ID do imóvel
    /// @param dataInicio Timestamp de início
    /// @param dataFim Timestamp de fim
    /// @param tokenURI URI do NFT
    /// @param hashContrato IPFS ou hash legal do contrato
    /// @param valor Valor do aluguel (em tokenPagamento)
    function alugar(
        address to,
        uint256 imovelId,
        uint256 dataInicio,
        uint256 dataFim,
        string memory tokenURI,
        string memory hashContrato,
        uint256 valor
    ) external returns (uint256) {
        require(to != address(0), "Locatário inválido");
        require(valor > 0, "Valor inválido");

        // Transfere o token de quem chamou para o contrato
        require(tokenPagamento.transferFrom(msg.sender, address(this), valor), "Falha no pagamento");

        uint256 tokenId = _emitir(to, imovelId, dataInicio, dataFim, tokenURI, hashContrato);

        locacoes[tokenId] = Locacao({
            locador: msg.sender,
            valor: valor,
            ativa: true
        });

        emit Alugado(tokenId, to, valor);
        return tokenId;
    }

    /// @notice Cancela uma locação e queima o NFT (apenas dono original pode)
    /// @param tokenId ID da locação
    function cancelarAluguel(uint256 tokenId) external {
        Locacao memory loc = locacoes[tokenId];
        require(loc.ativa, "Locação inativa");
        require(loc.locador == msg.sender || owner() == msg.sender, "Sem permissão");

        locacoes[tokenId].ativa = false;
        _cancelar(tokenId);

        emit CanceladoAluguel(tokenId, loc.locador);
    }

    /// @notice Retorna os dados da locação associada ao token
    function getLocacao(uint256 tokenId) external view returns (Locacao memory) {
        require(_exists(tokenId), "Token inexistente");
        return locacoes[tokenId];
    }
}

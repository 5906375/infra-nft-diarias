// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title VendaImovel
/// @notice NFT representando um imóvel, que pode ser transferido após pagamento
contract VendaImovel is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    IERC20 public tokenPagamento;

    struct Imovel {
        string descricao;
        uint256 valor;
        bool vendido;
    }

    mapping(uint256 => Imovel) public imoveis;

    event ImovelRegistrado(uint256 tokenId, string descricao, uint256 valor);
    event ImovelVendido(uint256 tokenId, address comprador, uint256 valor);

    constructor(address _tokenPagamento) ERC721("ImovelNFT", "IMV") {
        require(_tokenPagamento != address(0), "Token de pagamento inválido");
        tokenPagamento = IERC20(_tokenPagamento);
    }

    /// @notice Registra um imóvel no contrato (somente proprietário do contrato)
    function registrarImovel(string memory descricao, uint256 valor, string memory tokenURI) external onlyOwner {
        require(valor > 0, "Valor inválido");

        uint256 tokenId = nextTokenId++;
        _mint(address(this), tokenId);
        _setTokenURI(tokenId, tokenURI);

        imoveis[tokenId] = Imovel({
            descricao: descricao,
            valor: valor,
            vendido: false
        });

        emit ImovelRegistrado(tokenId, descricao, valor);
    }

    /// @notice Permite que um comprador adquira o NFT pagando o valor exigido
    function comprar(uint256 tokenId) external {
        Imovel storage imv = imoveis[tokenId];
        require(!imv.vendido, "Já vendido");
        require(tokenPagamento.transferFrom(msg.sender, owner(), imv.valor), "Pagamento falhou");

        imv.vendido = true;
        _transfer(address(this), msg.sender, tokenId);

        emit ImovelVendido(tokenId, msg.sender, imv.valor);
    }

    /// @notice Detalhes do imóvel (public view)
    function getImovel(uint256 tokenId) external view returns (Imovel memory) {
        require(_exists(tokenId), "Token inexistente");
        return imoveis[tokenId];
    }
}

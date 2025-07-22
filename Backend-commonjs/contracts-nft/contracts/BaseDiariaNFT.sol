// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title BaseDiariaNFT
/// @notice Contrato abstrato para emissão de NFTs representando diárias de imóveis
/// @dev Usado como base para contratos como LocacaoNFT, VendaImovel, etc.
abstract contract BaseDiariaNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    struct Diaria {
        uint256 imovelId;
        uint256 dataInicio;
        uint256 dataFim;
        string hashContrato;
    }

    // ⚠️ Se contiver dados sensíveis, considere torná-lo `private` e usar getter controlado
    mapping(uint256 => Diaria) internal diarias;

    event Emitido(
        address indexed to,
        uint256 indexed tokenId,
        uint256 imovelId,
        uint256 dataInicio,
        uint256 dataFim
    );

    event Cancelado(uint256 indexed tokenId);

    /// @notice Emite um novo NFT de diária
    /// @param to Endereço do recebedor
    /// @param imovelId ID do imóvel referenciado
    /// @param dataInicio Timestamp do início da diária
    /// @param dataFim Timestamp do fim da diária
    /// @param tokenURI URI com metadados do NFT
    /// @param hashContrato Hash do contrato legal armazenado em IPFS (ou similar)
    /// @return tokenId ID do token emitido
    function _emitir(
        address to,
        uint256 imovelId,
        uint256 dataInicio,
        uint256 dataFim,
        string memory tokenURI,
        string memory hashContrato
    ) internal returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        diarias[tokenId] = Diaria(imovelId, dataInicio, dataFim, hashContrato);

        emit Emitido(to, tokenId, imovelId, dataInicio, dataFim);
        return tokenId;
    }

    /// @notice Cancela e queima um token emitido
    /// @param tokenId ID do token a ser cancelado
    function _cancelar(uint256 tokenId) internal {
        require(_exists(tokenId), "Token inexistente");
        _burn(tokenId);
        delete diarias[tokenId];
        emit Cancelado(tokenId);
    }

    /// @notice Retorna os dados de uma diária emitida
    /// @param tokenId ID do token NFT
    /// @return Struct Diaria com dados do período e imóvel
    function getDiaria(uint256 tokenId) public view returns (Diaria memory) {
        require(_exists(tokenId), "Token inexistente");
        return diarias[tokenId];
    }
}

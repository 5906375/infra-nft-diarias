// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseDiariaNFT.sol";

contract DiariaNFT is BaseDiariaNFT {
    constructor() ERC721("DiariaNFT", "DNFT") {}

    function emitir(
        address to,
        uint256 imovelId,
        uint256 dataInicio,
        uint256 dataFim,
        string memory tokenURI,
        string memory hashContrato
    ) external onlyOwner returns (uint256) {
        return _emitir(to, imovelId, dataInicio, dataFim, tokenURI, hashContrato);
    }

    function cancelar(uint256 tokenId) external onlyOwner {
        _cancelar(tokenId);
    }
}

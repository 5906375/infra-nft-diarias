// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTDiarias is ERC721URIStorage, Ownable {
    uint256 public tokenCount;

    constructor() ERC721("NFTDiarias", "NDF") Ownable(msg.sender) {}

    function mintNFT(address to, string memory tokenURI) external onlyOwner {
        _safeMint(to, tokenCount);
        _setTokenURI(tokenCount, tokenURI);
        tokenCount++;
    }
}

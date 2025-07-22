// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title TributacaoNFT
/// @notice Registro fiscal tokenizado com hash de documentos e códigos tributários
contract TributacaoNFT {
    address public owner;

    struct RegistroFiscal {
        address contribuinte;
        uint256 valorEmBRL;
        string taxCode;
        string documentoHash; // pode ser IPFS
        uint256 timestamp;
    }

    mapping(uint256 => RegistroFiscal) public registros;
    uint256 public totalRegistros;

    event Registrado(
        uint256 indexed id,
        address indexed contribuinte,
        uint256 valorEmBRL,
        string taxCode,
        string documentoHash
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode registrar");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Registra uma obrigação tributária
    function registrar(
        address contribuinte,
        uint256 valorEmBRL,
        string calldata taxCode,
        string calldata documentoHash
    ) external onlyOwner returns (uint256) {
        uint256 id = totalRegistros++;
        registros[id] = RegistroFiscal({
            contribuinte: contribuinte,
            valorEmBRL: valorEmBRL,
            taxCode: taxCode,
            documentoHash: documentoHash,
            timestamp: block.timestamp
        });

        emit Registrado(id, contribuinte, valorEmBRL, taxCode, documentoHash);
        return id;
    }

    /// @notice Exporta dados de um registro específico
    function getRegistro(uint256 id) external view returns (RegistroFiscal memory) {
        return registros[id];
    }
}

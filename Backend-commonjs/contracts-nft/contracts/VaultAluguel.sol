// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title VaultAluguel
/// @notice Cofre de rendimento para aluguéis tokenizado como ERC-20
contract VaultAluguel is ERC20, Ownable {
    address public moedaBase;

    constructor(string memory name, string memory symbol, address _moedaBase)
        ERC20(name, symbol)
    {
        moedaBase = _moedaBase;
    }

    /// @notice Deposita tokens da moeda base e emite cotas ERC-20
    function depositar(uint256 valor) external {
        require(valor > 0, "Valor deve ser maior que zero");
        require(
            IERC20(moedaBase).transferFrom(msg.sender, address(this), valor),
            "Transferência falhou"
        );
        _mint(msg.sender, valor);
    }

    /// @notice Permite saque com queima de cotas
    function sacar(uint256 valor) external {
        require(balanceOf(msg.sender) >= valor, "Saldo insuficiente");
        _burn(msg.sender, valor);
        require(
            IERC20(moedaBase).transfer(msg.sender, valor),
            "Transferência de saída falhou"
        );
    }

    /// @notice Permite ao dono sacar lucros acumulados (além do lastro dos cotistas)
    function extrairLucro(address destino, uint256 valor) external onlyOwner {
        require(
            IERC20(moedaBase).transfer(destino, valor),
            "Falha na extração de lucro"
        );
    }
}

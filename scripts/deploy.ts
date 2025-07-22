import { ethers } from "hardhat";

async function main() {
    // Recupera a conta que irá fazer o deploy
    const [deployer] = await ethers.getSigners();

    console.log("📤 Deploy iniciado por:", deployer.address);

    // Instancia o contrato compilado NFTDiarias
    const NFTDiarias = await ethers.getContractFactory("NFTDiarias");

    // Faz o deploy (sem argumentos no construtor)
    const contract = await NFTDiarias.deploy();

    // Aguarda até que seja efetivamente minerado
    await contract.deployed();

    console.log("✅ Contrato NFTDiarias implantado em:", contract.address);
}

main()
    .then(() => process.exit(0))

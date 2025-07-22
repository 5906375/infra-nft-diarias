import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("🔨 Implantando contrato com a carteira:", deployer.address);

    const NFTDiarias = await ethers.getContractFactory("NFTDiarias");
    const contrato = await NFTDiarias.deploy();
    await contrato.waitForDeployment();

    const endereco = await contrato.getAddress();
    console.log("✅ Contrato NFTDiarias implantado em:", endereco);
}

main().catch((error) => {
    console.error("❌ Erro ao implantar contrato:", error);
    process.exitCode = 1;
});

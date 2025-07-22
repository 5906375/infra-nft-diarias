// src/utils/mintWithEthers.ts
import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function mintNFTtoBlockchain(tokenURI: string): Promise<string> {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

    const abiPath = path.join(__dirname, "../contracts/NFTDiarias.json");
    const contractJSON = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    const contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS as string,
        contractJSON.abi,
        wallet
    );

    const tx = await contract.mintNFT(wallet.address, tokenURI);
    await tx.wait();
    return tx.hash;
}

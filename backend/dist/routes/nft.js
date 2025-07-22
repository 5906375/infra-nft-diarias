// backend/src/routes/nft.ts
import { Router } from "express";
import { mintNFT } from "../controllers/nftController.js";
import upload from "../middleware/upload.js";
const router = Router();
router.post("/", upload.single("midia"), mintNFT);
export default router;

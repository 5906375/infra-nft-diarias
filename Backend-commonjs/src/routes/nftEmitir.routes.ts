import express from "express";
import multer from "multer";
import { emitirNFT } from "../controllers/nftEmitirController";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // pasta temporária

router.post("/emitir", upload.single("imagem"), emitirNFT);

export default router;

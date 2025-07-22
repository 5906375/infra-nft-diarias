"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/nft.ts
const express_1 = require("express");
const nftController_1 = require("../controllers/nftController");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
router.post("/", upload_1.default.single("midia"), nftController_1.mintNFT);
exports.default = router;

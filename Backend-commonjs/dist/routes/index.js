"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/ping', (_, res) => {
    res.json({ message: 'pong' });
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send([]);
});
router.post("/", (req, res) => {
    res.status(500);
    res.send("Not implemented yet!");
});
exports.default = router;

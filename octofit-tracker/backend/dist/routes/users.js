"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    res.json({ message: 'List users (stub)' });
});
router.post('/', async (req, res) => {
    res.status(201).json({ message: 'Create user (stub)', body: req.body });
});
router.get('/:id', async (req, res) => {
    res.json({ message: `Get user ${req.params.id} (stub)` });
});
exports.default = router;
//# sourceMappingURL=users.js.map
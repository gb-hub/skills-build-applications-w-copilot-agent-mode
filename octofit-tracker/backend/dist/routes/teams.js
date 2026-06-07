"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    res.json({ message: 'List teams (stub)' });
});
router.post('/', async (req, res) => {
    res.status(201).json({ message: 'Create team (stub)', body: req.body });
});
router.get('/:id', async (req, res) => {
    res.json({ message: `Get team ${req.params.id} (stub)` });
});
exports.default = router;
//# sourceMappingURL=teams.js.map
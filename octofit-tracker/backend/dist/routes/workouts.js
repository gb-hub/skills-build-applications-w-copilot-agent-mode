"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    res.json({ message: 'List workouts (stub)' });
});
router.post('/', async (req, res) => {
    res.status(201).json({ message: 'Create workout (stub)', body: req.body });
});
exports.default = router;
//# sourceMappingURL=workouts.js.map
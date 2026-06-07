import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('team').lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const u = await User.create(req.body);
    res.status(201).json(u);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('team');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;

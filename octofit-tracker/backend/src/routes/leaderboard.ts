import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const list = await Leaderboard.find().populate('user').sort({ points: -1 }).lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;

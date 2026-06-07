import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user workout team').lean();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const a = await Activity.create(req.body);
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

export default router;

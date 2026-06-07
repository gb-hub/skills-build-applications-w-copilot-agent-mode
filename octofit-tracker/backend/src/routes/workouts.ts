import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const w = await Workout.create(req.body);
    res.status(201).json(w);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

export default router;

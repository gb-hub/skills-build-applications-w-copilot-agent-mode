import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const t = await Team.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;

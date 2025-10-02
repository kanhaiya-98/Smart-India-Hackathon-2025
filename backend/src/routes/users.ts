import { Router } from 'express';
import UserModel from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const docs = await UserModel.find().sort({ createdAt: -1 });
  res.json(docs);
});

router.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  const doc = await UserModel.create(req.body);
  res.status(201).json(doc);
});

router.put('/:id', async (req, res) => {
  const { name, email, phone, department, bio } = req.body ?? {};
  const updated = await UserModel.findByIdAndUpdate(
    req.params.id,
    { name, email, phone, department, bio },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await UserModel.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json(deleted);
});

export default router;



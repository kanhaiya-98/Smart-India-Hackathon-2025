import { Router } from 'express';
import IssueModel from '../models/Issue';

const router = Router();

router.get('/', async (_req, res) => {
  const docs = await IssueModel.find().sort({ updatedAt: -1 });
  res.json(docs);
});

router.get('/:id', async (req, res) => {
  const issue = await IssueModel.findById(req.params.id);
  if (!issue) return res.status(404).json({ message: 'Issue not found' });
  res.json(issue);
});

router.post('/', async (req, res) => {
  const doc = await IssueModel.create(req.body);
  res.status(201).json(doc);
});

router.put('/:id', async (req, res) => {
  const updated = await IssueModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Issue not found' });
  res.json(updated);
});

router.patch('/:id/status', async (req, res) => {
  const status = req.body?.status;
  if (!status) return res.status(400).json({ message: 'status is required' });
  const updated = await IssueModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: 'Issue not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await IssueModel.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Issue not found' });
  res.json(deleted);
});

export default router;



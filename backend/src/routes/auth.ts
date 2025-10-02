import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

// Simple mock login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const safeUser = {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    avatar: user.avatar
  };
  res.json({ token: 'demo-token', user: safeUser });
});

router.post('/signup', async (req, res) => {
  const { name, email, password, role, department, phone, avatar } = req.body ?? {};
  if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password are required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role, department, phone, avatar, status: 'active' });
  const safeUser = { id: String(user._id), name: user.name, email: user.email, role: user.role, department: user.department, avatar: user.avatar };
  res.status(201).json({ token: 'demo-token', user: safeUser });
});

export default router;



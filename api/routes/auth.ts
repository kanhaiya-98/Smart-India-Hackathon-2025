import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = Router();

// Simple mock login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      console.log('Login failed: Password mismatch', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const safeUser = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      avatar: user.avatar
    };
    
    console.log('Login successful', email);
    res.json({ token: 'demo-token', user: safeUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, department, phone, avatar } = req.body ?? {};
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password are required' });
    
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Signup failed: Email exists', email);
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role, department, phone, avatar, status: 'active' });
    
    const safeUser = { 
      id: String(user._id), 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      department: user.department, 
      avatar: user.avatar 
    };
    
    console.log('Signup successful', email);
    res.status(201).json({ token: 'demo-token', user: safeUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;



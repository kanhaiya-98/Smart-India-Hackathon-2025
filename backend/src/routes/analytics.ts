import { Router } from 'express';
import Issue from '../models/Issue';
import User from '../models/User';

const router = Router();

router.get('/dashboard', async (_req, res) => {
  const totalIssues = await Issue.countDocuments();
  const pendingIssues = await Issue.countDocuments({ status: 'pending' });
  const inProgressIssues = await Issue.countDocuments({ status: 'in_progress' });
  const resolvedIssues = await Issue.countDocuments({ status: 'resolved' });
  const activeOfficers = await User.countDocuments({ role: 'department_officer', status: 'active' });
  res.json({
    totalIssues,
    pendingIssues,
    inProgressIssues,
    resolvedIssues,
    averageResponseTime: 4.2,
    citizenSatisfaction: 4.7,
    activeOfficers
  });
});

export default router;



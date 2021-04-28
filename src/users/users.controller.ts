import express from 'express';
import { authenticate as auth, getAll as all } from './user.service';

const router = express.Router();

// routes
const authenticate = (req: any, res: any, next: any) => {
  auth(req.body)
    .then((user) => res.json(user))
    .catch(next);
};

const getAll = (req: any, res: any, next: any) => {
  all()
    .then((users) => res.json(users))
    .catch(next);
};

router.post('/authenticate', authenticate);
router.get('/', getAll);

module.exports = router;

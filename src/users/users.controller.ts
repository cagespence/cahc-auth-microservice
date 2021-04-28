import express, { Request, Response, NextFunction } from 'express';
import { authenticate as auth, getAll as all, registerUser } from './user.service';

const router = express.Router();

// routes
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  auth(req.body)
    .then((user) => res.json(user))
    .catch(next);
};

const register = (req: Request, res: Response, next: NextFunction) => {
  registerUser(req.body)
    .then((user) => res.json(user))
    .catch(next);
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  all()
    .then((users) => res.json(users))
    .catch(next);
};

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);

module.exports = router;

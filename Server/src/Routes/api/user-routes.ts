import express from 'express';
import {
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../../controllers/user-controls.js';

const router = express.Router();

router.get('/:id', getUserById);

router.post('/register', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export { router as userRouter };
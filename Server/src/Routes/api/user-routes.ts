import express from 'express';
import {
    getUserById,
    updateUser,
    deleteUser
} from '../../controllers/user-controls.js';

const router = express.Router();

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export { router as userRouter };
import { saveCards, fetchCards } from "../../controllers/market-controls.js";
import express from 'express';


const router = express.Router();

router.post('/:userId', saveCards);

router.get('/:userId', fetchCards);

export { router as cardRouter };
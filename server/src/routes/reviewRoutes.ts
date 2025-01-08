import { Router } from "express";
import { createReview, getReviews } from "../controllers/reviewController";

const router = Router();

router.get("/", getReviews);
router.post("/create-review", createReview);

export default router;
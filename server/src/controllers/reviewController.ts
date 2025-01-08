import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {

      const reviews = await prisma.review.findMany({
        include: {
          product: true,
        },
      });
  
      const formattedReviews = reviews.map(review => ({
        reviewId: review.reviewId,
        productName: review.product.name,
        rating: review.rating,
        review: review.review,
      }));
  
      res.status(200).json(formattedReviews);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching reviews" });
    }
};


export const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reviewId, productId, review, rating } = req.body;

        const newReview = await prisma.review.create({
            data: {
                reviewId,
                productId,
                rating,
                review,
                date: new Date(),
            },
        });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: "Error createing product"});
    }
};

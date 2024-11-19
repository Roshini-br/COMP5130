/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/restaurantController.ts
import { Request, Response } from "express";
import RestaurantModel from "../models/Restaurant";
import { handleError } from "./common/error";

// Fetch all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.json(restaurants);
  } catch (error) {
    handleError(res, error);
  }
};

// Fetch restaurant by ID
export const getRestaurantById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    handleError(res, error);
  }
};

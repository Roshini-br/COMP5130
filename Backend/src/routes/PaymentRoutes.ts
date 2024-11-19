/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EnvVars from "@src/common/EnvVars";
import Stripe from "stripe";
import { Request, Response } from "express";
import { handleError } from "./common/error";

const stripe = new Stripe(EnvVars.Payments.Secret, {
  apiVersion: "2024-10-28.acacia",
});

export const createPaymentIntent = async (amount: number): Promise<string> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // Amount in cents
    currency: "usd",
  });

  return paymentIntent.client_secret ?? "";
};

export const makePayment = async (req: Request, res: Response) => {
  const { amount } = req.body;
  try {
    const clientSecret = await createPaymentIntent(
      Math.round((amount as number) * 100)
    );
    res.json({ clientSecret });
  } catch (error) {
    handleError(res, error);
  }
};

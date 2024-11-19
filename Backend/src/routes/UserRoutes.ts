/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import EnvVars from "@src/common/EnvVars";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { cryptoUtil } from "./common/crypto.util";
import { handleError } from "./common/error";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, address, phoneNumber } = req.body;

    if (
      !username?.trim() ||
      !email?.trim() ||
      !address?.trim() ||
      !phoneNumber?.trim() ||
      !req.body.password?.trim()
    ) {
      res.status(400).json({ message: "All fields are required !!" });
      return;
    }

    const user = new UserModel({
      username,
      email,
      password: cryptoUtil.createHash(req.body.password as string),
      address,
      phoneNumber,
    });

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message:
          "Looks like this email is already registered, please try to login",
      });
      return;
    }

    const savedUser = await user.save();
    res.status(201).json({ userId: savedUser._id });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again !" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.password = "***";
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

// Update user information
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { username, address, phoneNumber } = req.body;

  if (!username?.trim() || !address?.trim() || !phoneNumber?.trim()) {
    res.status(400).json({
      message:
        "Username, Address, Phone number are required and cannot be empty !!",
    });
    return;
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, address, phoneNumber },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    updatedUser.password = "***";
    res.status(200).json(updatedUser);
  } catch (error) {
    handleError(res, error);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password }: Record<string, string> = req.body;

  try {
    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const hashedPassword = cryptoUtil.createHash(password);

    if (hashedPassword !== user.password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      EnvVars.Jwt.Secret,
      { expiresIn: EnvVars.Jwt.Exp }
    );

    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again !" });
  }
};


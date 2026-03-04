import { Request, Response } from "express";
import { ILogin, IRegister } from "../../types/Register";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  {generateToken} from "../../helpers/jwt"
import { AuthRequest } from "../../types/AuthRequest";

// ---------------- REGISTER USER ----------------
export const CreateUser = async (req: Request, res: Response) => {
  try {
    const data: IRegister = req.body;

    // passwords match
    if (data.passwordHash !== data.password_conform) {
      return res.status(400).json({
        message: "Passwords do not match",
        isSuccess: false
      });
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        isSuccess: false
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.passwordHash, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        passwordHash: hashedPassword
      }
    });

    res.status(201).json({
      message: "User created successfully",
      isSuccess: true,
      user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      isSuccess: false
    });
  }
};

// ---------------- LOGIN USER ----------------
export const login = async (req: Request, res: Response) => {
  try {
    const data: ILogin = req.body;

    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password", isSuccess: false });
    }

    const isMatch = await bcrypt.compare(data.passwordHash, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password", isSuccess: false });
    }

    const token =  generateToken(user.id)

    res.status(200).json({
      message: "Login successful",
      isSuccess: true,
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      isSuccess: false
    });
  }
};

// ---------------- GET ALL USERS ----------------
export const GetAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(200).json({ isSuccess: true, users });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", isSuccess: false });
  }
};

// ---------------- WHOAMI ----------------
export const whoami = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ isSuccess: false, message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, fullName: true, email: true, role: true }
    });

    if (!user) {
      return res.status(404).json({ isSuccess: false, message: "User not found" });
    }

    res.status(200).json({
      isSuccess: true,
      message: "User fetched successfully",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", isSuccess: false });
  }
};
import prisma from "../prisma/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signupService = async (body) => {
  const { name, email, password } = body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 409;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const loginService = async (body) => {
  const { email, password } = body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Password is incorrect");
    err.status = 401;
    throw err;
  }
  const token = generateToken({
    id: user.id,
    email: user.email,
  });
  return { token, user };
};

import bcrypt from "bcrypt";
import * as authRepo from "../repositories/auth.repository.js";
import prisma from "../config/db.js";

export const createUser = async (data) => {
  const { email, name, password } = data;

  if (!(email, name, password)) throw new Error("Icomplete data");

  const alreadyEmail = await authRepo.findByEmail(email);
  if (alreadyEmail) throw new Error("Email already exist");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepo.createUser({ name, email, hashedPassword });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;
  if (!(email, password)) throw new Error("Icomplete data");

  const user = await authRepo.findByEmail(email);
  if (!user) throw new Error("Email is not found");

  const validate = await bcrypt.compare(password, user.password);
  if (!validate) throw new Error("Wrong password");

  return user;
};

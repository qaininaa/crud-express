import bcrypt from "bcrypt";
import * as authRepo from "../repositories/auth.repository.js";
import jwt from "jsonwebtoken";

export const createUser = async (data) => {
  const { email, name, password } = data;

  if (!(email, name, password)) throw new Error("Icomplete data");

  const alreadyEmail = await authRepo.findByEmail(email);
  if (alreadyEmail) throw new Error("Email already exist");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await authRepo.createUser({ name, email, hashedPassword });
};

export const loginUser = async (data) => {
  const { email, password } = data;
  if (!(email, password)) throw new Error("Icomplete data");

  const user = await authRepo.findByEmail(email);
  if (!user) throw new Error("Email is not found");

  const validate = await bcrypt.compare(password, user.password);
  if (!validate) throw new Error("Wrong password");

  const access_secret = process.env.ACCESS_TOKEN_SECRET;
  const refresh_secret = process.env.REFRESH_TOKEN_SECRET;

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, access_secret, {
    expiresIn: process.env.ACCESS_EXPIRE,
  });

  const refreshToken = jwt.sign(payload, refresh_secret, {
    expiresIn: process.env.REFRESH_EXPIRE,
  });

  return {
    accessToken,
    refreshToken,
    payload,
  };
};

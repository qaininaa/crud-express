import bcrypt from "bcrypt";
import * as userRepository from "../repositories/user.repository.js";

export const createUser = async (data) => {
  const { email, name, password } = data;

  if (!(email, name, password)) throw new Error("Icomplete data");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({ name, email, hashedPassword });

  return user;
};

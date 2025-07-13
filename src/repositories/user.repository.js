import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data) => {
  console.log("repo", data);

  return await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.hashedPassword,
    },
  });
};

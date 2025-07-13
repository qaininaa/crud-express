import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data) => {
  return await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.hashedPassword,
    },
  });
};

export const findByEmail = async (email) => {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
};

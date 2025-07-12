import prisma from "../config/db.js";

export const findAllProducts = async () => {
  const products = await prisma.products.findMany();

  return products;
};

export const createProduct = async (dataNewProduct) => {
  const product = await prisma.products.create({
    data: {
      name: dataNewProduct.name,
      price: dataNewProduct.price,
      description: dataNewProduct.description,
      image: dataNewProduct.image,
    },
  });

  return product;
};

export const findProductById = async (id) => {
  return await prisma.products.findUnique({
    where: {
      id,
    },
  });
};

export const updateProduct = async (id, dataProduct) => {
  return await prisma.products.update({
    where: {
      id,
    },
    data: {
      name: dataProduct.name,
      description: dataProduct.description,
      price: dataProduct.price,
      image: dataProduct.image,
    },
  });
};

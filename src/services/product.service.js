import * as productRepository from "../repositories/product.repository.js";

export const getAllProducts = async () => {
  const products = await productRepository.findAllProducts();

  return products;
};

export const createProduct = async (dataNewProduct) => {
  const { name, description, image, price } = dataNewProduct;

  if (!(name && description && image && price))
    throw new Error("Inclomplete data ");
  const newProduct = await productRepository.createProduct(dataNewProduct);

  return newProduct;
};

export const getProductById = async (id) => {
  if (typeof id !== "number") throw new Error("Id is not a number");

  const product = await productRepository.findProductById(id);

  if (!product) throw new Error("Product is not found");

  return product;
};

export const updatePutProduct = async (id, dataProduct) => {
  await getProductById(id);
  const { name, description, image, price } = dataProduct;

  if (!(name && description && image && price))
    throw new Error("Inclomplete data ");

  const product = await productRepository.updateProduct(id, dataProduct);

  return product;
};

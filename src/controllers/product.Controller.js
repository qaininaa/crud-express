import {
  createProduct,
  getAllProducts,
  getProductById,
  updatePutProduct,
} from "../services/product.service.js";

export const getAllProductsController = async (req, res) => {
  const products = await getAllProducts();

  res.send({
    message: "Succes get all products",
    data: products,
  });
};

export const createProductController = async (req, res) => {
  try {
    const dataNewProduct = req.body;

    const data = await createProduct(dataNewProduct);

    res.status(201).json({
      status: "Succes create new data",
      data,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Failed create new product",
      errorMessage: error.message,
    });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(parseInt(id));

    res.json({
      message: `Succes get product by id ${id}`,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Failed get product by id",
      errorMessage: error.message,
    });
  }
};

export const updatePutProductController = async (req, res) => {
  try {
    const dataProduct = req.body;
    const { id } = req.params;

    const product = await updatePutProduct(parseInt(id), dataProduct);
    res.status(201).json({
      message: "Update product success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      messsage: "Failed update product",
      errorMessage: error.message,
    });
  }
};

import Products from '../models/productModel.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      model,
      price,
      description,
      brand,
      image,
      category,
      quantity,
    } = req.body;

    const product = await Products.findOne({ model });

    if (product) {
      return res.status(400).json({ msg: 'This product already exist' });
    }

    const newProduct = await new Products({
      model,
      price,
      description,
      brand,
      image,
      category,
      quantity,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ msg: 'Product was created successful', data: newProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Products.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Product was deleted successful' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      model,
      price,
      description,
      brand,
      image,
      category,
      quantity,
    } = req.body;

    await Products.findByIdAndUpdate(id, {
      model,
      price,
      description,
      brand,
      image,
      category,
      quantity,
    });

    const updatedProduct = await Products.findById(id);

    res
      .status(200)
      .json({ msg: 'Product was updated successful', data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { getAllProducts, createProduct, deleteProduct, updateProduct };

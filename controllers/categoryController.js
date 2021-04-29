import Category from '../models/categoryModel.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const isExist = await Category.findOne({ name });

    if (isExist) {
      return res.status(400).json({ msg: 'This category already exist!' });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res
      .status(201)
      .json({ msg: 'Category was created successful', data: newCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Category was deleted successful' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    await Category.findByIdAndUpdate(id, { name });
    const updatedCategory = await Category.findById(id);

    res
      .status(200)
      .json({ msg: 'Category was updated successful', data: updatedCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { getCategories, createCategory, deleteCategory, updateCategory };

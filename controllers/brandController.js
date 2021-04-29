import Brand from '../models/brandModel.js';

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await Brand.findOne({ name });

    if (brand) {
      return res.status(400).json({ msg: 'This brand already exist' });
    }

    const newBrand = new Brand({ name });
    await newBrand.save();

    res
      .status(201)
      .json({ msg: 'Brand was created successful', data: newBrand });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Brand was deleted successful' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    await Brand.findByIdAndUpdate(id, { name });
    const updatedBrand = await Brand.findById(id);

    res
      .status(200)
      .json({ msg: 'Brand was updated successful', data: updatedBrand });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { getBrands, createBrand, deleteBrand, updateBrand };

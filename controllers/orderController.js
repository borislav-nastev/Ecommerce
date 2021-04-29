import Order from '../models/orderModel.js';
import Users from '../models/userModel.js';
import Products from '../models/productModel.js';

const getOrders = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await Users.findById(id);
    const orders = await Order.find();

    if (user.role === 1) {
      return res.status(200).json(orders);
    }

    const filteredOrders = orders.filter((order) => order.creator === id);
    return res.status(200).json(filteredOrders);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { orders } = req.body;
    const creator = req.user.id;

    const newOrder = new Order({ creator, orders });
    await newOrder.save();

    res
      .status(201)
      .json({ msg: 'Order was created successful', data: newOrder });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Order was deleted successful' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { orders } = req.body;

    const products = await Products.find();
    const updateProduct = async (product) => {
      await Products.findByIdAndUpdate(product._id, product);
    };

    orders.forEach((order) => {
      const product = products.find((p) => p._id == order._id);
      product.quantity = Number(product.quantity) - Number(order.quantity);
      updateProduct(product);
    });

    await Order.findByIdAndUpdate(id, { status: 'completed' });
    res.status(200).json({ msg: 'Order was updated successful' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { getOrders, createOrder, deleteOrder, updateOrder };

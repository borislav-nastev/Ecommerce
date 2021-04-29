import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'in progress',
    },
    orders: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;

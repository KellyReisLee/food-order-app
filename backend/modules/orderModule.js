import mongoose from "mongoose";

const { Schema } = mongoose; // Destructure Schema from mongoose

const orderSchema = new Schema({
  items: { type: Array, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true }
  }
}, { timestamps: true });

const orderModel1 = mongoose.model('Order', orderSchema);

export default orderModel1;

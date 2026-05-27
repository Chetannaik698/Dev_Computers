import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  categoryLabel: { type: String, required: true },
  price: { type: String, required: true },
  priceNum: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  images: { type: [String], default: [] },
  specs: { type: [String], default: [] },
  specsList: { type: [String], default: [] },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  quantity: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;

import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short: { type: String, default: '' },
  description: { type: String, default: '' },
  features: { type: [String], default: [] },
  startingPrice: { type: String, default: '' },
  category: { type: String, default: '' },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;

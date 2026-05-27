import Product from '../models/Product.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

export async function dashboard(req, res) {
  const totalProducts = await Product.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const pendingBookings = await Booking.countDocuments({ status: 'pending' });
  const completedBookings = await Booking.countDocuments({ status: 'done' });
  const services = await Service.countDocuments();
  res.json({ totalProducts, totalBookings, pendingBookings, completedBookings, services });
}

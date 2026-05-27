import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

export async function listServices(req, res) {
  const services = await Service.find().sort({ createdAt: 1 });
  res.json(services);
}

export async function bookService(req, res) {
  const { customer, phone, serviceId, date, time, address, notes } = req.body;
  if (!customer || !phone || !serviceId || !date || !time || !address) {
    return res.status(400).json({ message: 'All booking fields are required.' });
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({ message: 'Service not found.' });
  }

  const booking = await Booking.create({
    customer,
    email: req.user?.email || req.body.email || '',
    phone,
    service: service.title,
    date,
    time,
    address,
    notes: notes || '',
    createdBy: req.user?._id,
  });

  res.status(201).json(booking);
}

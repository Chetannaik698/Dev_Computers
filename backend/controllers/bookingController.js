import Booking from '../models/Booking.js';

export async function listBookings(req, res) {
  const filter = req.query.status;
  const query = {};
  if (filter) query.status = filter;
  const bookings = await Booking.find(query).sort({ createdAt: -1 });
  res.json(bookings);
}

export async function createBooking(req, res) {
  const { customer, phone, service, date, time, address, notes } = req.body;
  if (!customer || !phone || !service || !date || !time || !address) {
    return res.status(400).json({ message: 'All booking fields are required.' });
  }
  const booking = await Booking.create({
    customer,
    email: req.user?.email || req.body.email || '',
    phone,
    service,
    date,
    time,
    address,
    notes: notes || '',
    createdBy: req.user?._id,
  });
  res.status(201).json(booking);
}

export async function updateBookingStatus(req, res) {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found.' });
  }
  booking.status = status || booking.status;
  await booking.save();
  res.json(booking);
}

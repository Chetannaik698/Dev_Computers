import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET, JWT_EXPIRY, ADMIN_EMAIL } from '../config.js';

function createToken(user) {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const role = email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user';
  const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password: hash, role });
  const token = createToken(user);

  return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = createToken(user);
  return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function me(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  return res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role } });
}

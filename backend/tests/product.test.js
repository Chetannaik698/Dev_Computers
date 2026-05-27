import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import Product from '../models/Product.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    dbName: 'dev-computers-test',
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Product.deleteMany();
});

describe('Product API', () => {
  it('returns an empty product list when no products exist', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('returns a saved product by id', async () => {
    const savedProduct = await Product.create({
      name: 'Test Product',
      category: 'accessories',
      categoryLabel: 'Test Accessories',
      price: '₹999',
      priceNum: 999,
      description: 'A test product description.',
      image: 'https://example.com/image.png',
      images: ['https://example.com/image.png'],
      specs: ['Test spec'],
      specsList: ['Type: Test'],
    });

    const response = await request(app).get(`/api/products/${savedProduct._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: 'Test Product',
      category: 'accessories',
      price: '₹999',
    });
  });
});

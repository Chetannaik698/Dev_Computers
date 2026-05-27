import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail.jsx';
import { apiFetch } from '../services/api.js';

vi.mock('../services/api.js', () => ({
  apiFetch: vi.fn(),
}));

describe('ProductDetail', () => {
  it('renders product details after loading', async () => {
    const product = {
      _id: '1',
      name: 'Test Product',
      category: 'accessories',
      categoryLabel: 'Accessories',
      price: '₹1,299',
      priceNum: 1299,
      description: 'Test product description.',
      image: 'https://example.com/image.png',
      images: ['https://example.com/image.png'],
      specs: ['Spec 1'],
      specsList: ['Type: Test'],
      rating: 4.5,
      reviews: 12,
    };

    apiFetch.mockImplementation((path) => {
      if (path === '/products/1') return Promise.resolve(product);
      if (path === '/products') return Promise.resolve([product]);
      return Promise.resolve(null);
    });

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading product details/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole('heading', { name: /Test Product/i })).toBeInTheDocument());

    expect(screen.getByText('₹1,299')).toBeInTheDocument();
    expect(screen.getByText(/Test product description/i)).toBeInTheDocument();
    const categoryElements = screen.getAllByText(/Accessories/i);
    expect(categoryElements.length).toBeGreaterThanOrEqual(1);
  });
});

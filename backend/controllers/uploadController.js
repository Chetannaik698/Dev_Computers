import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function bufferToDataURI(fileBuffer, mimetype) {
  const base64 = fileBuffer.toString('base64');
  return `data:${mimetype};base64,${base64}`;
}

export async function uploadImages(req, res) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(500).json({ message: 'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file.' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No images were provided for upload.' });
  }

  try {
    const uploadedUrls = [];
    for (const file of req.files) {
      const dataUri = bufferToDataURI(file.buffer, file.mimetype);
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'dev-computers/products',
        resource_type: 'image',
      });
      uploadedUrls.push(result.secure_url);
    }
    return res.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return res.status(500).json({ message: 'Image upload failed. Check backend logs and Cloudinary credentials.' });
  }
}

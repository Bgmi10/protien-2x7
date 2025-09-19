import { Hono } from 'hono';
import { Env } from '../types/env';
import { requireAdmin } from '../middleware/auth';

const upload = new Hono<{ Bindings: Env }>();

// Upload image endpoint
upload.post('/image', requireAdmin, async (c) => {
  try {
    const bucket = c.env.bucket_name;
    const formData = await c.req.formData();
    const file = formData.get('image') as File;

    if (!bucket) {
      return c.json({ success: false, error: "Error in store configuration" })
    }
    
    if (!file) {
      return c.json({ success: false, error: 'No image file provided' }, 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' }, 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return c.json({ success: false, error: 'File size too large. Maximum 5MB allowed' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `meal-plans/${timestamp}-${randomString}.${extension}`;

    // Upload to R2
    await bucket.put(filename, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Generate public URL using the R2 public dev URL
    const imageUrl = `${c.env.R2_PUBLIC_URL}/${filename}`;

    return c.json({
      success: true,
      url: imageUrl,
      filename: filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ success: false, error: 'Failed to upload image' }, 500);
  }
});

// Get image from R2 (public endpoint for serving images)
upload.get('/serve/:key{.+}', async (c) => {
  try {
    const key = c.req.param('key');
    const bucket = c.env.bucket_name;
    
    const object = await bucket.get(key);
    
    if (!object) {
      return c.json({ error: 'Image not found' }, 404);
    }

    const headers = new Headers();
    object.httpMetadata?.contentType && headers.set('Content-Type', object.httpMetadata.contentType);
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Serve error:', error);
    return c.json({ error: 'Failed to serve image' }, 500);
  }
});

// Delete image endpoint
upload.delete('/image/:key{.+}', requireAdmin, async (c) => {
  try {
    const key = c.req.param('key');
    const bucket = c.env.bucket_name;
    
    await bucket.delete(key);
    
    return c.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return c.json({ success: false, error: 'Failed to delete image' }, 500);
  }
});

export default upload;
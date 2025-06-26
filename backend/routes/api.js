const express = require('express');
const axios = require('axios');
const multer = require('multer');
const JSZip = require('jszip');
const sanitizeHtml = require('sanitize-html');
const router = express.Router();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Process images endpoint
router.post('/process-images', upload.single('image'), async (req, res) => {
  try {
    const { prompt, count = 1, service = 'ideogram' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const sanitizedPrompt = sanitizeHtml(prompt, { allowedTags: [], allowedAttributes: {} });
    const imageCount = Math.min(parseInt(count) || 1, 4); // Limit to 4 images max
    
    let results = [];

    if (service === 'openai') {
      // OpenAI DALL-E API
      for (let i = 0; i < imageCount; i++) {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
          prompt: sanitizedPrompt,
          n: 1,
          size: '1024x1024',
          model: 'dall-e-3'
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.data && response.data.data[0]) {
          results.push({
            url: response.data.data[0].url,
            service: 'openai',
            prompt: sanitizedPrompt
          });
        }
      }
    } else if (service === 'ideogram') {
      // Ideogram API
      const response = await axios.post('https://api.ideogram.ai/generate', {
        image_request: {
          prompt: sanitizedPrompt,
          aspect_ratio: 'ASPECT_1_1',
          model: 'V_2',
          magic_prompt_option: 'AUTO'
        }
      }, {
        headers: {
          'Api-Key': process.env.IDEOGRAM_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.data) {
        response.data.data.forEach(item => {
          if (item.url) {
            results.push({
              url: item.url,
              service: 'ideogram',
              prompt: sanitizedPrompt
            });
          }
        });
      }
    }

    res.json({ images: results });
  } catch (error) {
    console.error('Error processing images:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to process images',
      details: error.response?.data?.error || error.message
    });
  }
});

// Export images as ZIP
router.post('/export-zip', async (req, res) => {
  try {
    const { images } = req.body;
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const zip = new JSZip();
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const response = await axios.get(image.url, { responseType: 'arraybuffer' });
        const filename = `image_${i + 1}_${image.service}.png`;
        zip.file(filename, response.data);
      } catch (error) {
        console.error(`Failed to download image ${i + 1}:`, error.message);
      }
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=generated_images.zip');
    res.send(zipBuffer);
  } catch (error) {
    console.error('Error creating ZIP:', error);
    res.status(500).json({ error: 'Failed to create ZIP file' });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

module.exports = router; 
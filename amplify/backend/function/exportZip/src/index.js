const https = require('https');
const JSZip = require('jszip');

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { urls } = body;

    if (!urls || !Array.isArray(urls)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'URLs array is required' }),
      };
    }

    const zip = new JSZip();
    
    // Download each image and add to zip
    const downloadPromises = urls.map(async (url, index) => {
      try {
        const imageData = await downloadImage(url);
        const filename = `image_${index + 1}.png`;
        zip.file(filename, imageData);
      } catch (error) {
        console.error(`Failed to download image ${index + 1}:`, error);
      }
    });

    await Promise.all(downloadPromises);

    // Generate zip file
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="ideogramfire-images.zip"',
      },
      body: zipData.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to export images',
        details: error.message 
      }),
    };
  }
};

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
} 
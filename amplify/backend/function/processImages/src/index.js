const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    // Parse the request body
    const body = JSON.parse(event.body);
    const { prompt } = body;

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    // Generate images using OpenAI DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // Also generate using Ideogram API
    const ideogramResponse = await fetch('https://api.ideogram.ai/generate', {
      method: 'POST',
      headers: {
        'Api-Key': process.env.IDEOGRAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_request: {
          prompt: prompt,
          aspect_ratio: "ASPECT_1_1",
          model: "V_2",
          magic_prompt_option: "AUTO"
        }
      })
    });

    const ideogramData = await ideogramResponse.json();

    // Combine results
    const results = [];
    const prompts = [];

    // Add OpenAI result
    if (response.data && response.data[0]) {
      results.push(response.data[0].url);
      prompts.push(prompt);
    }

    // Add Ideogram results
    if (ideogramData.data) {
      ideogramData.data.forEach(item => {
        results.push(item.url);
        prompts.push(item.prompt);
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        results,
        prompts
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate images',
        details: error.message 
      }),
    };
  }
}; 
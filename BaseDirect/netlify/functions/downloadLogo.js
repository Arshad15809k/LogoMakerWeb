const { createCanvas, loadImage } = require('canvas');

exports.handler = async (event) => {
  try {
    const { text, bgUrl, font, effects } = JSON.parse(event.body);

    // Create canvas and context
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext('2d');

    // Load background image
    const image = await loadImage(bgUrl);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Set font and text
    ctx.font = `bold 80px "${font}"`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text || 'Your Logo', canvas.width / 2, canvas.height / 2);

    // Convert canvas to PNG buffer
    const buffer = canvas.toBuffer('image/png');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="AI-Logo.png"',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate image' }),
    };
  }
};
        

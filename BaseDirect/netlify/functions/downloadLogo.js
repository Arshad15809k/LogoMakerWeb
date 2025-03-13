exports.handler = async (event) => {
  try {
    // Parse the incoming POST body to get the image data URL
    const { dataUrl } = JSON.parse(event.body);
    
    // Remove the data URL prefix if it exists
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="AI-Logo.png"',
      },
      body: base64Data,
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

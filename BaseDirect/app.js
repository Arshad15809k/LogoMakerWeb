// Unsplash API Access Key
const unsplashAccessKey = '6FJjoJ8A2BB1FgI9P2ZZYq20Cmi88jHrOSkdn1CI8fw';

// DOM Elements
const logoInput = document.getElementById('logoInput');
const previewImage = document.getElementById('previewImage');
const logoText = document.getElementById('logoText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Logo Text Update
logoInput.addEventListener('input', () => {
  logoText.textContent = logoInput.value || 'Your Logo Here';
});

// Fetch Random Background from Unsplash
async function fetchBackground() {
  const prompt = 'futuristic neon';
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${prompt}&client_id=${unsplashAccessKey}`);
  const data = await response.json();
  return data.urls.regular;
}

// Generate Logo with AI Background
generateBtn.addEventListener('click', async () => {
  const bgUrl = await fetchBackground();
  previewImage.src = bgUrl;
});

// Download the Logo
downloadBtn.addEventListener('click', () => {
  html2canvas(document.getElementById("preview"), {
    useCORS: true,
    allowTaint: true,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "AI-Logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

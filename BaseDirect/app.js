// Helper: Apply multiple unique effects without overwriting
const applyEffects = (count = 1) => {
  logoText.classList.remove(...effects);
  const chosenEffects = new Set();
  while (chosenEffects.size < count) {
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    chosenEffects.add(randomEffect);
  }
  logoText.classList.add(...chosenEffects);
};

// Generate AI Logo: New Background + 1 Random Effect + Font
generateBtn.addEventListener('click', async () => {
  const bgUrl = await fetchBackground();
  previewImage.setAttribute("crossorigin", "anonymous");
  previewImage.src = bgUrl;
  previewImage.onload = () => {
    logoText.style.fontFamily = getRandomFont();
    logoText.style.color = extractContrastingColor(previewImage);
    applyEffects(1);
  };
});

// Combo Effects Button (2 Effects)
comboBtn.addEventListener('click', () => {
  logoText.style.fontFamily = getRandomFont();
  applyEffects(2);
});

// Super Effects Button (3 Effects)
superBtn.addEventListener('click', () => {
  logoText.style.fontFamily = getRandomFont();
  applyEffects(3);
});

// Improved Download Logic
downloadBtn.addEventListener('click', async () => {
  const preview = document.getElementById("preview");
  const originalRadius = preview.style.borderRadius;

  preview.style.borderRadius = "0";

  const clonePreview = preview.cloneNode(true);
  clonePreview.style.position = "absolute";
  clonePreview.style.top = "-9999px";
  document.body.appendChild(clonePreview);

  const clonedImg = clonePreview.querySelector("img");
  clonedImg.setAttribute("crossorigin", "anonymous");

  await new Promise((resolve) => {
    if (clonedImg.complete) resolve();
    else clonedImg.onload = resolve;
  });

  html2canvas(clonePreview, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "AI-Logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    document.body.removeChild(clonePreview);
    preview.style.borderRadius = originalRadius;
  });
});

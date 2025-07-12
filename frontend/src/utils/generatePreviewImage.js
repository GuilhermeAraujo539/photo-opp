function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Erro ao carregar imagem: ${src}`));
  });
}

function calculateSourceRect(imgWidth, imgHeight, frameWidth, frameHeight) {
  const imgAspectRatio = imgWidth / imgHeight;
  const frameAspectRatio = frameWidth / frameHeight;

  if (imgAspectRatio > frameAspectRatio) {
    const sw = imgHeight * frameAspectRatio;
    const sx = (imgWidth - sw) / 2;
    return { sx, sy: 0, sw, sh: imgHeight };
  } else {
    const sh = imgWidth / frameAspectRatio;
    const sy = (imgHeight - sh) / 2;
    return { sx: 0, sy, sw: imgWidth, sh };
  }
}

export async function generatePreviewImage(screenshot, frameWidth, frameHeight) {
  const [baseImage, overlayImage] = await Promise.all([
    loadImage(screenshot),
    loadImage("/images/moldura.png"),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const ctx = canvas.getContext("2d");

  const { sx, sy, sw, sh } = calculateSourceRect(
    baseImage.width,
    baseImage.height,
    frameWidth,
    frameHeight
  );

  ctx.drawImage(baseImage, sx, sy, sw, sh, 0, 0, frameWidth, frameHeight);
  ctx.drawImage(overlayImage, 0, 0, frameWidth, frameHeight);

  return canvas.toDataURL("image/png");
}
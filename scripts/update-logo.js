import sharp from 'sharp';
import fs from 'fs';

async function updateLogo() {
  const uploadedLogoPath = 'C:/Users/sai/.gemini/antigravity/brain/1f0b3142-cde7-4a3b-a809-17375e712166/.user_uploaded/media_1788761005363.png';

  const logoBuf = await sharp(uploadedLogoPath).png().toBuffer();
  fs.writeFileSync('public/kautike-logo.png', logoBuf);
  fs.writeFileSync('public/images/logo.png', logoBuf);
  fs.writeFileSync('public/images/kautike-receipt-logo.png', logoBuf);

  // Resize circular logo for receipt header (155x155)
  const headerLogo = await sharp(uploadedLogoPath)
    .resize({ width: 155, height: 155, fit: 'contain' })
    .toBuffer();

  // Create clean white box covering from X: 60 to 245 to erase any arc remnants
  const clearOldEmblemSvg = `
    <svg width="1149" height="1369" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="25" width="185" height="175" fill="#FFFFFF" />
    </svg>
  `;

  const orig = await sharp('public/images/receipt-clean-template.png').toBuffer();

  await sharp(orig)
    .composite([
      { input: Buffer.from(clearOldEmblemSvg), top: 0, left: 0 },
      { input: headerLogo, top: 35, left: 75 }
    ])
    .png()
    .toFile('public/images/receipt-clean-template.png');

  console.log('Successfully updated logo with clean background');
}
updateLogo();
